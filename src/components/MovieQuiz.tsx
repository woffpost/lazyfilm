import { useState } from "react";

interface MovieQuizProps {
  onComplete: (answers: any) => void;
  isLoading: boolean;
}

export const MovieQuiz = ({ onComplete, isLoading }: MovieQuizProps) => {
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
          Подбираем идеальный кадр...
        </h2>
        <p className="text-gray-400 text-sm max-w-xs mx-auto">
          Claude анализирует тысячи кинолент, чтобы найти три шедевра под ваше
          настроение.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-gray-900/50 border border-gray-800 p-8 rounded-3xl shadow-2xl backdrop-blur-sm mt-10">
      <div
        className="w-full bg-gray-800 h-1.5 rounded-full mb-8 overflow-hidden"
        style={{ width: `${(step / 4) * 100}%` }}
      ></div>

      {step === 1 && (
        <div>
          <h2 className="text-3xl font-black text-center mb-6 text-white">
            Какое у вас сегодня настроение?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              onClick={() =>
                selectOption("mood", "tired_after_work_wants_something_deep")
              }
              className="p-5 bg-gray-800/60 hover:bg-gray-800 border border-gray-700/50 hover:border-red-500 text-left rounded-2xl transition-all cursor-pointer group"
            >
              <span className="text-2xl mb-2 block">🌌</span>
              <p className="font-bold text-white group-hover:text-red-500 transition-colors">
                Устал после работы
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Хочу глубокое, умное, но медитативное кино.
              </p>
            </button>
            <button
              onClick={() => selectOption("mood", "heavy_day_want_to_laugh")}
              className="p-5 bg-gray-800/60 hover:bg-gray-800 border border-gray-700/50 hover:border-red-500 text-left rounded-2xl transition-all cursor-pointer group"
            >
              <span className="text-2xl mb-2 block">🍿</span>
              <p className="font-bold text-white group-hover:text-red-500 transition-colors">
                Перезагрузить мозг
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Нужно что-то очень веселое, легкое или комедия.
              </p>
            </button>
            <button
              onClick={() => selectOption("mood", "date_night")}
              className="p-5 bg-gray-800/60 hover:bg-gray-800 border border-gray-700/50 hover:border-red-500 text-left rounded-2xl transition-all cursor-pointer group"
            >
              <span className="text-2xl mb-2 block">🕯️</span>
              <p className="font-bold text-white group-hover:text-red-500 transition-colors">
                Романтический вечер
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Идеально для просмотра со второй половинкой.
              </p>
            </button>
            <button
              onClick={() => selectOption("mood", "adrenaline_rush")}
              className="p-5 bg-gray-800/60 hover:bg-gray-800 border border-gray-700/50 hover:border-red-500 text-left rounded-2xl transition-all cursor-pointer group"
            >
              <span className="text-2xl mb-2 block">😱</span>
              <p className="font-bold text-white group-hover:text-red-500 transition-colors">
                Пощекотать нервы
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Острые сюжеты, триллеры, саспенс или ужасы.
              </p>
            </button>
          </div>
        </div>
      )}

      {/* ШАГ 2: ТАЙМИНГ */}
      {step === 2 && (
        <div>
          <h2 className="text-3xl font-black text-center mb-6 text-white">
            Сколько времени у вас есть?
          </h2>
          <div className="flex flex-col gap-3">
            <button
              onClick={() => selectOption("timing", "short")}
              className="w-full p-4 bg-gray-800 hover:bg-gray-750 text-center font-semibold rounded-xl text-white cursor-pointer transition-colors"
            >
              ⏱️ Быстрое кино (до 90 минут)
            </button>
            <button
              onClick={() => selectOption("timing", "standard")}
              className="w-full p-4 bg-gray-800 hover:bg-gray-750 text-center font-semibold rounded-xl text-white cursor-pointer transition-colors"
            >
              🎬 Стандартный хронометраж (около 2 часов)
            </button>
            <button
              onClick={() => selectOption("timing", "epic")}
              className="w-full p-4 bg-gray-800 hover:bg-gray-750 text-center font-semibold rounded-xl text-white cursor-pointer transition-colors"
            >
              🏛️ Готов к эпику / масштабной драме (2.5+ часа)
            </button>
          </div>
          <button
            onClick={prevStep}
            className="mt-6 text-sm text-gray-500 hover:text-white transition-colors cursor-pointer block mx-auto"
          >
            ← Назад
          </button>
        </div>
      )}

      {/* ШАГ 3: ЯЗЫК */}
      {step === 3 && (
        <div>
          <h2 className="text-3xl font-black text-center mb-6 text-white">
            Язык вещания?
          </h2>
          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={() => selectOption("language", "ru")}
              className="p-4 bg-gray-800 hover:bg-gray-750 font-bold rounded-xl text-white cursor-pointer transition-colors text-center"
            >
              Русская озвучка
            </button>
            <button
              onClick={() => selectOption("language", "en")}
              className="p-4 bg-gray-800 hover:bg-gray-750 font-bold rounded-xl text-white cursor-pointer transition-colors text-center"
            >
              Оригинал + Субтитры
            </button>
            <button
              onClick={() => selectOption("language", "any")}
              className="p-4 bg-gray-800 hover:bg-gray-750 font-bold rounded-xl text-white cursor-pointer transition-colors text-center"
            >
              Не имеет значения
            </button>
          </div>
          <button
            onClick={prevStep}
            className="mt-6 text-sm text-gray-500 hover:text-white transition-colors cursor-pointer block mx-auto"
          >
            ← Назад
          </button>
        </div>
      )}

      {/* ШАГ 4: ТЕКСТОВЫЙ ЗАПРОС И ОТПРАВКА */}
      {step === 4 && (
        <div>
          <h2 className="text-3xl font-black text-center mb-2 text-white">
            Особые пожелания?
          </h2>
          <p className="text-center text-sm text-gray-400 mb-6">
            Напишите всё, что придет в голову: любимый актер, атмосфера, или
            "без пошлого юмора".
          </p>
          <textarea
            placeholder="Например: хочу фильм в стиле Киберпанк, или чтобы в главной роли был Том Харди..."
            className="w-full p-4 h-32 bg-gray-800 border border-gray-700 rounded-2xl text-white outline-none focus:border-red-500 transition-all text-sm resize-none mb-4"
            value={answers.custom_wish}
            onChange={(e) =>
              setAnswers((prev) => ({ ...prev, custom_wish: e.target.value }))
            }
          />
          <div className="flex gap-4">
            <button
              onClick={prevStep}
              className="w-1/3 py-3.5 bg-gray-800 hover:bg-gray-750 text-white font-bold rounded-xl transition-colors cursor-pointer text-center text-sm"
            >
              ← Назад
            </button>
            <button
              onClick={() => onComplete(answers)}
              className="w-2/3 py-3.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-red-900/30 text-center text-sm cursor-pointer"
            >
              🍿 Узнать идеальный фильм
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
