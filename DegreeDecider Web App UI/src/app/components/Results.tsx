import { GraduationCap, Sparkles, TrendingUp, Heart } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import type { QuestionAnswers } from "./Questionnaire";
import { useEffect } from "react";

interface ResultsProps {
  answers: QuestionAnswers;
  onTryAgain: () => void;
  accessToken?: string | null;
  onSaveResult?: (degree: DegreeRecommendation) => void;
}

export interface DegreeRecommendation {
  name: string;
  description: string;
  reasons: string[];
  skills: string[];
  icon: string;
}

function calculateDegree(answers: QuestionAnswers): DegreeRecommendation {
  const { subjects, skills, interests, workEnvironment, theoryPractice, creativityStructure } = answers;

  // Computer Science
  if (
    subjects === "tech" ||
    (skills.includes("problem-solving") && skills.includes("building")) ||
    interests.includes("engineering")
  ) {
    return {
      name: "Computer Science",
      description:
        "A degree focused on programming, algorithms, and software development. Perfect for logical thinkers who love technology.",
      reasons: [
        "Your interest in technology and problem-solving aligns perfectly",
        "Strong foundation for a career in software development",
        "Growing field with excellent job prospects",
      ],
      skills: ["Programming", "Algorithm Design", "Software Architecture", "Data Structures"],
      icon: "💻",
    };
  }

  // Business Administration
  if (
    interests.includes("business") ||
    workEnvironment === "office" ||
    skills.includes("communication")
  ) {
    return {
      name: "Business Administration",
      description:
        "Learn management, finance, marketing, and entrepreneurship. Ideal for future leaders and innovators.",
      reasons: [
        "Your interest in business and leadership is evident",
        "Versatile degree with diverse career paths",
        "Strong communication skills will serve you well",
      ],
      skills: ["Strategic Planning", "Financial Analysis", "Team Management", "Marketing"],
      icon: "💼",
    };
  }

  // Engineering
  if (
    subjects === "math" ||
    (skills.includes("building") && theoryPractice > 60) ||
    interests.includes("engineering")
  ) {
    return {
      name: "Engineering",
      description:
        "Apply math and science to design and build solutions. Great for hands-on problem solvers.",
      reasons: [
        "Your analytical and practical skills are a perfect match",
        "Love for hands-on work will thrive in this field",
        "Make a real-world impact through innovation",
      ],
      skills: ["Technical Design", "Problem Solving", "Project Management", "CAD Software"],
      icon: "⚙️",
    };
  }

  // Psychology
  if (
    interests.includes("healthcare") ||
    skills.includes("helping") ||
    (skills.includes("communication") && theoryPractice < 50)
  ) {
    return {
      name: "Psychology",
      description:
        "Study human behavior, mental processes, and emotional well-being. Perfect for empathetic helpers.",
      reasons: [
        "Your desire to help others is a strong indicator",
        "Strong communication skills are essential in this field",
        "Make a meaningful difference in people's lives",
      ],
      skills: ["Active Listening", "Research Methods", "Counseling", "Critical Thinking"],
      icon: "🧠",
    };
  }

  // Environmental Science
  if (
    subjects === "science" ||
    interests.includes("environment") ||
    workEnvironment === "field"
  ) {
    return {
      name: "Environmental Science",
      description:
        "Study ecosystems, sustainability, and conservation. Ideal for those passionate about our planet.",
      reasons: [
        "Your interest in science and the environment aligns well",
        "Contribute to solving critical global challenges",
        "Mix of fieldwork and research matches your preferences",
      ],
      skills: ["Field Research", "Data Analysis", "Sustainability Planning", "Lab Techniques"],
      icon: "🌍",
    };
  }

  // Graphic Design
  if (
    subjects === "arts" ||
    creativityStructure > 60 ||
    interests.includes("design") ||
    skills.includes("creativity")
  ) {
    return {
      name: "Graphic Design",
      description:
        "Combine creativity with technology to create visual communications. Perfect for artistic problem solvers.",
      reasons: [
        "Your creativity and artistic interests shine through",
        "Balance of creative freedom and structured design principles",
        "Growing demand in digital media and marketing",
      ],
      skills: ["Adobe Creative Suite", "Visual Communication", "Typography", "UX/UI Design"],
      icon: "🎨",
    };
  }

  // Education
  if (
    interests.includes("education") ||
    (skills.includes("helping") && skills.includes("communication"))
  ) {
    return {
      name: "Education",
      description:
        "Inspire and teach the next generation. Great for patient, passionate communicators.",
      reasons: [
        "Your passion for helping and communicating is key",
        "Make a lasting impact on students' lives",
        "Rewarding career with strong job security",
      ],
      skills: ["Curriculum Development", "Classroom Management", "Assessment", "Communication"],
      icon: "👨‍🏫",
    };
  }

  // Default: Liberal Arts
  return {
    name: "Liberal Arts",
    description:
      "Explore diverse subjects including humanities, social sciences, and natural sciences. Perfect for well-rounded thinkers.",
    reasons: [
      "Your varied interests suggest a multidisciplinary approach",
      "Develop critical thinking and communication skills",
      "Flexibility to specialize later in your academic journey",
    ],
    skills: ["Critical Thinking", "Writing", "Research", "Interdisciplinary Analysis"],
    icon: "📚",
  };
}

export function Results({ answers, onTryAgain, accessToken, onSaveResult }: ResultsProps) {
  const degree = calculateDegree(answers);

  useEffect(() => {
    if (accessToken && onSaveResult) {
      onSaveResult(degree);
    }
  }, [accessToken, onSaveResult, degree]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-orange-50 p-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-md mb-4">
            <Sparkles className="w-5 h-5 text-yellow-500" />
            <span className="text-gray-600">Your Perfect Match</span>
          </div>
        </div>

        <Card className="p-8 md:p-12 bg-white/90 backdrop-blur shadow-xl rounded-3xl mb-6">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">{degree.icon}</div>
            <h1 className="mb-4 text-blue-600">{degree.name}</h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              {degree.description}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mt-12">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl">
              <div className="flex items-center gap-2 mb-4">
                <Heart className="w-5 h-5 text-blue-600" />
                <h3 className="text-blue-800">Why This Degree Fits You</h3>
              </div>
              <ul className="space-y-3">
                {degree.reasons.map((reason, index) => (
                  <li key={index} className="flex items-start gap-2 text-gray-700">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>{reason}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-2xl">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <h3 className="text-green-800">Skills to Focus On</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {degree.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-white px-4 py-2 rounded-full text-gray-700 shadow-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Card>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={onTryAgain}
            variant="outline"
            size="lg"
            className="rounded-full px-8"
          >
            Try Again
          </Button>
          <Button
            size="lg"
            className="bg-blue-500 hover:bg-blue-600 text-white rounded-full px-8"
            onClick={() => window.open("https://www.google.com/search?q=" + encodeURIComponent(degree.name + " degree programs"), "_blank")}
          >
            <GraduationCap className="w-5 h-5 mr-2" />
            Explore Programs
          </Button>
        </div>

        <div className="mt-12 text-center">
          <Card className="inline-block bg-gradient-to-r from-orange-50 to-pink-50 p-6 rounded-2xl">
            <p className="text-gray-600">
              💡 <strong>Remember:</strong> This is a guide to help you explore options. Your
              interests may evolve, and that's perfectly normal!
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}