import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase-client";

const Auth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuth = async () => {
      const { data } = await supabase.auth.getSession();

      if (data?.session) {
        // 🔥 email confirmed → redirect
        navigate("/login");
      } else {
        navigate("/");
      }
    };

    handleAuth();
  }, []);

  return (
    <p className="text-white text-center mt-10">
      Verifying your account...
    </p>
  );
};

export default Auth;