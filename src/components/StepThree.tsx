import { SongData } from '../types';

interface Props {
  data: SongData;
  updateData: (updates: Partial<SongData>) => void;
}

export default function StepThree({ data, updateData }: Props) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">📝 Структура и текст</h2>
        <p className="text-gray-400">Выберите структуру песни и подход к тексту</p>
      </div>

      {/* Структура */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-purple-300">Структура песни</label>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => updateData({ structure: 'Стандартная' })}
            className={`px-4 py-3 rounded-xl border transition-all text-left ${
              data.structure === 'Стандартная'
                ? 'bg-purple-500/30 border-purple-500 text-purple-200'
                : 'bg-white/5 border-white/10 hover:border-white/30 text-gray-300'
            }`}
          >
            <div className="font-medium">📋 Стандартная</div>
            <div className="text-xs text-gray-400 mt-1">
              Intro → Verse → Pre-Chorus → Chorus → Verse → Chorus → Bridge → Final Chorus → Outro
            </div>
          </button>
          <button
            onClick={() => updateData({ structure: 'Своя' })}
            className={`px-4 py-3 rounded-xl border transition-all text-left ${
              data.structure === 'Своя'
                ? 'bg-purple-500/30 border-purple-500 text-purple-200'
                : 'bg-white/5 border-white/10 hover:border-white/30 text-gray-300'
            }`}
          >
            <div className="font-medium">🎨 Своя структура</div>
            <div className="text-xs text-gray-400 mt-1">
              Минимальная: Intro → Verse → Chorus → Verse → Chorus → Outro
            </div>
          </button>
        </div>
      </div>

      {/* Соло и брейк */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-purple-300">Дополнительные элементы</label>
        <div className="flex flex-wrap gap-4">
          <label className="flex items-center gap-3 cursor-pointer group">
            <div
              className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                data.hasSolo
                  ? 'bg-purple-500 border-purple-500'
                  : 'border-white/30 group-hover:border-white/50'
              }`}
            >
              {data.hasSolo && <span className="text-xs">✓</span>}
            </div>
            <span className="text-gray-300">🎸 Инструментальное соло</span>
            <input
              type="checkbox"
              checked={data.hasSolo}
              onChange={e => updateData({ hasSolo: e.target.checked })}
              className="hidden"
            />
          </label>
          <label className="flex items-center gap-3 cursor-pointer group">
            <div
              className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                data.hasBreak
                  ? 'bg-purple-500 border-purple-500'
                  : 'border-white/30 group-hover:border-white/50'
              }`}
            >
              {data.hasBreak && <span className="text-xs">✓</span>}
            </div>
            <span className="text-gray-300">⏸ Брейк (пауза/затишье)</span>
            <input
              type="checkbox"
              checked={data.hasBreak}
              onChange={e => updateData({ hasBreak: e.target.checked })}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* Длина */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-purple-300">Длина песни</label>
        <div className="flex flex-wrap gap-3">
          {['Короткая (~2 мин)', 'Полноценная (3-4 мин)', 'Длинная (4+ мин)'].map(l => (
            <button
              key={l}
              onClick={() => updateData({ length: l })}
              className={`px-4 py-2 rounded-xl border transition-all ${
                data.length === l
                  ? 'bg-purple-500/30 border-purple-500 text-purple-200'
                  : 'bg-white/5 border-white/10 hover:border-white/30 text-gray-300'
              }`}
            >
              {l}
            </button>
          ))}
        </div>
      </div>

      {/* Текст */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-purple-300">Текст песни</label>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => updateData({ textMode: 'Написать за меня' })}
            className={`px-4 py-2 rounded-xl border transition-all ${
              data.textMode === 'Написать за меня'
                ? 'bg-purple-500/30 border-purple-500 text-purple-200'
                : 'bg-white/5 border-white/10 hover:border-white/30 text-gray-300'
            }`}
          >
            ✍️ Написать шаблон за меня
          </button>
          <button
            onClick={() => updateData({ textMode: 'Свой текст' })}
            className={`px-4 py-2 rounded-xl border transition-all ${
              data.textMode === 'Свой текст'
                ? 'bg-purple-500/30 border-purple-500 text-purple-200'
                : 'bg-white/5 border-white/10 hover:border-white/30 text-gray-300'
            }`}
          >
            📝 У меня есть свой текст
          </button>
        </div>
      </div>

      {/* Если свой текст */}
      {data.textMode === 'Свой текст' && (
        <div className="space-y-2">
          <label className="block text-sm font-medium text-purple-300">
            Ваш текст
            <span className="text-gray-500 ml-2">(Можно с мета-тегами [Verse], [Chorus] и т.д.)</span>
          </label>
          <textarea
            value={data.customLyrics}
            onChange={e => updateData({ customLyrics: e.target.value })}
            placeholder={`[Verse 1]\nПервая строка вашего текста...\nВторая строка...\n\n[Chorus]\nПрипев...\n\n[Verse 2]\nПродолжение...`}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-all resize-none h-48 placeholder:text-gray-600 font-mono text-sm"
          />
        </div>
      )}

      {/* Стиль текста (если генерируем) */}
      {data.textMode === 'Написать за меня' && (
        <div className="space-y-2">
          <label className="block text-sm font-medium text-purple-300">Стиль текста</label>
          <div className="flex flex-wrap gap-3">
            {['Рифмованный, лирический', 'Разговорный, свободный', 'Поэтичный, метафоричный', 'Простой, хуковый'].map(s => (
              <button
                key={s}
                onClick={() => updateData({ lyricsStyle: s })}
                className={`px-4 py-2 rounded-xl border transition-all text-sm ${
                  data.lyricsStyle === s
                    ? 'bg-pink-500/20 border-pink-500 text-pink-200'
                    : 'bg-white/5 border-white/10 hover:border-white/30 text-gray-400'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
          <label className="flex items-center gap-3 cursor-pointer group mt-3">
            <div
              className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                data.hasHook
                  ? 'bg-pink-500 border-pink-500'
                  : 'border-white/30 group-hover:border-white/50'
              }`}
            >
              {data.hasHook && <span className="text-xs">✓</span>}
            </div>
            <span className="text-gray-300">🎣 Припев-хук, который легко запомнить</span>
            <input
              type="checkbox"
              checked={data.hasHook}
              onChange={e => updateData({ hasHook: e.target.checked })}
              className="hidden"
            />
          </label>
        </div>
      )}
    </div>
  );
}
