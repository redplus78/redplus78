import { useState } from 'react';
import { generateFullPrompt } from '../generator';

interface Props {
  result: ReturnType<typeof generateFullPrompt>;
  onBack: () => void;
  onReset: () => void;
}

export default function ResultView({ result, onBack, onReset }: Props) {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(field);
      setTimeout(() => setCopied(null), 2000);
    } catch {
      // Fallback
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(field);
      setTimeout(() => setCopied(null), 2000);
    }
  };

  const copyAll = () => {
    const all = `=== STYLE OF MUSIC ===\n${result.style}\n\n=== LYRICS ===\n${result.lyrics}\n\n=== EXCLUDE STYLES ===\n${result.exclude || '(не указано)'}`;
    copyToClipboard(all, 'all');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400 bg-clip-text text-transparent mb-2">
          ✨ Ваш промт готов!
        </h1>
        <p className="text-gray-400">
          Скопируйте поля и вставьте в Suno AI (Custom Mode)
        </p>
      </div>

      {/* Style of Music */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-purple-300">🎵 Style of Music</h3>
          <button
            onClick={() => copyToClipboard(result.style, 'style')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              copied === 'style'
                ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                : 'bg-white/10 hover:bg-white/20 text-gray-300 border border-white/10'
            }`}
          >
            {copied === 'style' ? '✓ Скопировано!' : '📋 Копировать'}
          </button>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 font-mono text-sm text-gray-200 whitespace-pre-wrap">
          {result.style || '(не заполнено — укажите жанр!)'}
        </div>
      </div>

      {/* Lyrics */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-purple-300">📝 Lyrics</h3>
          <button
            onClick={() => copyToClipboard(result.lyrics, 'lyrics')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              copied === 'lyrics'
                ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                : 'bg-white/10 hover:bg-white/20 text-gray-300 border border-white/10'
            }`}
          >
            {copied === 'lyrics' ? '✓ Скопировано!' : '📋 Копировать'}
          </button>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 font-mono text-sm text-gray-200 whitespace-pre-wrap max-h-96 overflow-y-auto">
          {result.lyrics}
        </div>
      </div>

      {/* Exclude Styles */}
      {result.exclude && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-purple-300">🚫 Exclude Styles</h3>
            <button
              onClick={() => copyToClipboard(result.exclude, 'exclude')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                copied === 'exclude'
                  ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                  : 'bg-white/10 hover:bg-white/20 text-gray-300 border border-white/10'
              }`}
            >
              {copied === 'exclude' ? '✓ Скопировано!' : '📋 Копировать'}
            </button>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 font-mono text-sm text-gray-200">
            {result.exclude}
          </div>
        </div>
      )}

      {/* Copy All */}
      <div className="text-center mb-8">
        <button
          onClick={copyAll}
          className={`px-8 py-4 rounded-xl font-bold text-lg transition-all ${
            copied === 'all'
              ? 'bg-green-500/30 text-green-200 border-2 border-green-500'
              : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg shadow-purple-500/25 hover:scale-105'
          }`}
        >
          {copied === 'all' ? '✓ Всё скопировано!' : '📋 Скопировать всё целиком'}
        </button>
      </div>

      {/* Tips */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-yellow-300 mb-3">💡 Советы по доработке</h3>
        <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-xl p-4 space-y-2">
          {result.tips.map((tip, idx) => (
            <p key={idx} className="text-sm text-gray-300">{tip}</p>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-4 justify-center">
        <button
          onClick={onBack}
          className="px-6 py-3 rounded-xl font-medium bg-white/10 hover:bg-white/20 transition-all"
        >
          ← Вернуться и редактировать
        </button>
        <button
          onClick={onReset}
          className="px-6 py-3 rounded-xl font-medium bg-white/10 hover:bg-white/20 transition-all"
        >
          🔄 Создать новую песню
        </button>
      </div>

      {/* Footer info */}
      <div className="mt-8 text-center text-gray-500 text-sm space-y-1">
        <p>Вставьте Style of Music и Lyrics в соответствующие поля Suno AI</p>
        <p>Exclude Styles — в отдельное поле (если доступно в вашей версии)</p>
      </div>
    </div>
  );
}
