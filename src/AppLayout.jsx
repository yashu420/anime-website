import { Outlet } from "react-router-dom";
import Navbar from "./pages/Nav";
import Footer from "./pages/Footer";

const AppLayout = () => {
  return (
   <div className="flex flex-col min-h-screen ">
  <Navbar />
  <main className="grow ">
    <Outlet />
  </main>
  <Footer />
</div>

  );
};

export default AppLayout;
