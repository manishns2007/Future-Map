import { useState, useEffect } from "react";
import { Home } from "./components/Home";
import { Auth } from "./components/Auth";
import { Questionnaire, QuestionAnswers } from "./components/Questionnaire";
import { Results } from "./components/Results";
import { History } from "./components/History";
import { signIn, signUp, signOut, getCurrentSession, User } from "./utils/auth";
import { saveQuizResult } from "./utils/api";
import type { QuizResult } from "./utils/api";

type Page = "home" | "auth" | "questionnaire" | "results" | "history" | "viewResult";

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [answers, setAnswers] = useState<QuestionAnswers | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoadingSession, setIsLoadingSession] = useState(true);
  const [viewingResult, setViewingResult] = useState<QuizResult | null>(null);

  // Check for existing session on mount
  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    try {
      const session = await getCurrentSession();
      if (session) {
        setUser(session.user);
        setAccessToken(session.accessToken);
      }
    } catch (error) {
      console.error("Error checking session:", error);
    } finally {
      setIsLoadingSession(false);
    }
  };

  const handleGetStarted = () => {
    if (user) {
      // User is logged in, go straight to questionnaire
      setCurrentPage("questionnaire");
    } else {
      // Show auth page
      setCurrentPage("auth");
    }
  };

  const handleSignIn = async (email: string, password: string) => {
    try {
      const result = await signIn(email, password);
      setUser(result.user);
      setAccessToken(result.accessToken);
      setCurrentPage("questionnaire");
    } catch (error) {
      console.error("Sign in error:", error);
      throw error;
    }
  };

  const handleSignUp = async (email: string, password: string, name: string) => {
    try {
      await signUp(email, password, name);
      // After signup, sign in automatically
      const result = await signIn(email, password);
      setUser(result.user);
      setAccessToken(result.accessToken);
      setCurrentPage("questionnaire");
    } catch (error) {
      console.error("Sign up error:", error);
      throw error;
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      setUser(null);
      setAccessToken(null);
      setAnswers(null);
      setCurrentPage("home");
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  const handleSkipAuth = () => {
    // Allow guest mode - no saving of results
    setCurrentPage("questionnaire");
  };

  const handleQuestionnaireComplete = (completedAnswers: QuestionAnswers) => {
    setAnswers(completedAnswers);
    setCurrentPage("results");
  };

  const handleSaveResult = async (degree: any) => {
    if (!accessToken || !answers) return;

    try {
      await saveQuizResult(accessToken, answers, degree);
      console.log("Quiz result saved successfully!");
    } catch (error) {
      console.error("Error saving quiz result:", error);
      // Don't block the user if save fails, just log it
    }
  };

  const handleTryAgain = () => {
    setAnswers(null);
    setCurrentPage("home");
  };

  const handleViewHistory = () => {
    setCurrentPage("history");
  };

  const handleViewResult = (result: QuizResult) => {
    setViewingResult(result);
    setAnswers(result.answers);
    setCurrentPage("viewResult");
  };

  const handleBackFromHistory = () => {
    setCurrentPage("home");
  };

  const handleBackFromViewResult = () => {
    setViewingResult(null);
    setAnswers(null);
    setCurrentPage("history");
  };

  if (isLoadingSession) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-green-50 to-orange-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {currentPage === "home" && (
        <Home
          onGetStarted={handleGetStarted}
          user={user}
          onSignOut={handleSignOut}
          onViewHistory={user ? handleViewHistory : undefined}
        />
      )}

      {currentPage === "auth" && (
        <Auth
          onSignIn={handleSignIn}
          onSignUp={handleSignUp}
          onSkip={handleSkipAuth}
        />
      )}

      {currentPage === "questionnaire" && (
        <Questionnaire onComplete={handleQuestionnaireComplete} />
      )}

      {currentPage === "results" && answers && (
        <Results
          answers={answers}
          onTryAgain={handleTryAgain}
          accessToken={accessToken}
          onSaveResult={handleSaveResult}
        />
      )}

      {currentPage === "history" && user && accessToken && (
        <History
          accessToken={accessToken}
          onBack={handleBackFromHistory}
          onViewResult={handleViewResult}
        />
      )}

      {currentPage === "viewResult" && viewingResult && (
        <Results
          answers={viewingResult.answers}
          onTryAgain={handleBackFromViewResult}
          accessToken={null}
        />
      )}
    </div>
  );
}
