import { useState } from "react";
import { useTranslation } from "react-i18next";

interface MovieQuizProps {
  onComplete: (answers: any) => void;
  isLoading: boolean;
}

export const MovieQuiz = ({ onComplete, isLoading }: MovieQuizProps) => {
  const { t } = useTranslation();
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({
    mood: "",
    timing: "",
    language: "",
    custom_wish: "",
  });

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const selectOption = (field: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [field]: value }));
    nextStep();
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-red-600 mb-6"></div>
        <h2 className="text-2xl font-bold mb-2 text-white">
          {t("quiz.loading.title")}
        </h2>
        <p className="text-gray-400 text-sm max-w-xs mx-auto">
          {t("quiz.loading.subtitle")}
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-gray-900/50 border border-gray-800 p-8 rounded-3xl shadow-2xl backdrop-blur-sm mt-10">
      <div className="w-full bg-gray-800 h-1.5 rounded-full mb-8 overflow-hidden">
        <div
          className="h-full bg-red-600 rounded-full transition-all duration-500"
          style={{ width: `${(step / 4) * 100}%` }}
        />
      </div>

      {step === 1 && (
        <div>
          <h2 className="text-3xl font-black text-center mb-6 text-white">
            {t("quiz.step1.title")}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {(
              [
                { value: "tired_after_work_wants_something_deep", key: "tired", emoji: "🌌" },
                { value: "heavy_day_want_to_laugh", key: "laugh", emoji: "🍿" },
                { value: "date_night", key: "date", emoji: "🕯️" },
                { value: "adrenaline_rush", key: "thrill", emoji: "😱" },
              ] as const
            ).map((opt) => (
              <button
                key={opt.key}
                onClick={() => selectOption("mood", opt.value)}
                className="p-5 bg-gray-800/60 hover:bg-gray-800 border border-gray-700/50 hover:border-red-500 text-left rounded-2xl transition-all cursor-pointer group"
              >
                <span className="text-2xl mb-2 block">{opt.emoji}</span>
                <p className="font-bold text-white group-hover:text-red-500 transition-colors">
                  {t(`quiz.step1.${opt.key}.title`)}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  {t(`quiz.step1.${opt.key}.desc`)}
                </p>
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <h2 className="text-3xl font-black text-center mb-6 text-white">
            {t("quiz.step2.title")}
          </h2>
          <div className="flex flex-col gap-3">
            {(["short", "standard", "epic"] as const).map((opt) => (
              <button
                key={opt}
                onClick={() => selectOption("timing", opt)}
                className="w-full p-4 bg-gray-800 hover:bg-gray-700 text-center font-semibold rounded-xl text-white cursor-pointer transition-colors"
              >
                {t(`quiz.step2.${opt}`)}
              </button>
            ))}
          </div>
          <button
            onClick={prevStep}
            className="mt-6 text-sm text-gray-500 hover:text-white transition-colors cursor-pointer block mx-auto"
          >
            {t("quiz.back")}
          </button>
        </div>
      )}

      {step === 3 && (
        <div>
          <h2 className="text-3xl font-black text-center mb-6 text-white">
            {t("quiz.step3.title")}
          </h2>
          <div className="grid grid-cols-3 gap-3">
            {(["ru", "en", "any"] as const).map((opt) => (
              <button
                key={opt}
                onClick={() => selectOption("language", opt)}
                className="p-4 bg-gray-800 hover:bg-gray-700 font-bold rounded-xl text-white cursor-pointer transition-colors text-center"
              >
                {t(`quiz.step3.${opt}`)}
              </button>
            ))}
          </div>
          <button
            onClick={prevStep}
            className="mt-6 text-sm text-gray-500 hover:text-white transition-colors cursor-pointer block mx-auto"
          >
            {t("quiz.back")}
          </button>
        </div>
      )}

      {step === 4 && (
        <div>
          <h2 className="text-3xl font-black text-center mb-2 text-white">
            {t("quiz.step4.title")}
          </h2>
          <p className="text-center text-sm text-gray-400 mb-6">
            {t("quiz.step4.subtitle")}
          </p>
          <textarea
            placeholder={t("quiz.step4.placeholder")}
            className="w-full p-4 h-32 bg-gray-800 border border-gray-700 rounded-2xl text-white outline-none focus:border-red-500 transition-all text-sm resize-none mb-4"
            value={answers.custom_wish}
            onChange={(e) =>
              setAnswers((prev) => ({ ...prev, custom_wish: e.target.value }))
            }
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                onComplete(answers);
              }
            }}
          />
          <div className="flex gap-4">
            <button
              onClick={prevStep}
              className="w-1/3 py-3.5 bg-gray-800 hover:bg-gray-700 text-white font-bold rounded-xl transition-colors cursor-pointer text-center text-sm"
            >
              {t("quiz.step4.back")}
            </button>
            <button
              onClick={() => onComplete(answers)}
              className="w-2/3 py-3.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-red-900/30 text-center text-sm cursor-pointer"
            >
              {t("quiz.step4.submit")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
