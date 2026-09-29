"use client";

import { useEffect, useRef, useState } from "react";
import { buildQuestionFlow, resolveQuestion } from "../questions";
import {
  createEmptySession,
  updateDreamSession,
  useDreamSession,
} from "../session-store";
import type { Answer, DreamSession } from "../types";
import { CompleteStep } from "./CompleteStep";
import { QuestionStep } from "./QuestionStep";
import { StoryStep } from "./StoryStep";

const EMPTY_ANSWER: Answer = { selected: [], text: "" };
const LEAVE_DURATION = 220;

function advance(session: DreamSession): DreamSession {
  const next = session.step + 1;
  return next >= session.flow.length
    ? { ...session, phase: "complete" }
    : { ...session, step: next };
}

export function DreamIntake() {
  const session = useDreamSession();
  const [leaving, setLeaving] = useState(false);
  const busy = useRef(false);
  const shouldFocus = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const stepKey = session
    ? `${session.phase}-${session.phase === "questions" ? session.step : 0}`
    : "loading";

  // Nach jedem Schrittwechsel: Überschrift fokussieren (Screenreader) und
  // nach oben scrollen, falls der neue Schritt außerhalb des Sichtbereichs liegt.
  useEffect(() => {
    if (!shouldFocus.current) return;
    shouldFocus.current = false;
    const container = containerRef.current;
    if (!container) return;
    container
      .querySelector<HTMLElement>("h1, h2")
      ?.focus({ preventScroll: true });
    if (container.getBoundingClientRect().top < 0) {
      container.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [stepKey]);

  /** Weicher Übergang: aktuellen Schritt ausblenden, dann Zustand wechseln. */
  function transition(
    updater: (session: DreamSession) => DreamSession,
    delay = 0,
  ) {
    if (busy.current) return;
    busy.current = true;
    window.setTimeout(() => {
      setLeaving(true);
      window.setTimeout(() => {
        updateDreamSession(updater);
        shouldFocus.current = true;
        setLeaving(false);
        busy.current = false;
      }, LEAVE_DURATION);
    }, delay);
  }

  if (!session) {
    return <div aria-busy="true" className="min-h-[60vh]" />;
  }

  const animation = leaving ? "animate-step-out" : "animate-step-in";

  return (
    <div
      ref={containerRef}
      className="mx-auto w-full max-w-2xl scroll-mt-6 px-5 pt-10 pb-16 sm:px-8 sm:pt-20 sm:pb-24"
    >
      <div key={stepKey} className={animation}>
        {session.phase === "story" && (
          <StoryStep
            value={session.dream}
            onChange={(dream) => updateDreamSession((s) => ({ ...s, dream }))}
            onSubmit={() =>
              transition((s) => {
                const flow = buildQuestionFlow(s.dream);
                const answers = Object.fromEntries(
                  Object.entries(s.answers).filter(([id]) =>
                    flow.includes(id as (typeof flow)[number]),
                  ),
                );
                return { ...s, flow, answers, phase: "questions", step: 0 };
              })
            }
          />
        )}

        {session.phase === "questions" && (
          <QuestionsPhase session={session} transition={transition} />
        )}

        {session.phase === "complete" && (
          <CompleteStep
            onEdit={() =>
              transition((s) => ({
                ...s,
                phase: "questions",
                step: s.flow.length - 1,
              }))
            }
            onRestart={() => transition(createEmptySession)}
          />
        )}
      </div>
    </div>
  );
}

function QuestionsPhase({
  session,
  transition,
}: {
  session: DreamSession;
  transition: (
    updater: (session: DreamSession) => DreamSession,
    delay?: number,
  ) => void;
}) {
  const id = session.flow[session.step];
  const question = resolveQuestion(id, session.dream, session.answers);
  const answer = session.answers[id] ?? EMPTY_ANSWER;

  return (
    <QuestionStep
      question={question}
      answer={answer}
      current={session.step + 1}
      total={session.flow.length}
      onChange={(next) =>
        updateDreamSession((s) => ({
          ...s,
          answers: { ...s.answers, [id]: { ...next, skipped: false } },
        }))
      }
      onNext={(options) => transition(advance, options?.delay)}
      onBack={() =>
        transition((s) =>
          s.step === 0 ? { ...s, phase: "story" } : { ...s, step: s.step - 1 },
        )
      }
      onSkip={() =>
        transition((s) =>
          advance({
            ...s,
            answers: { ...s.answers, [id]: { ...EMPTY_ANSWER, skipped: true } },
          }),
        )
      }
    />
  );
}
