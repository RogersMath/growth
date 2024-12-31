import React, { useState, useCallback } from 'react';
import { Card, CardContent } from './components/ui/card';
import { Progress } from './components/ui/progress';
import { Brain, ChevronRight, Target, BarChart } from 'lucide-react';
import _ from 'lodash';

const QUESTIONS = [
  {
    text: "Your intelligence is something very basic about you that you can't change very much",
    id: 1,
    reverse: true
  },
  {
    text: "No matter how much intelligence you have, you can always change it quite a bit",
    id: 2,
    reverse: false
  },
  {
    text: "Only a few people will be truly good at sports, you have to be born with the ability",
    id: 3,
    reverse: true
  },
  {
    text: "The harder you work at something, the better you will be",
    id: 4,
    reverse: false
  },
  {
    text: "I often get angry when I get feedback about my performance",
    id: 5,
    reverse: true
  },
  {
    text: "I appreciate when people, parents, coaches or teachers give me feedback about my performance",
    id: 6,
    reverse: false
  },
  {
    text: "Truly smart people do not need to try hard",
    id: 7,
    reverse: true
  },
  {
    text: "You can always change how intelligent you are",
    id: 8,
    reverse: false
  },
  {
    text: "You are a certain kind of person and there is not much that can be done to really change that",
    id: 9,
    reverse: true
  },
  {
    text: "An important reason why I do my school work is that I enjoy learning new things",
    id: 10,
    reverse: false
  }
];

const getScoreCategory = (score) => {
  if (score >= 22) return { text: 'Strong Growth Mindset', description: 'You strongly believe in the power of effort and growth!' };
  if (score >= 17) return { text: 'Growth with some Fixed ideas', description: 'You generally believe in growth, but have some fixed mindset tendencies.' };
  if (score >= 11) return { text: 'Fixed with some growth ideas', description: 'You have some growth mindset ideas, but tend towards fixed thinking.' };
  return { text: 'Strong fixed mindset', description: 'You tend to see abilities as fixed rather than growable.' };
};

export default function MindsetQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [quizState, setQuizState] = useState('intro');

  const calculateScore = () => {
    return Object.entries(answers).reduce((total, [_, value]) => total + value, 0);
  };

  // Debounced handlers
  const handleAnswer = useCallback(
    _.debounce((score) => {
      const question = QUESTIONS[currentQuestion];
      const actualScore = question.reverse ? (3 - score) : score;
      
      setAnswers(prev => ({
        ...prev,
        [question.id]: actualScore
      }));

      if (currentQuestion < QUESTIONS.length - 1) {
        setCurrentQuestion(prev => prev + 1);
      } else {
        setQuizState('summary');
      }
    }, 500, { leading: true, trailing: false }),
    [currentQuestion]
  );

  const startQuiz = useCallback(
    _.debounce(() => {
      setQuizState('quiz');
      setCurrentQuestion(0);
      setAnswers({});
    }, 500, { leading: true, trailing: false }),
    []
  );

  return (
    <div className="select-none flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-emerald-900 to-cyan-900 text-white p-4">
      <Card className="w-full max-w-lg border-2 border-emerald-400 bg-gradient-to-b from-emerald-900 to-cyan-900 shadow-xl">
        <CardContent className="p-6">
          {quizState === 'intro' ? (
            <>
              <h1 className="text-4xl font-bold text-emerald-300 mb-6">Mindset Assessment</h1>
              <p className="mb-8 text-lg text-emerald-50">Discover your learning mindset and understand how you view growth and development.</p>
              
              <div className="space-y-6 mb-8">
                <div className="flex items-start gap-4 bg-emerald-900/40 p-4 rounded-lg border border-emerald-300/30">
                  <Brain className="w-8 h-8 text-indigo-300" />
                  <div>
                    <h3 className="font-bold text-xl text-indigo-300">10 Questions</h3>
                    <p className="text-indigo-50">Quick assessment of your learning mindset</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 bg-indigo-900/40 p-4 rounded-lg border border-indigo-300/30">
                  <Target className="w-8 h-8 text-indigo-300" />
                  <div>
                    <h3 className="font-bold text-xl text-indigo-300">Instant Results</h3>
                    <p className="text-indigo-50">Get immediate insights about your mindset</p>
                  </div>
                </div>
              </div>

              <button 
                onClick={startQuiz}
                className="w-full p-6 bg-emerald-300 hover:bg-emerald-200 text-emerald-950 font-bold text-xl rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95"
              >
                Begin Assessment
              </button>
            </>
          ) : quizState === 'summary' ? (
            <>
              <h2 className="text-3xl font-bold text-indigo-300 mb-6">Your Mindset Profile</h2>
              <div className="space-y-6 mb-8">
                <div className="flex items-center justify-between">
                  <span className="text-indigo-50">Total Score:</span>
                  <span className="text-2xl font-bold text-indigo-300">{calculateScore()}</span>
                </div>
                
                <div>
                  <div className="mb-2">
                    <span className="text-indigo-50">Fixed Mindset</span>
                    <span className="float-right text-indigo-50">Growth Mindset</span>
                  </div>
                  <Progress 
                    value={(calculateScore() / 30) * 100} 
                    className="h-2 bg-indigo-900/40"
                  />
                </div>

                <div className="p-4 bg-indigo-900/40 rounded-lg border border-indigo-300/30">
                  <h3 className="text-xl font-bold text-indigo-300 mb-2">
                    {getScoreCategory(calculateScore()).text}
                  </h3>
                  <p className="text-indigo-50">
                    {getScoreCategory(calculateScore()).description}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <a 
                  href="https://youtu.be/Xv2ar6AKvGc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full p-6 bg-emerald-300 hover:bg-emerald-200 text-emerald-950 font-bold text-xl rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 text-center"
                >
                  View Video
                </a>
                <button 
                  onClick={startQuiz}
                  className="w-full p-6 bg-indigo-300 hover:bg-indigo-200 text-indigo-950 font-bold text-xl rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95"
                >
                  Take Quiz Again
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <BarChart className="w-6 h-6 text-indigo-300" />
                  <span className="text-xl text-indigo-300">Question {currentQuestion + 1}/10</span>
                </div>
                <Progress 
                  value={(currentQuestion / QUESTIONS.length) * 100} 
                  className="w-32 h-2 bg-indigo-900/40"
                />
              </div>

              <div className="mb-8 p-6 bg-indigo-900/40 rounded-lg border border-indigo-300/30">
                <p className="text-xl text-indigo-50">
                  {QUESTIONS[currentQuestion].text}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {['Strongly Agree', 'Agree', 'Disagree', 'Strongly Disagree'].map((option, i) => (
                  <button
                    key={i}
                    onClick={() => handleAnswer(3 - i)}
                    className="p-4 bg-indigo-900/40 hover:bg-emerald-800/60 text-lg font-bold rounded-lg border border-indigo-300/30 hover:border-indigo-300 transition-all duration-300 transform hover:scale-105 active:scale-95 text-indigo-50"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}