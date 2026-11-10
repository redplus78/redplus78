import { SongData } from '../types';

interface Props {
  data: SongData;
  updateData: (updates: Partial<SongData>) => void;
}

export default function StepFour({ data, updateData }: Props) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">⚙️ Технические параметры</h2>
        <p className="text-gray-400">Настройте параметры под вашу версию Suno</p>
      </div>

      {/* Версия Suno */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-purple-300">Версия Suno</label>
        <div className="flex flex-wrap gap-3">
          {[
            { value: 'v4', label: 'v4', desc: 'Базовая модель' },
            { value: 'v4.5', label: 'v4.5', desc: 'Улучшенное качество' },
            { value: 'v5', label: 'v5', desc: 'Последняя версия' },
          ].map(v => (
            <button
              key={v.value}
              onClick={() => updateData({ sunoVersion: v.value })}
              className={`px-4 py-3 rounded-xl border transition-all text-left min-w-[140px] ${
                data.sunoVersion === v.value
                  ? 'bg-purple-500/30 border-purple-500 text-purple-200'
                  : 'bg-white/5 border-white/10 hover:border-white/30 text-gray-300'
              }`}
            >
              <div className="font-medium">{v.label}</div>
              <div className="text-xs text-gray-400 mt-1">{v.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Режим */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-purple-300">Режим</label>
        <div className="px-4 py-3 bg-green-500/10 border border-green-500/30 rounded-xl">
          <p className="text-green-300 text-sm">
            ✅ <strong>Custom Mode</strong> — раздельные поля Style и Lyrics.
            Это рекомендуемый режим для точного контроля результата.
          </p>
        </div>
      </div>

      {/* Исключения */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-purple-300">
          Исключения (Exclude Styles)
          <span className="text-gray-500 ml-2">(Чего НЕ должно быть в песне)</span>
        </label>
        <div className="flex flex-wrap gap-2 mb-3">
          {['автотюн', 'электронные барабаны', 'мат', 'скрим', 'дабстеп', 'акустика', 'оркестр', 'питч-шифт'].map(ex => (
            <button
              key={ex}
              onClick={() => {
                const current = data.excludeStyles.toLowerCase();
                if (current.includes(ex)) {
                  updateData({
                    excludeStyles: data.excludeStyles
                      .split(',')
                      .filter(i => i.trim().toLowerCase() !== ex)
                      .join(', ')
                      .trim()
                  });
                } else {
                  updateData({
                    excludeStyles: data.excludeStyles
                      ? `${data.excludeStyles}, ${ex}`
                      : ex
                  });
                }
              }}
              className={`px-3 py-1.5 rounded-lg border text-sm transition-all ${
                data.excludeStyles.toLowerCase().includes(ex)
                  ? 'bg-red-500/20 border-red-500 text-red-200'
                  : 'bg-white/5 border-white/10 hover:border-white/30 text-gray-400'
              }`}
            >
              {data.excludeStyles.toLowerCase().includes(ex) ? '✕ ' : '+ '}{ex}
            </button>
          ))}
        </div>
        <input
          type="text"
          value={data.excludeStyles}
          onChange={e => updateData({ excludeStyles: e.target.value })}
          placeholder="Или введите свои исключения через запятую..."
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-all placeholder:text-gray-600"
        />
      </div>

      {/* Сводка */}
      <div className="space-y-2 mt-6">
        <label className="block text-sm font-medium text-purple-300">📋 Сводка ваших настроек</label>
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-400">Тема:</span>
            <span className="text-gray-200 text-right max-w-[60%] truncate">{data.theme || '—'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Язык:</span>
            <span className="text-gray-200">{data.language}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Жанр:</span>
            <span className="text-gray-200 text-right max-w-[60%] truncate">{data.genre || '—'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Настроение:</span>
            <span className="text-gray-200">{data.mood || '—'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Вокал:</span>
            <span className="text-gray-200">{data.vocal}{data.vocalTimbre ? `, ${data.vocalTimbre}` : ''}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Инструменты:</span>
            <span className="text-gray-200 text-right max-w-[60%] truncate">{data.instruments || '—'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Темп:</span>
            <span className="text-gray-200">{data.tempo}{data.bpm ? ` (${data.bpm} BPM)` : ''}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Структура:</span>
            <span className="text-gray-200">{data.structure}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Длина:</span>
            <span className="text-gray-200">{data.length}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Текст:</span>
            <span className="text-gray-200">{data.textMode}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Suno:</span>
            <span className="text-gray-200">{data.sunoVersion}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
