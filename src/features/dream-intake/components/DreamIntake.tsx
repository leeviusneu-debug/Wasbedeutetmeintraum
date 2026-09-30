"use client";

import { useEffect, useRef, useState } from "react";
import { hasValidConsent, PROCESSING_CONSENT } from "../consent";
import { buildQuestionFlow, resolveQuestion } from "../questions";
import {
  createEmptySession,
  updateDreamSession,
  useDreamSession,
} from "../session-store";
import type { Answer, DreamSession, QuestionId } from "../types";
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

type SessionUpdater = (
  updater: (session: DreamSession) => DreamSession,
) => void;

/** Traumabfrage mit lokal gespeicherter Sitzung (echter Ablauf unter /traum). */
export function DreamIntake() {
  const session = useDreamSession();
  if (!session) {
    return <div aria-busy="true" className="min-h-[60vh]" />;
  }
  return <DreamIntakeFlow session={session} update={updateDreamSession} />;
}

export type DreamIntakeFlowProps = {
  session: DreamSession;
  update: SessionUpdater;
  /** Statt des Links zu /traum/deutung (z. B. in der Demo). */
  onInterpret?: () => void;
  /** Wird beim Antippen des Traum-Textfelds aufgerufen (Demo). */
  onStoryFocus?: () => void;
  /** Wird beim Antippen eines Textfelds einer Frage aufgerufen (Demo). */
  onAnswerFocus?: (id: QuestionId) => void;
};

/** Der eigentliche Ablauf – unabhängig davon, wo die Sitzung gespeichert ist. */
export function DreamIntakeFlow({
  session,
  update,
  onInterpret,
  onStoryFocus,
  onAnswerFocus,
}: DreamIntakeFlowProps) {
  const [leaving, setLeaving] = useState(false);
  const busy = useRef(false);
  const shouldFocus = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const stepKey = `${session.phase}-${session.phase === "questions" ? session.step : 0}`;

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
        update(updater);
        shouldFocus.current = true;
        setLeaving(false);
        busy.current = false;
      }, LEAVE_DURATION);
    }, delay);
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
            onChange={(dream) => update((s) => ({ ...s, dream }))}
            onFocus={onStoryFocus}
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
          <QuestionsPhase
            session={session}
            update={update}
            transition={transition}
            onAnswerFocus={onAnswerFocus}
          />
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
            consentGiven={hasValidConsent(session.consent)}
            onConsentChange={(checked) =>
              update((s) => ({
                ...s,
                consent: checked
                  ? {
                      version: PROCESSING_CONSENT.version,
                      givenAt: new Date().toISOString(),
                    }
                  : undefined,
              }))
            }
            onInterpret={onInterpret}
          />
        )}
      </div>
    </div>
  );
}

function QuestionsPhase({
  session,
  update,
  transition,
  onAnswerFocus,
}: {
  session: DreamSession;
  update: SessionUpdater;
  onAnswerFocus?: (id: QuestionId) => void;
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
      onTextFocus={onAnswerFocus && (() => onAnswerFocus(id))}
      onChange={(next) =>
        update((s) => ({
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
