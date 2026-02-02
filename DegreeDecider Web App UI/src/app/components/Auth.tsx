import { useState } from "react";
import { LogIn, UserPlus, AlertCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface AuthProps {
  onSignIn: (email: string, password: string) => Promise<void>;
  onSignUp: (email: string, password: string, name: string) => Promise<void>;
  onSkip: () => void;
}

export function Auth({ onSignIn, onSignUp, onSkip }: AuthProps) {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (mode === "signin") {
        await onSignIn(email, password);
      } else {
        if (!name) {
          setError("Please enter your name");
          setLoading(false);
          return;
        }
        await onSignUp(email, password, name);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-green-50 to-orange-50 p-4">
      <Card className="w-full max-w-md p-8 bg-white/90 backdrop-blur shadow-xl rounded-3xl">
        <div className="text-center mb-6">
          <h2 className="mb-2">
            {mode === "signin" ? "Welcome Back" : "Create Account"}
          </h2>
          <p className="text-gray-600">
            {mode === "signin"
              ? "Sign in to save your results"
              : "Sign up to track your degree journey"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "signup" && (
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="mt-1"
              />
            </div>
          )}

          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="your.email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="mt-1"
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          <Button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-full"
            disabled={loading}
          >
            {loading ? (
              "Please wait..."
            ) : mode === "signin" ? (
              <>
                <LogIn className="w-4 h-4 mr-2" />
                Sign In
              </>
            ) : (
              <>
                <UserPlus className="w-4 h-4 mr-2" />
                Sign Up
              </>
            )}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={() => {
              setMode(mode === "signin" ? "signup" : "signin");
              setError("");
            }}
            className="text-blue-600 hover:underline text-sm"
          >
            {mode === "signin"
              ? "Don't have an account? Sign up"
              : "Already have an account? Sign in"}
          </button>
        </div>

        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={onSkip}
            className="text-gray-500 hover:text-gray-700 text-sm"
          >
            Skip for now
          </button>
        </div>
      </Card>
    </div>
  );
}
