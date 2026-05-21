import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";

const STACK = {
  frontend: [
    { name: "React 19", color: "bg-cyan-900/40 text-cyan-300 border-cyan-800/50" },
    { name: "TypeScript", color: "bg-blue-900/40 text-blue-300 border-blue-800/50" },
    { name: "Tailwind CSS v4", color: "bg-teal-900/40 text-teal-300 border-teal-800/50" },
    { name: "TanStack Query", color: "bg-orange-900/40 text-orange-300 border-orange-800/50" },
    { name: "React Router v7", color: "bg-purple-900/40 text-purple-300 border-purple-800/50" },
    { name: "shadcn/ui", color: "bg-gray-800/60 text-gray-300 border-gray-700/50" },
    { name: "i18next", color: "bg-green-900/40 text-green-300 border-green-800/50" },
    { name: "Vite 8", color: "bg-violet-900/40 text-violet-300 border-violet-800/50" },
  ],
  backend: [
    { name: "Python", color: "bg-yellow-900/40 text-yellow-300 border-yellow-800/50" },
    { name: "FastAPI", color: "bg-emerald-900/40 text-emerald-300 border-emerald-800/50" },
    { name: "Pydantic", color: "bg-red-900/40 text-red-300 border-red-800/50" },
    { name: "Render", color: "bg-indigo-900/40 text-indigo-300 border-indigo-800/50" },
  ],
  ai: [
    { name: "Claude API", color: "bg-orange-900/40 text-orange-300 border-orange-800/50" },
    { name: "claude-sonnet-4-6", color: "bg-amber-900/40 text-amber-300 border-amber-800/50" },
    { name: "Tool Use / Structured Output", color: "bg-rose-900/40 text-rose-300 border-rose-800/50" },
  ],
  data: [
    { name: "TMDB API", color: "bg-sky-900/40 text-sky-300 border-sky-800/50" },
    { name: "Axios", color: "bg-purple-900/40 text-purple-300 border-purple-800/50" },
    { name: "react-helmet-async", color: "bg-gray-800/60 text-gray-300 border-gray-700/50" },
  ],
};

const Badge = ({ name, color }: { name: string; color: string }) => (
  <span className={`inline-flex items-center px-3 py-1 rounded-lg text-xs font-semibold border ${color}`}>
    {name}
  </span>
);

const AboutPage = () => {
  const { t } = useTranslation();

  const steps = t("about.how.steps", { returnObjects: true }) as string[];
  const stackSections = [
    { key: "frontend" as const, label: t("about.stack.frontend"), icon: "⚛️" },
    { key: "backend" as const, label: t("about.stack.backend"), icon: "🐍" },
    { key: "ai" as const, label: t("about.stack.ai"), icon: "🤖" },
    { key: "data" as const, label: t("about.stack.data"), icon: "🗄️" },
  ];

  return (
    <>
      <Helmet>
        <title>About — CineBrowse</title>
      </Helmet>

      <div className="max-w-3xl mx-auto px-4 pb-20">
        {/* Header */}
        <div className="text-center mb-12 pt-4">
          <h1 className="text-4xl font-black text-white mb-4">{t("about.title")}</h1>
          <p className="text-gray-400 text-lg leading-relaxed">{t("about.description")}</p>
        </div>

        {/* How it works */}
        <section className="mb-12">
          <h2 className="text-xl font-black text-white uppercase tracking-widest mb-6 flex items-center gap-2">
            <span className="text-red-500">▸</span> {t("about.how.title")}
          </h2>
          <ol className="flex flex-col gap-4">
            {steps.map((step, i) => (
              <li
                key={i}
                className="flex gap-4 bg-gray-800/40 border border-gray-800 rounded-2xl p-5"
              >
                <span className="flex-shrink-0 w-7 h-7 bg-red-600 text-white text-xs font-black rounded-full flex items-center justify-center mt-0.5">
                  {i + 1}
                </span>
                <p className="text-gray-300 text-sm leading-relaxed">{step}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* Tech stack */}
        <section>
          <h2 className="text-xl font-black text-white uppercase tracking-widest mb-6 flex items-center gap-2">
            <span className="text-red-500">▸</span> {t("about.stack.title")}
          </h2>
          <div className="flex flex-col gap-6">
            {stackSections.map(({ key, label, icon }) => (
              <div
                key={key}
                className="bg-gray-800/40 border border-gray-800 rounded-2xl p-5"
              >
                <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">
                  {icon} {label}
                </p>
                <div className="flex flex-wrap gap-2">
                  {STACK[key].map((item) => (
                    <Badge key={item.name} name={item.name} color={item.color} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default AboutPage;
