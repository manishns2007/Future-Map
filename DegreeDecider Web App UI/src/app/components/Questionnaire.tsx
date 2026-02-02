import { useState } from "react";
import { Calculator, Palette, Code, FlaskConical, Users, BookOpen, Brain } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Progress } from "./ui/progress";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { Slider } from "./ui/slider";

interface QuestionnaireProps {
  onComplete: (answers: QuestionAnswers) => void;
}

export interface QuestionAnswers {
  subjects: string;
  skills: string[];
  theoryPractice: number;
  learningStyle: string;
  interests: string[];
  workEnvironment: string;
  creativityStructure: number;
}

const questions = [
  {
    id: "subjects",
    title: "Which subjects do you enjoy the most?",
    type: "radio" as const,
    options: [
      { value: "math", label: "Mathematics & Logic", icon: Calculator },
      { value: "science", label: "Natural Sciences", icon: FlaskConical },
      { value: "arts", label: "Arts & Humanities", icon: Palette },
      { value: "tech", label: "Technology & Computers", icon: Code },
    ],
  },
  {
    id: "skills",
    title: "What skills do you enjoy using?",
    type: "checkbox" as const,
    options: [
      { value: "problem-solving", label: "Problem Solving" },
      { value: "creativity", label: "Creative Thinking" },
      { value: "communication", label: "Communication" },
      { value: "analysis", label: "Data Analysis" },
      { value: "helping", label: "Helping Others" },
      { value: "building", label: "Building & Creating" },
    ],
  },
  {
    id: "theoryPractice",
    title: "Do you prefer theory or hands-on practice?",
    type: "slider" as const,
    min: 0,
    max: 100,
    labels: { 0: "Theory", 100: "Practice" },
  },
  {
    id: "learningStyle",
    title: "What's your preferred learning style?",
    type: "radio" as const,
    options: [
      { value: "visual", label: "Visual (diagrams, charts)" },
      { value: "reading", label: "Reading & Writing" },
      { value: "hands-on", label: "Hands-on Activities" },
      { value: "discussion", label: "Discussion & Collaboration" },
    ],
  },
  {
    id: "interests",
    title: "Which areas interest you?",
    type: "checkbox" as const,
    options: [
      { value: "healthcare", label: "Healthcare & Medicine" },
      { value: "business", label: "Business & Economics" },
      { value: "education", label: "Education & Teaching" },
      { value: "environment", label: "Environment & Sustainability" },
      { value: "design", label: "Design & Media" },
      { value: "engineering", label: "Engineering & Innovation" },
    ],
  },
  {
    id: "workEnvironment",
    title: "What work environment appeals to you?",
    type: "radio" as const,
    options: [
      { value: "office", label: "Office & Corporate", icon: Users },
      { value: "lab", label: "Laboratory & Research", icon: FlaskConical },
      { value: "creative", label: "Creative Studio", icon: Palette },
      { value: "field", label: "Field Work & Outdoors", icon: BookOpen },
    ],
  },
  {
    id: "creativityStructure",
    title: "Do you prefer creative freedom or structured tasks?",
    type: "slider" as const,
    min: 0,
    max: 100,
    labels: { 0: "Structure", 100: "Creativity" },
  },
];

export function Questionnaire({ onComplete }: QuestionnaireProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Partial<QuestionAnswers>>({
    skills: [],
    interests: [],
    theoryPractice: 50,
    creativityStructure: 50,
  });

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      onComplete(answers as QuestionAnswers);
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const isAnswered = () => {
    const answer = answers[question.id as keyof QuestionAnswers];
    if (question.type === "checkbox") {
      return Array.isArray(answer) && answer.length > 0;
    }
    if (question.type === "slider") {
      return answer !== undefined;
    }
    return answer !== undefined && answer !== "";
  };

  const handleRadioChange = (value: string) => {
    setAnswers({ ...answers, [question.id]: value });
  };

  const handleCheckboxChange = (value: string, checked: boolean) => {
    const currentValues = (answers[question.id as keyof QuestionAnswers] as string[]) || [];
    if (checked) {
      setAnswers({ ...answers, [question.id]: [...currentValues, value] });
    } else {
      setAnswers({ ...answers, [question.id]: currentValues.filter((v) => v !== value) });
    }
  };

  const handleSliderChange = (value: number[]) => {
    setAnswers({ ...answers, [question.id]: value[0] });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-orange-50 p-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Brain className="w-6 h-6 text-blue-500" />
              <span className="text-gray-600">
                Question {currentQuestion + 1} of {questions.length}
              </span>
            </div>
            <span className="text-gray-600">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <Card className="p-8 md:p-12 bg-white/90 backdrop-blur shadow-xl rounded-3xl">
          <h2 className="mb-8 text-gray-800">{question.title}</h2>

          {question.type === "radio" && (
            <RadioGroup
              value={answers[question.id as keyof QuestionAnswers] as string}
              onValueChange={handleRadioChange}
              className="space-y-4"
            >
              {question.options?.map((option) => (
                <div
                  key={option.value}
                  className="flex items-center space-x-3 p-4 rounded-xl hover:bg-blue-50 transition-colors cursor-pointer border-2 border-transparent has-[:checked]:border-blue-400 has-[:checked]:bg-blue-50"
                >
                  <RadioGroupItem value={option.value} id={option.value} />
                  {option.icon && <option.icon className="w-5 h-5 text-blue-500" />}
                  <Label htmlFor={option.value} className="flex-1 cursor-pointer">
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          )}

          {question.type === "checkbox" && (
            <div className="space-y-4">
              {question.options?.map((option) => (
                <div
                  key={option.value}
                  className="flex items-center space-x-3 p-4 rounded-xl hover:bg-green-50 transition-colors cursor-pointer border-2 border-transparent has-[:checked]:border-green-400 has-[:checked]:bg-green-50"
                >
                  <Checkbox
                    id={option.value}
                    checked={(answers[question.id as keyof QuestionAnswers] as string[] || []).includes(
                      option.value
                    )}
                    onCheckedChange={(checked) =>
                      handleCheckboxChange(option.value, checked as boolean)
                    }
                  />
                  <Label htmlFor={option.value} className="flex-1 cursor-pointer">
                    {option.label}
                  </Label>
                </div>
              ))}
            </div>
          )}

          {question.type === "slider" && (
            <div className="space-y-8">
              <div className="px-2">
                <Slider
                  value={[answers[question.id as keyof QuestionAnswers] as number || 50]}
                  onValueChange={handleSliderChange}
                  max={100}
                  step={1}
                  className="py-4"
                />
              </div>
              <div className="flex justify-between text-gray-600">
                <span className="bg-orange-100 px-4 py-2 rounded-full">
                  {question.labels?.[0]}
                </span>
                <span className="bg-purple-100 px-4 py-2 rounded-full">
                  {question.labels?.[100]}
                </span>
              </div>
            </div>
          )}

          <div className="flex gap-4 mt-12">
            {currentQuestion > 0 && (
              <Button
                onClick={handleBack}
                variant="outline"
                className="flex-1 rounded-full"
              >
                Back
              </Button>
            )}
            <Button
              onClick={handleNext}
              disabled={!isAnswered()}
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white rounded-full disabled:opacity-50"
            >
              {currentQuestion === questions.length - 1 ? "See Results" : "Next"}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
