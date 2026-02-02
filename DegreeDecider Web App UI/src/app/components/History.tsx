import { useEffect, useState } from "react";
import { Clock, TrendingUp, ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import type { QuizResult } from "../utils/api";
import { getQuizHistory } from "../utils/api";

interface HistoryProps {
  accessToken: string;
  onBack: () => void;
  onViewResult: (result: QuizResult) => void;
}

export function History({ accessToken, onBack, onViewResult }: HistoryProps) {
  const [results, setResults] = useState<QuizResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      setLoading(true);
      setError("");
      const history = await getQuizHistory(accessToken);
      setResults(history);
    } catch (err) {
      console.error('Error loading history:', err);
      setError(err instanceof Error ? err.message : "Failed to load history");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-orange-50 p-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Button
            onClick={onBack}
            variant="ghost"
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          
          <h1 className="text-blue-600">Your Quiz History</h1>
          <p className="text-gray-600 mt-2">
            View all your past degree recommendations
          </p>
        </div>

        {loading ? (
          <Card className="p-12 text-center bg-white/90 backdrop-blur rounded-3xl">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-500" />
            <p className="text-gray-600">Loading your history...</p>
          </Card>
        ) : error ? (
          <Card className="p-8 bg-red-50 border-red-200 rounded-3xl">
            <p className="text-red-700">{error}</p>
          </Card>
        ) : results.length === 0 ? (
          <Card className="p-12 text-center bg-white/90 backdrop-blur rounded-3xl">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="mb-2 text-gray-800">No Quiz History Yet</h3>
            <p className="text-gray-600 mb-6">
              Take a quiz to see your results here!
            </p>
            <Button
              onClick={onBack}
              className="bg-blue-500 hover:bg-blue-600 text-white rounded-full"
            >
              Take a Quiz
            </Button>
          </Card>
        ) : (
          <div className="space-y-4">
            {results.map((result, index) => (
              <Card
                key={result.timestamp}
                className="p-6 bg-white/90 backdrop-blur shadow-lg rounded-2xl hover:shadow-xl transition-shadow cursor-pointer"
                onClick={() => onViewResult(result)}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="text-4xl">{result.degree.icon}</div>
                    <div className="flex-1">
                      <h3 className="text-gray-800 mb-1">
                        {result.degree.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {result.degree.description}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {formatDate(result.timestamp)}
                        </div>
                        {index === 0 && (
                          <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">
                            Latest
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="rounded-full"
                    onClick={(e) => {
                      e.stopPropagation();
                      onViewResult(result);
                    }}
                  >
                    View Details
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}

        {results.length > 0 && (
          <div className="mt-8 text-center">
            <Card className="inline-block bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-2xl">
              <div className="flex items-center gap-3">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                <p className="text-gray-700">
                  You've taken {results.length} quiz{results.length !== 1 ? "zes" : ""}!
                  Keep exploring your options.
                </p>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
