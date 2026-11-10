import { SongData } from '../types';

interface Props {
  data: SongData;
  updateData: (updates: Partial<SongData>) => void;
}

export default function StepOne({ data, updateData }: Props) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">🎵 Основа песни</h2>
        <p className="text-gray-400">Расскажите о теме, жанре и настроении вашей будущей песни</p>
      </div>

      {/* Тема и сюжет */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-purple-300">
          Тема и сюжет
          <span className="text-gray-500 ml-2">(О чём песня? История, настроение, посвящение?)</span>
        </label>
        <textarea
          value={data.theme}
          onChange={e => updateData({ theme: e.target.value })}
          placeholder="Например: история о первой любви в маленьком городе, ностальгия по детскому лету, мотивация и преодоление..."
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-all resize-none h-24 placeholder:text-gray-600"
        />
      </div>

      {/* Язык */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-purple-300">Язык текста</label>
        <div className="flex flex-wrap gap-3">
          {['Русский', 'Английский', 'Смесь RU/EN', 'Испанский', 'Другой'].map(lang => (
            <button
              key={lang}
              onClick={() => updateData({ language: lang })}
              className={`px-4 py-2 rounded-xl border transition-all ${
                data.language === lang
                  ? 'bg-purple-500/30 border-purple-500 text-purple-200'
                  : 'bg-white/5 border-white/10 hover:border-white/30 text-gray-300'
              }`}
            >
              {lang}
            </button>
          ))}
        </div>
      </div>

      {/* Жанр */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-purple-300">
          Жанр и поджанр
          <span className="text-gray-500 ml-2">(Можно несколько через запятую)</span>
        </label>
        <input
          type="text"
          value={data.genre}
          onChange={e => updateData({ genre: e.target.value })}
          placeholder="Например: поп-рок, synthwave, русский рэп, лоу-фай, эпик-метал, фолк..."
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-all placeholder:text-gray-600"
        />
        <div className="flex flex-wrap gap-2 mt-2">
          {['Поп', 'Рок', 'Рэп', 'Электроника', 'Фолк', 'Джаз', 'Метал', 'R&B', 'Инди', 'Шансон', 'Lo-Fi', 'Synthwave'].map(g => (
            <button
              key={g}
              onClick={() => updateData({ genre: data.genre ? `${data.genre}, ${g.toLowerCase()}` : g.toLowerCase() })}
              className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-xs text-gray-400 hover:text-gray-200 transition-all"
            >
              + {g}
            </button>
          ))}
        </div>
      </div>

      {/* Настроение */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-purple-300">Настроение</label>
        <div className="flex flex-wrap gap-3">
          {['Ностальгическое', 'Энергичное', 'Мрачное', 'Ироничное', 'Торжественное', 'Меланхоличное', 'Романтичное', 'Агрессивное', 'Спокойное', 'Мистическое'].map(m => (
            <button
              key={m}
              onClick={() => updateData({ mood: data.mood === m ? '' : m })}
              className={`px-4 py-2 rounded-xl border transition-all ${
                data.mood === m
                  ? 'bg-pink-500/30 border-pink-500 text-pink-200'
                  : 'bg-white/5 border-white/10 hover:border-white/30 text-gray-300'
              }`}
            >
              {m}
            </button>
          ))}
        </div>
        <input
          type="text"
          value={data.mood && !['Ностальгическое', 'Энергичное', 'Мрачное', 'Ироничное', 'Торжественное', 'Меланхоличное', 'Романтичное', 'Агрессивное', 'Спокойное', 'Мистическое'].includes(data.mood) ? data.mood : ''}
          onChange={e => updateData({ mood: e.target.value })}
          placeholder="Или введите своё настроение..."
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-all mt-2 placeholder:text-gray-600"
        />
      </div>
    </div>
  );
}
