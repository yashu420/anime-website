import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./AppLayout";
import Index from "./pages/index";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import Popular from "./Sections/Popular";
import About from "./Sections/About";
import TopRated from "./Sections/TopRated";
import Contact from "./pages/Contact";
import SearchPage from "./pages/SearchPage";
import TrailerPage from "./pages/TrailerPage";
import AnimeDetails from "./pages/AnimeDetails";
function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<AppLayout />}>
             <Route path="anime/:id" element={<AnimeDetails />} />
          <Route index element={<Index />} />
          <Route path="popular" element={<Popular />} />
          <Route path="top" element={<TopRated />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="search/:query" element={<SearchPage />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="trailer/:id" element={<TrailerPage />} />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;