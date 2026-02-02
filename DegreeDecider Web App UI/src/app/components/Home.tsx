import { GraduationCap } from "lucide-react";
import { Button } from "./ui/button";
import type { User } from "../utils/auth";

interface HomeProps {
  onGetStarted: () => void;
  user?: User | null;
  onSignOut?: () => void;
  onViewHistory?: () => void;
}

export function Home({ onGetStarted, user, onSignOut, onViewHistory }: HomeProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-green-50 to-orange-50 p-4">
      <div className="text-center max-w-2xl">
        {user && (
          <div className="mb-6 bg-white/80 backdrop-blur px-6 py-3 rounded-full inline-flex items-center gap-4 shadow-md">
            <span className="text-gray-700">
              Welcome back, <strong>{user.name}</strong>!
            </span>
            <div className="flex gap-2">
              {onViewHistory && (
                <Button
                  onClick={onViewHistory}
                  variant="ghost"
                  size="sm"
                  className="rounded-full"
                >
                  View History
                </Button>
              )}
              {onSignOut && (
                <Button
                  onClick={onSignOut}
                  variant="ghost"
                  size="sm"
                  className="rounded-full text-gray-600"
                >
                  Sign Out
                </Button>
              )}
            </div>
          </div>
        )}
        
        <div className="mb-8 flex justify-center">
          <div className="bg-white p-6 rounded-full shadow-lg">
            <GraduationCap className="w-16 h-16 text-blue-500" />
          </div>
        </div>
        
        <h1 className="mb-4 text-blue-600">DegreeDecider</h1>
        <p className="mb-8 text-gray-600 text-xl">
          Find the degree that fits you
        </p>
        
        <Button 
          onClick={onGetStarted}
          size="lg"
          className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all"
        >
          Get Started
        </Button>
        
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/80 backdrop-blur p-6 rounded-2xl shadow-md">
            <div className="text-3xl mb-2">📚</div>
            <p className="text-gray-700">Personalized recommendations</p>
          </div>
          <div className="bg-white/80 backdrop-blur p-6 rounded-2xl shadow-md">
            <div className="text-3xl mb-2">⚡</div>
            <p className="text-gray-700">Quick & easy questionnaire</p>
          </div>
          <div className="bg-white/80 backdrop-blur p-6 rounded-2xl shadow-md">
            <div className="text-3xl mb-2">🎯</div>
            <p className="text-gray-700">Find your perfect match</p>
          </div>
        </div>
      </div>
    </div>
  );
}