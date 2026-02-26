import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./AppLayout";
import Index from "./pages/index";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import Popular from "./pages/PopularSection/Popular";
import About from "./Sections/About";
import TopRated from "./Sections/TopRated";
import Contact from "./pages/Contact";
import SearchPage from "./pages/SearchPage";
import TrailerPage from "./pages/TrailerPage";
import AnimeDetails from "./pages/AnimeDetails";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import { Toaster } from "react-hot-toast";
import Terms from "./pages/Terms";
import ScrollToTop from "./pages/UI/ScrollToTop";
import Genres from "./pages/GenresSection/Genres";
import News from "./pages/News";
function App() {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#111",
            color: "#fff",
            border: "1px solid #ef4444",
          },
        }}
      />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route path="anime/:id" element={<AnimeDetails />} />
            <Route index element={<Index />} />
            <Route path="popular" element={<Popular />} />
            <Route path="top" element={<TopRated />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="privacypolicy" element={<PrivacyPolicy />} />
            <Route path="search/:query" element={<SearchPage />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="trailer/:id" element={<TrailerPage />} />
            <Route path="/terms" element={<Terms />} />
                <Route path="Genres" element={<Genres />} />
                 <Route path="News" element={<News />} />

          </Route>
        </Routes>
      </BrowserRouter>{" "}
    </>
  );
}

export default App;
