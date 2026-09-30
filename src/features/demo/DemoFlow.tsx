"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { AnalysisLoading, InterpretationResult } from "@/features/analysis";
import { DreamIntakeFlow } from "@/features/dream-intake/components/DreamIntake";
import { createEmptySession } from "@/features/dream-intake/session-store";
import type { DreamSession, QuestionId } from "@/features/dream-intake/types";
import { DEMO_DREAM, DEMO_INTERPRETATION, DEMO_TEXT_ANSWERS } from "./content";

type Stage = "intake" | "loading" | "result";

const LOADING_DURATION = 9000;

/**
 * Statische Demo des kompletten Ablaufs für die Video-Aufnahme.
 * Keine Server-Anfrage, nichts wird gespeichert. Textfelder füllen sich beim
 * Antippen mit dem Beispieltext, als würde jemand tippen.
 */
export function DemoFlow() {
  const [stage, setStage] = useState<Stage>("intake");
  const [session, setSession] = useState<DreamSession>(createEmptySession);
  const typing = useRef<number | null>(null);

  const update = (updater: (session: DreamSession) => DreamSession) =>
    setSession((current) => updater(current));

  function typewrite(text: string, apply: (partial: string) => void) {
    if (typing.current !== null) return;
    let index = 0;
    const step = () => {
      index += 1;
      apply(text.slice(0, index));
      if (index >= text.length) {
        typing.current = null;
        return;
      }
      const char = text[index - 1];
      const pause = /[.,–?!]/.test(char) ? 160 : 18 + Math.random() * 22;
      typing.current = window.setTimeout(step, pause);
    };
    typing.current = window.setTimeout(step, 250);
  }

  useEffect(
    () => () => {
      if (typing.current !== null) window.clearTimeout(typing.current);
    },
    [],
  );

  useEffect(() => {
    if (stage === "intake") return;
    window.scrollTo({ top: 0 });
    if (stage !== "loading") return;
    const timer = window.setTimeout(() => setStage("result"), LOADING_DURATION);
    return () => window.clearTimeout(timer);
  }, [stage]);

  function handleStoryFocus() {
    if (session.dream) return;
    typewrite(DEMO_DREAM, (dream) => update((s) => ({ ...s, dream })));
  }

  function handleAnswerFocus(id: QuestionId) {
    const text = DEMO_TEXT_ANSWERS[id];
    if (!text || session.answers[id]?.text) return;
    typewrite(text, (partial) =>
      update((s) => {
        const answer = s.answers[id] ?? { selected: [], text: "" };
        return {
          ...s,
          answers: { ...s.answers, [id]: { ...answer, text: partial } },
        };
      }),
    );
  }

  function restart() {
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
          actions={
            <div className="flex justify-center">
              <Button variant="quiet" onClick={restart}>
                Demo neu starten
              </Button>
            </div>
          }
        />
      </div>
    );
  }

  return (
    <DreamIntakeFlow
      session={session}
      update={update}
      onInterpret={() => setStage("loading")}
      onStoryFocus={handleStoryFocus}
      onAnswerFocus={handleAnswerFocus}
    />
  );
}
