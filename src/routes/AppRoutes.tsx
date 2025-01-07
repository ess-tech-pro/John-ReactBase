import { Routes, Route } from "react-router-dom";
import NotFound from "../pages/not-found";
import Home from "../pages/home";
import About from "../pages/about";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
