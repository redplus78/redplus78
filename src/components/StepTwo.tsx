import { SongData } from '../types';

interface Props {
  data: SongData;
  updateData: (updates: Partial<SongData>) => void;
}

export default function StepTwo({ data, updateData }: Props) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">🎧 Звучание</h2>
        <p className="text-gray-400">Опишите вокал, инструменты, темп и референсы</p>
      </div>

      {/* Вокал */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-purple-300">Тип вокала</label>
        <div className="flex flex-wrap gap-3">
          {['Мужской', 'Женский', 'Дуэт', 'Хор', 'Без вокала (инструментал)'].map(v => (
            <button
              key={v}
              onClick={() => updateData({ vocal: v })}
              className={`px-4 py-2 rounded-xl border transition-all ${
                data.vocal === v
                  ? 'bg-purple-500/30 border-purple-500 text-purple-200'
                  : 'bg-white/5 border-white/10 hover:border-white/30 text-gray-300'
              }`}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      {/* Тембр */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-purple-300">
          Тембр и манера вокала
          <span className="text-gray-500 ml-2">(Необязательно)</span>
        </label>
        <div className="flex flex-wrap gap-2">
          {['Хриплый', 'Нежный', 'Речитатив', 'Оперный', 'Шёпот', 'Распевный', 'Разговорный', 'Фальцет'].map(t => (
            <button
              key={t}
              onClick={() => updateData({ vocalTimbre: data.vocalTimbre === t ? '' : t })}
              className={`px-3 py-1.5 rounded-lg border text-sm transition-all ${
                data.vocalTimbre === t
                  ? 'bg-pink-500/20 border-pink-500 text-pink-200'
                  : 'bg-white/5 border-white/10 hover:border-white/30 text-gray-400'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
        <input
          type="text"
          value={data.vocalTimbre && !['Хриплый', 'Нежный', 'Речитатив', 'Оперный', 'Шёпот', 'Распевный', 'Разговорный', 'Фальцет'].includes(data.vocalTimbre) ? data.vocalTimbre : ''}
          onChange={e => updateData({ vocalTimbre: e.target.value })}
          placeholder="Или опишите свой вариант..."
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-all placeholder:text-gray-600"
        />
      </div>

      {/* Инструменты */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-purple-300">
          Инструменты
          <span className="text-gray-500 ml-2">(Можно несколько)</span>
        </label>
        <div className="flex flex-wrap gap-2">
          {['Гитара', 'Синтезаторы', 'Фортепиано', 'Струнные', 'Баян', '808-басы', 'Ударные', 'Скрипка', 'Саксофон', 'Бас-гитара', 'Акустика'].map(inst => (
            <button
              key={inst}
              onClick={() => {
                const current = data.instruments;
                const lower = inst.toLowerCase();
                if (current.toLowerCase().includes(lower)) {
                  updateData({ instruments: current.split(',').filter(i => i.trim().toLowerCase() !== lower).join(',').trim() });
                } else {
                  updateData({ instruments: current ? `${current}, ${lower}` : lower });
                }
              }}
              className={`px-3 py-1.5 rounded-lg border text-sm transition-all ${
                data.instruments.toLowerCase().includes(inst.toLowerCase())
                  ? 'bg-green-500/20 border-green-500 text-green-200'
                  : 'bg-white/5 border-white/10 hover:border-white/30 text-gray-400'
              }`}
            >
              {data.instruments.toLowerCase().includes(inst.toLowerCase()) ? '✓ ' : '+ '}{inst}
            </button>
          ))}
        </div>
        <input
          type="text"
          value={data.instruments}
          onChange={e => updateData({ instruments: e.target.value })}
          placeholder="Или впишите свои инструменты через запятую..."
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-all placeholder:text-gray-600"
        />
      </div>

      {/* Темп */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-purple-300">Темп и ритм</label>
        <div className="flex flex-wrap gap-3">
          {['Медленный', 'Средний', 'Быстрый', 'Очень быстрый'].map(t => (
            <button
              key={t}
              onClick={() => updateData({ tempo: t })}
              className={`px-4 py-2 rounded-xl border transition-all ${
                data.tempo === t
                  ? 'bg-purple-500/30 border-purple-500 text-purple-200'
                  : 'bg-white/5 border-white/10 hover:border-white/30 text-gray-300'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3 mt-2">
          <span className="text-sm text-gray-400">BPM (опционально):</span>
          <input
            type="number"
            value={data.bpm}
            onChange={e => updateData({ bpm: e.target.value })}
            placeholder="120"
            className="w-24 px-3 py-2 bg-white/5 border border-white/10 rounded-lg focus:border-purple-500 outline-none transition-all placeholder:text-gray-600"
          />
        </div>
      </div>

      {/* Референсы */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-purple-300">
          Референсы
          <span className="text-gray-500 ml-2">(Исполнители, эпохи, саундтреки)</span>
        </label>
        <textarea
          value={data.references}
          onChange={e => updateData({ references: e.target.value })}
          placeholder="Например: ранний Depeche Mode, саундтрек Blade Runner, русский рок 90-х, Billie Eilish..."
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-all resize-none h-20 placeholder:text-gray-600"
        />
        <p className="text-xs text-gray-500">
          💡 Suno не принимает имена артистов напрямую. Я переведу ваши референсы в описание стиля.
        </p>
      </div>
    </div>
  );
}
