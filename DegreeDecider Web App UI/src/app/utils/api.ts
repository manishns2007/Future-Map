import { projectId, publicAnonKey } from '../../../utils/supabase/info';
import type { QuestionAnswers } from '../components/Questionnaire';

const supabaseUrl = `https://${projectId}.supabase.co`;
const serverUrl = `${supabaseUrl}/functions/v1/make-server-9d0ac4f2`;

export interface QuizResult {
  userId: string;
  userEmail: string;
  userName: string;
  answers: QuestionAnswers;
  degree: {
    name: string;
    description: string;
    reasons: string[];
    skills: string[];
    icon: string;
  };
  timestamp: number;
  createdAt: string;
}

export async function saveQuizResult(
  accessToken: string,
  answers: QuestionAnswers,
  degree: QuizResult['degree']
) {
  const response = await fetch(`${serverUrl}/save-result`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ answers, degree }),
  });

  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.error || 'Failed to save quiz result');
  }

  return data;
}

export async function getQuizHistory(accessToken: string): Promise<QuizResult[]> {
  const response = await fetch(`${serverUrl}/history`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
  });

  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.error || 'Failed to get quiz history');
  }

  return data.results;
}
