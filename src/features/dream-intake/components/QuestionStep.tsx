"use client";

import { useId, type KeyboardEvent } from "react";
import { Button } from "@/components/ui/Button";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckIcon,
} from "@/components/ui/icons";
import { isAnswerComplete } from "../questions";
import type { Answer, Question, QuestionOption } from "../types";
import { fieldClassName } from "./field-styles";
import { ProgressIndicator } from "./ProgressIndicator";

type QuestionStepProps = {
  question: Question;
  answer: Answer;
  current: number;
  total: number;
  onChange: (answer: Answer) => void;
  /** Weiter – optional mit kurzer Verzögerung, damit die Auswahl sichtbar bleibt. */
  onNext: (options?: { delay?: number }) => void;
  onBack: () => void;
  onSkip: () => void;
  /** Beim Antippen des Textfelds bzw. Notizfelds (Demo). */
  onTextFocus?: () => void;
};

export function QuestionStep({
  question,
  answer,
  current,
  total,
  onChange,
  onNext,
  onBack,
  onSkip,
  onTextFocus,
}: QuestionStepProps) {
  const titleId = useId();
  const hintId = useId();
  const complete = isAnswerComplete(question, answer);
  const otherSelected = question.options?.some(
    (o) => o.isOther && answer.selected.includes(o.value),
  );

  function selectSingle(option: QuestionOption) {
    onChange({
      selected: [option.value],
      text: option.isOther ? answer.text : "",
    });
    if (!option.isOther) onNext({ delay: 260 });
  }

  function toggleMulti(option: QuestionOption) {
    const isSelected = answer.selected.includes(option.value);
    const exclusiveValues = new Set(
      question.options?.filter((o) => o.exclusive).map((o) => o.value),
    );
    let selected: string[];
    if (isSelected) {
      selected = answer.selected.filter((v) => v !== option.value);
    } else if (option.exclusive) {
      selected = [option.value];
    } else {
      selected = [
        ...answer.selected.filter((v) => !exclusiveValues.has(v)),
        option.value,
      ];
    }
    onChange({ ...answer, selected, skipped: false });
  }

  function handleTextKeyDown(
    event: KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) {
    const isTextarea = event.currentTarget instanceof HTMLTextAreaElement;
    const submit = isTextarea
      ? event.key === "Enter" && (event.metaKey || event.ctrlKey)
      : event.key === "Enter";
    if (submit) {
      event.preventDefault();
      if (complete) onNext();
    }
  }

  const compactOptions =
    question.options?.every((o) => o.label.length <= 14) ?? false;

  return (
    <div className="flex flex-col">
      <ProgressIndicator current={current} total={total} />

      {question.lead && (
        <p className="mt-10 font-serif text-lg text-pretty text-moon-300 italic sm:text-xl">
          {question.lead}
        </p>
      )}
      <h2
        id={titleId}
        tabIndex={-1}
        className={`${question.lead ? "mt-3" : "mt-10"} font-serif text-3xl leading-tight font-light tracking-tight text-balance text-moon-50 outline-none sm:text-4xl`}
      >
        {question.title}
      </h2>
      {question.hint && (
        <p id={hintId} className="mt-3 text-sm text-pretty text-moon-400">
          {question.hint}
        </p>
      )}

      <div className="mt-8">
        {question.kind === "text" && (
          <textarea
            aria-labelledby={titleId}
            aria-describedby={question.hint ? hintId : undefined}
            value={answer.text}
            onChange={(event) =>
              onChange({ ...answer, text: event.target.value, skipped: false })
            }
            onKeyDown={handleTextKeyDown}
            onFocus={onTextFocus}
            placeholder={question.placeholder}
            rows={4}
            className={`${fieldClassName} min-h-36 text-base sm:text-lg`}
          />
        )}

        {question.options && (
          <div
            role="group"
            aria-labelledby={titleId}
            className={`grid gap-2.5 ${compactOptions ? "grid-cols-2 sm:grid-cols-3" : "grid-cols-1 sm:grid-cols-2"}`}
          >
            {question.options.map((option) => (
              <OptionButton
                key={option.value}
                option={option}
                className={
                  compactOptions && option.isOther
                    ? "col-span-2 sm:col-span-1"
                    : ""
                }
                selected={answer.selected.includes(option.value)}
                onClick={() =>
                  question.kind === "multi"
                    ? toggleMulti(option)
                    : selectSingle(option)
                }
              />
            ))}
          </div>
        )}

        {otherSelected && (
          <input
            type="text"
            autoFocus
            aria-label="Beschreibe es mit deinen Worten"
            value={answer.text}
            onChange={(event) =>
              onChange({ ...answer, text: event.target.value })
            }
            onKeyDown={handleTextKeyDown}
            placeholder="Mit deinen eigenen Worten …"
            className={`${fieldClassName} mt-4 animate-step-in text-base`}
          />
        )}

        {question.notePrompt && (
          <NoteField
            label={question.notePrompt}
            value={answer.text}
            onChange={(text) => onChange({ ...answer, text })}
            onKeyDown={handleTextKeyDown}
            onFocus={onTextFocus}
          />
        )}
      </div>

      <div className="mt-10 grid grid-cols-2 items-center gap-y-2 sm:flex sm:gap-2">
        <Button
          onClick={() => onNext()}
          disabled={!complete}
          className="order-1 col-span-2 sm:order-3"
        >
          Weiter
          <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Button>
        <Button
          variant="quiet"
          onClick={onBack}
          className="order-2 justify-self-start sm:order-1 sm:mr-auto"
        >
          <ArrowLeftIcon />
          Zurück
        </Button>
        <Button
          variant="quiet"
          onClick={onSkip}
          className="order-3 justify-self-end sm:order-2"
        >
          Überspringen
        </Button>
      </div>
    </div>
  );
}

function OptionButton({
  option,
  selected,
  onClick,
  className = "",
}: {
  option: QuestionOption;
  className?: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={`${className} flex min-h-13 items-center justify-between gap-3 rounded-2xl px-5 py-3 text-left text-[0.95rem] ring-1 backdrop-blur-sm transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-glow-300 ${
        selected
          ? "bg-glow-300/10 text-moon-50 shadow-[0_0_30px_-10px_rgb(230_189_114/0.5)] ring-glow-300/60"
          : "bg-night-900/50 text-moon-100 ring-moon-50/10 hover:bg-night-800/60 hover:ring-moon-50/25"
      }`}
    >
      <span>{option.label}</span>
      <CheckIcon
        className={`h-4 w-4 shrink-0 text-glow-300 transition-opacity duration-300 ${selected ? "opacity-100" : "opacity-0"}`}
      />
    </button>
  );
}

function NoteField({
  label,
  value,
  onChange,
  onKeyDown,
  onFocus,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  onKeyDown: (event: KeyboardEvent<HTMLTextAreaElement>) => void;
  onFocus?: () => void;
}) {
  const id = useId();
  return (
    <div className="mt-6">
      <label htmlFor={id} className="text-sm text-moon-300">
        {label}
      </label>
      <textarea
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onKeyDown={onKeyDown}
        onFocus={onFocus}
        rows={2}
        className={`${fieldClassName} mt-2 min-h-20 text-base`}
      />
    </div>
  );
}
