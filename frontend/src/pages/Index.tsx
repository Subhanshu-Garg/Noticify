
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";

const Index = () => {
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
      <div className="max-w-3xl space-y-6">
        <div className="flex justify-center mb-6">
          <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
            <Bell className="h-8 w-8 text-primary" />
          </div>
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
          Welcome to <span className="text-primary">Noticify</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          A real-time notice board where users can subscribe to organizations and receive live updates as soon as they're published.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
          <Button size="lg" onClick={() => navigate("/login")}>
            Get Started
          </Button>
          <Button size="lg" variant="outline" onClick={() => navigate("/about")}>
            Learn More
          </Button>
        </div>
        <div className="pt-12 grid gap-8 md:grid-cols-3">
          <div className="space-y-2">
            <h2 className="text-xl font-bold">Real-time Updates</h2>
            <p className="text-muted-foreground">
              Receive notices instantly as they are published through WebSocket connections.
            </p>
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-bold">Organization Subscriptions</h2>
            <p className="text-muted-foreground">
              Follow the organizations that matter to you and receive targeted notices.
            </p>
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-bold">Clean Interface</h2>
            <p className="text-muted-foreground">
              Enjoy a modern, responsive design that works on all your devices.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
