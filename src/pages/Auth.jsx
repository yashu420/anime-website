import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase-client";

const Auth = () => {
  const navigate = useNavigate();

 useEffect(() => {
  const handleAuth = async () => {
    const { data } = await supabase.auth.getSession();

    if (!data?.session) {
      navigate("/login");
      return;
    }

    const user = data.session.user;

    if (!user.user_metadata?.profile_completed) {
      navigate("/setup-profile");   // 🔥 NEW USER
    } else {
      navigate("/");               // ✅ OLD USER
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