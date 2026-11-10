import { useState } from 'react';
import { SongData, defaultData } from './types';
import { generateFullPrompt } from './generator';
import StepOne from './components/StepOne';
import StepTwo from './components/StepTwo';
import StepThree from './components/StepThree';
import StepFour from './components/StepFour';
import ResultView from './components/ResultView';

const STEPS = [
  { title: '🎵 Основа песни', icon: '🎵' },
  { title: '🎧 Звучание', icon: '🎧' },
  { title: '📝 Структура и текст', icon: '📝' },
  { title: '⚙️ Технические параметры', icon: '⚙️' },
];

function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState<SongData>({ ...defaultData });
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState<ReturnType<typeof generateFullPrompt> | null>(null);

  const updateData = (updates: Partial<SongData>) => {
    setData(prev => ({ ...prev, ...updates }));
  };

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      const generated = generateFullPrompt(data);
      setResult(generated);
      setShowResult(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleReset = () => {
    setData({ ...defaultData });
    setCurrentStep(0);
    setShowResult(false);
    setResult(null);
  };

  const handleBackToEdit = () => {
    setShowResult(false);
    setResult(null);
  };

  const progress = ((currentStep + 1) / STEPS.length) * 100;

  if (showResult && result) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white">
        <ResultView
          result={result}
          onBack={handleBackToEdit}
          onReset={handleReset}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white">
      {/* Header */}
      <header className="border-b border-white/10 backdrop-blur-sm bg-black/20">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                🎶 Suno AI Prompt Generator
              </h1>
              <p className="text-sm text-gray-400 mt-1">
                Создайте идеальный промт для вашей песни
              </p>
            </div>
            <button
              onClick={handleReset}
              className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-sm"
            >
              🔄 Сбросить
            </button>
          </div>
        </div>
      </header>

      {/* Progress */}
      <div className="max-w-4xl mx-auto px-4 pt-6">
        <div className="flex items-center gap-2 mb-2">
          {STEPS.map((step, idx) => (
            <div key={idx} className="flex-1">
              <div
                className={`h-2 rounded-full transition-all duration-500 ${
                  idx <= currentStep
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500'
                    : 'bg-white/10'
                }`}
              />
              <p className={`text-xs mt-1 text-center transition-colors ${
                idx === currentStep ? 'text-purple-300 font-medium' : 'text-gray-500'
              }`}>
                {step.icon} {step.title.replace(/^[^\s]+\s/, '')}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl animate-pulse-glow">
          <div key={currentStep} className="animate-fade-in">
            {currentStep === 0 && <StepOne data={data} updateData={updateData} />}
            {currentStep === 1 && <StepTwo data={data} updateData={updateData} />}
            {currentStep === 2 && <StepThree data={data} updateData={updateData} />}
            {currentStep === 3 && <StepFour data={data} updateData={updateData} />}
          </div>

          {/* Navigation */}
          <div className="flex justify-between mt-8 pt-6 border-t border-white/10">
            <button
              onClick={handleBack}
              disabled={currentStep === 0}
              className={`px-6 py-3 rounded-xl font-medium transition-all ${
                currentStep === 0
                  ? 'opacity-30 cursor-not-allowed bg-white/5'
                  : 'bg-white/10 hover:bg-white/20 hover:scale-105'
              }`}
            >
              ← Назад
            </button>
            <button
              onClick={handleNext}
              className="px-8 py-3 rounded-xl font-medium bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all hover:scale-105 shadow-lg shadow-purple-500/25"
            >
              {currentStep === STEPS.length - 1 ? '✨ Сгенерировать промт' : 'Далее →'}
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-6 text-gray-500 text-sm">
        <p>Создано для генерации промтов в Suno AI • Custom Mode</p>
      </footer>
    </div>
  );
}

export default App;
