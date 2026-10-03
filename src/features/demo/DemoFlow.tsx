"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { AnalysisLoading, InterpretationResult } from "@/features/analysis";
import { BookingPage } from "@/features/booking/components/BookingPage";
import { DreamIntakeFlow } from "@/features/dream-intake/components/DreamIntake";
import { buildQuestionFlow } from "@/features/dream-intake/questions";
import { createEmptySession } from "@/features/dream-intake/session-store";
import type {
  Answer,
  DreamSession,
  QuestionId,
} from "@/features/dream-intake/types";
import { DEMO_ANSWERS, DEMO_DREAM, DEMO_INTERPRETATION } from "./content";

type Stage = "intake" | "loading" | "result" | "booking";

const LOADING_DURATION = 9000;
/** Pause, bevor eine vorbereitete Antwort erscheint. */
const FILL_DELAY = 750;
/** Pause nach einer fertigen Antwort im Autoplay. */
const AUTOPLAY_PAUSE = 1400;

function isFilled(answer: Answer | undefined) {
  return Boolean(answer && (answer.selected.length > 0 || answer.text));
}

function nextStep(session: DreamSession): DreamSession {
  const next = session.step + 1;
  return next >= session.flow.length
    ? { ...session, phase: "complete" }
    : { ...session, step: next };
}

/**
 * Statische Demo des kompletten Ablaufs für die Video-Aufnahme – ohne
 * Server-Anfrage, ohne Speicherung. Vorbereitete Antworten erscheinen
 * von selbst; mit `?autoplay` läuft der Ablauf vollständig automatisch.
 */
export function DemoFlow() {
  const [stage, setStage] = useState<Stage>("intake");
  const [session, setSession] = useState<DreamSession>(createEmptySession);
  // Beeinflusst nur Abläufe, nicht das Markup – daher kein Hydration-Problem.
  const [autoplay] = useState(
    () =>
      typeof window !== "undefined" &&
      new URLSearchParams(window.location.search).has("autoplay"),
  );

  const sessionRef = useRef(session);
  const typing = useRef<number | null>(null);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    sessionRef.current = session;
  });

  const update = (updater: (session: DreamSession) => DreamSession) =>
    setSession((current) => updater(current));

  function later(fn: () => void, ms: number) {
    timers.current.push(window.setTimeout(fn, ms));
  }

  function clearAll() {
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];
    if (typing.current !== null) window.clearTimeout(typing.current);
    typing.current = null;
  }

  useEffect(() => clearAll, []);

  /** Tippt einen Text Zeichen für Zeichen, wie von Hand. */
  function typewrite(
    text: string,
    apply: (partial: string) => void,
    onDone?: () => void,
  ) {
    if (typing.current !== null) window.clearTimeout(typing.current);
    let index = 0;
    const step = () => {
      index += 1;
      apply(text.slice(0, index));
      if (index >= text.length) {
        typing.current = null;
        onDone?.();
        return;
      }
      const char = text[index - 1];
      const pause = /[.,–?!]/.test(char) ? 170 : 20 + Math.random() * 26;
      typing.current = window.setTimeout(step, pause);
    };
    typing.current = window.setTimeout(step, 200);
  }

  function typeDream(onDone?: () => void) {
    typewrite(DEMO_DREAM, (dream) => update((s) => ({ ...s, dream })), onDone);
  }

  function submitStory() {
    update((s) => ({
      ...s,
      flow: buildQuestionFlow(s.dream),
      answers: {},
      phase: "questions",
      step: 0,
    }));
  }

  function fillAnswer(id: QuestionId, prepared: Answer, onDone: () => void) {
    update((s) => ({
      ...s,
      answers: {
        ...s.answers,
        [id]: { selected: prepared.selected, text: "" },
      },
    }));
    if (!prepared.text) {
      later(onDone, 300);
      return;
    }
    later(
      () =>
        typewrite(
          prepared.text,
          (partial) =>
            update((s) => ({
              ...s,
              answers: {
                ...s.answers,
                [id]: { selected: prepared.selected, text: partial },
              },
            })),
          onDone,
        ),
      prepared.selected.length > 0 ? 450 : 0,
    );
  }

  // Autoplay: Traum automatisch eintippen und absenden.
  useEffect(() => {
    if (!autoplay || stage !== "intake" || session.phase !== "story") return;
    if (session.dream) return;
    const timer = window.setTimeout(
      () => typeDream(() => later(submitStory, 1100)),
      1400,
    );
    return () => window.clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoplay, stage, session.phase, session.dream === ""]);

  // Bei jeder Frage die vorbereitete Antwort einsetzen.
  useEffect(() => {
    if (stage !== "intake") return;
    const current = sessionRef.current;

    if (current.phase === "complete") {
      if (autoplay) later(() => setStage("loading"), 1800);
      return;
    }
    if (current.phase !== "questions") return;

    const id = current.flow[current.step];
    const prepared = DEMO_ANSWERS[id];
    const advance = () => {
      if (autoplay) later(() => update(nextStep), AUTOPLAY_PAUSE);
    };
    if (!prepared || isFilled(current.answers[id])) {
      advance();
      return;
    }
    const timer = window.setTimeout(
      () => fillAnswer(id, prepared, advance),
      FILL_DELAY,
    );
    return () => window.clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage, session.phase, session.step]);

  // Stufenwechsel: nach oben, Ladezeit, im Autoplay bis zur Buchungsseite.
  useEffect(() => {
    if (stage === "intake") return;
    window.scrollTo({ top: 0 });

    if (stage === "loading") {
      const timer = window.setTimeout(
        () => setStage("result"),
        LOADING_DURATION,
      );
      return () => window.clearTimeout(timer);
    }

    if (stage === "result" && autoplay) {
      let interval = 0;
      const start = window.setTimeout(() => {
        interval = window.setInterval(() => {
          const cta = document.querySelector<HTMLElement>('[data-cta="offer"]');
          const target = cta
            ? cta.getBoundingClientRect().top - window.innerHeight * 0.6
            : 0;
          const atBottom =
            window.innerHeight + window.scrollY >=
            document.documentElement.scrollHeight - 2;
          // Ganze Pixel: Bruchteile lassen sich nicht scrollen.
          if (!cta || target < 1 || atBottom) {
            window.clearInterval(interval);
            later(() => setStage("booking"), 2600);
            return;
          }
          window.scrollBy(0, Math.min(2, target));
        }, 16);
      }, 3000);
      return () => {
        window.clearTimeout(start);
        window.clearInterval(interval);
      };
    }
  }, [stage, autoplay]);

  function handleStoryFocus() {
    if (session.dream || typing.current !== null) return;
    typeDream();
  }

  function restart() {
    clearAll();
    setSession(createEmptySession());
    setStage("intake");
  }

  if (stage === "loading") {
    return (
      <div className="mx-auto w-full max-w-2xl animate-step-in px-5 pt-10 pb-16 sm:px-8 sm:pt-20 sm:pb-24">
        <AnalysisLoading interval={1600} />
      </div>
    );
  }

  if (stage === "result") {
    return (
      <div className="mx-auto w-full max-w-2xl px-5 pt-10 pb-16 sm:px-8 sm:pt-20 sm:pb-24">
        <InterpretationResult
          interpretation={DEMO_INTERPRETATION}
          onRequestOffer={() => setStage("booking")}
          actions={
            <div className="flex justify-center">
              <Button variant="ghost" onClick={restart}>
                Einen neuen Traum erzählen
              </Button>
            </div>
          }
        />
      </div>
    );
  }

  if (stage === "booking") {
    return (
      <div className="animate-step-in">
        <BookingPage onBack={() => setStage("result")} />
      </div>
    );
  }

  return (
    <DreamIntakeFlow
      session={session}
      update={update}
      onInterpret={() => setStage("loading")}
      onStoryFocus={handleStoryFocus}
      storyTitle="Was bedeutet mein Traum?"
      // Die Demo übermittelt nichts – daher kein Verarbeitungshinweis.
      processesData={false}
    />
  );
}
