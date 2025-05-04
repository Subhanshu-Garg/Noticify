
import AuthForm from "@/components/AuthForm";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";

const Login = () => {
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);
  
  return (
    <div className="container flex flex-col items-center justify-center min-h-[80vh] py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Noticify</h1>
        <p className="text-muted-foreground mt-2">
          Real-time notice board for organizations
        </p>
      </div>
      <AuthForm />
    </div>
  );
};

export default Login;
