import {
  QueryClient,
  QueryClientProvider
} from "@tanstack/react-query";
import './App.css'
import {  Routes, Route } from "react-router-dom";
import nProgress from "nprogress";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import HomePage from "./pages/HomePage";
import MoviePage from "./pages/MoviePage";
import ActorPage from "./pages/ActorPage";
import AboutPage from "./pages/AboutPage";
import NotFoundPage from "./pages/NotFoundPage";
import "nprogress/nprogress.css";

if (typeof window !== "undefined") {
  const style = document.createElement("style");
  style.innerHTML = `
    #nprogress { pointer-events: none; }
    #nprogress .bar {
      background: #e50914 !important; /* Наш фирменный красный */
      position: fixed; z-index: 1031; top: 0; left: 0;
      width: 100%; height: 3px !important;
    }
    #nprogress .peg {
      display: block; position: absolute; right: 0px; width: 100px; height: 100%;
      box-shadow: 0 0 10px #e50914, 0 0 5px #e50914 !important;
      opacity: 1.0;
      transform: rotate(3deg) translate(0px, -4px);
    }
  `;
  document.head.appendChild(style);
}

nProgress.configure({ showSpinner: false });

const queryClient = new QueryClient();

queryClient.getQueryCache().subscribe((event) => {
  if (event.type === "updated") {
    const fetchStatus = event.query.state.fetchStatus;

    if (fetchStatus === "fetching") {
      nProgress.start();
    } else if (fetchStatus === "idle") {
      nProgress.done();
    }
  }
  
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MainComponent />
    </QueryClientProvider>
  );
}

function MainComponent() {
  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movie/:id" element={<MoviePage />} />
        <Route path="/actor/:id" element={<ActorPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
