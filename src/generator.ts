import { SongData } from './types';

export function generateStylePrompt(data: SongData): string {
  const parts: string[] = [];

  // Жанр
  if (data.genre) {
    parts.push(data.genre);
  }

  // Настроение
  if (data.mood) {
    parts.push(data.mood);
  }

  // Вокал
  const vocalParts: string[] = [];
  if (data.vocal) {
    if (data.vocal === 'Без вокала (инструментал)') {
      parts.push('instrumental');
    } else {
      vocalParts.push(data.vocal.toLowerCase() + ' vocals');
    }
  }
  if (data.vocalTimbre) {
    vocalParts.push(data.vocalTimbre.toLowerCase() + ' voice');
  }
  if (vocalParts.length > 0) {
    parts.push(vocalParts.join(', '));
  }

  // Инструменты
  if (data.instruments) {
    parts.push(data.instruments);
  }

  // Темп
  if (data.tempo) {
    const tempoMap: Record<string, string> = {
      'Медленный': 'slow tempo',
      'Средний': 'mid-tempo',
      'Быстрый': 'fast tempo',
      'Очень быстрый': 'very fast tempo',
    };
    parts.push(tempoMap[data.tempo] || data.tempo);
  }
  if (data.bpm) {
    parts.push(`${data.bpm} BPM`);
  }

  // Референсы — переводим в описание стиля
  if (data.references) {
    parts.push(`influenced by ${data.references}`);
  }

  // Язык
  if (data.language === 'Английский') {
    parts.push('english lyrics');
  } else if (data.language === 'Смесь RU/EN') {
    parts.push('bilingual russian-english');
  } else if (data.language === 'Испанский') {
    parts.push('spanish lyrics');
  }

  return parts.join(', ');
}

export function generateLyrics(data: SongData): string {
  if (data.textMode === 'Свой текст' && data.customLyrics) {
    return formatCustomLyrics(data);
  }

  // Генерируем шаблон с мета-тегами
  return generateTemplateLyrics(data);
}

function formatCustomLyrics(data: SongData): string {
  let text = data.customLyrics.trim();

  // Если нет мета-тегов, добавим базовую структуру
  if (!text.includes('[')) {
    const lines = text.split('\n').filter(l => l.trim());
    const result: string[] = [];

    if (data.structure === 'Стандартная') {
      result.push('[Intro]');
      result.push('(Instrumental)');
      result.push('');
      result.push('[Verse 1]');

      const half = Math.ceil(lines.length / 2);
      for (let i = 0; i < half && i < lines.length; i++) {
        result.push(lines[i]);
      }

      result.push('');
      result.push('[Chorus]');
      for (let i = half; i < lines.length; i++) {
        result.push(lines[i]);
      }

      result.push('');
      result.push('[Outro]');
      result.push('(Fade out)');
    } else {
      result.push('[Verse 1]');
      for (const line of lines) {
        result.push(line);
      }
      result.push('');
      result.push('[Outro]');
    }

    return result.join('\n');
  }

  return text;
}

function generateTemplateLyrics(data: SongData): string {
  const theme = data.theme || 'life and emotions';
  const mood = data.mood || 'emotional';
  const lang = data.language;

  const template: string[] = [];

  // Определяем язык подсказок
  const isRussian = lang === 'Русский' || lang === 'Смесь RU/EN';

  if (data.structure === 'Стандартная') {
    template.push('[Intro]');
    template.push('(Instrumental build-up)');
    template.push('');

    template.push('[Verse 1]');
    if (isRussian) {
      template.push(`(Куплет о: ${theme})`);
      template.push('(4 строки — задаём сцену и атмосферу)');
    } else {
      template.push(`(Verse about: ${theme})`);
      template.push('(4 lines — set the scene and mood)');
    }
    template.push('');

    template.push('[Pre-Chorus]');
    if (isRussian) {
      template.push('(Нарастание, 2-4 строки)');
    } else {
      template.push('(Building tension, 2-4 lines)');
    }
    template.push('');

    template.push('[Chorus]');
    if (data.hasHook) {
      if (isRussian) {
        template.push('(Запоминающийся хук — повторяемый, эмоциональный)');
      } else {
        template.push('(Catchy hook — memorable, singable, emotional peak)');
      }
    }
    if (isRussian) {
      template.push(`(Главное сообщение о: ${theme})`);
      template.push('(4 строки, яркая мелодия)');
    } else {
      template.push(`(Main message about: ${theme})`);
      template.push('(4 lines, strong melody)');
    }
    template.push('');

    template.push('[Verse 2]');
    if (isRussian) {
      template.push('(Развитие истории, новые образы)');
      template.push('(4 строки)');
    } else {
      template.push('(Develop the story, new imagery)');
      template.push('(4 lines)');
    }
    template.push('');

    template.push('[Chorus]');
    if (isRussian) {
      template.push('(Повтор припева)');
    } else {
      template.push('(Repeat chorus)');
    }
    template.push('');

    if (data.hasSolo) {
      template.push('[Instrumental Solo]');
      if (isRussian) {
        template.push('(Эмоциональный пик, инструментальный проигрыш)');
      } else {
        template.push('(Emotional peak, instrumental break)');
      }
      template.push('');
    }

    if (data.hasBreak) {
      template.push('[Break]');
      if (isRussian) {
        template.push('(Минимализм, тишина перед взрывом)');
      } else {
        template.push('(Stripped down, minimal, before the drop)');
      }
      template.push('');
    }

    template.push('[Bridge]');
    if (isRussian) {
      template.push('(Контраст — другая мелодия/настроение)');
      template.push('(2-4 строки, эмоциональный сдвиг)');
    } else {
      template.push('(Contrast — different melody/mood)');
      template.push('(2-4 lines, emotional shift)');
    }
    template.push('');

    template.push('[Final Chorus]');
    if (isRussian) {
      template.push('(Максимальная энергия, многослойный вокал)');
      template.push('(Повтор с вариацией)');
    } else {
      template.push('(Full energy, layered vocals)');
      template.push('(Repeat with variation)');
    }
    template.push('');

    template.push('[Outro]');
    if (isRussian) {
      template.push('(Затухание или финальная фраза)');
    } else {
      template.push('(Fade out or final statement)');
    }
    template.push('(Instrumental decay)');
  } else {
    // Своя (минимальная) структура
    template.push('[Intro]');
    template.push('(Instrumental)');
    template.push('');

    template.push('[Verse 1]');
    if (isRussian) {
      template.push(`(${theme} — ${mood})`);
    } else {
      template.push(`(${theme} — ${mood})`);
    }
    template.push('');

    template.push('[Chorus]');
    if (isRussian) {
      template.push('(Основной хук)');
    } else {
      template.push('(Main hook)');
    }
    template.push('');

    template.push('[Verse 2]');
    if (isRussian) {
      template.push('(Развитие)');
    } else {
      template.push('(Development)');
    }
    template.push('');

    template.push('[Chorus]');
    template.push('');

    template.push('[Outro]');
    if (isRussian) {
      template.push('(Завершение)');
    } else {
      template.push('(Ending)');
    }
  }

  return template.join('\n');
}

export function generateExcludeStyles(data: SongData): string {
  if (data.excludeStyles) {
    return data.excludeStyles;
  }
  return '';
}

export function generateFullPrompt(data: SongData) {
  return {
    style: generateStylePrompt(data),
    lyrics: generateLyrics(data),
    exclude: generateExcludeStyles(data),
    tips: generateTips(data),
  };
}

function generateTips(data: SongData): string[] {
  const tips: string[] = [];

  if (!data.genre) {
    tips.push('⚠️ Укажите жанр — это ключевой параметр для Suno. Без него результат будет непредсказуемым.');
  }
  if (!data.theme) {
    tips.push('💡 Добавьте тему/сюжет — Suno создаст более осмысленный текст по шаблону.');
  }
  if (data.sunoVersion === 'v4') {
    tips.push('📝 Suno v4: лимит ~3000 символов в поле Style, до 3000 в Lyrics. Промт оптимизирован под эти лимиты.');
  } else if (data.sunoVersion === 'v4.5') {
    tips.push('📝 Suno v4.5: увеличенные лимиты. Можно добавить больше деталей в Style для точного результата.');
  } else {
    tips.push('📝 Suno v5: максимальные лимиты, поддерживает сложные структуры и длинные тексты.');
  }

  if (data.references) {
    tips.push('🎵 Референсы переведены в описание стиля. Suno не принимает имена артистов напрямую, но понимает описания.');
  }

  if (data.hasHook) {
    tips.push('🎣 Хук-припев отмечен — Suno постарается сделать его запоминающимся. Если не получится, попробуйте упростить текст припева.');
  }

  if (data.hasSolo) {
    tips.push('🎸 Инструментальное соло добавлено. Если Suno его проигнорирует, попробуйте вынести в отдельный трек.');
  }

  tips.push('🔄 Если результат не идеален — попробуйте:');
  tips.push('   • Изменить порядок жанров в Style (первый жанр имеет больший вес)');
  tips.push('   • Добавить/убрать инструменты');
  tips.push('   • Сгенерировать 2-4 варианта и выбрать лучший');
  tips.push('   • Использовать кнопку "Extend" для доработки длинных песен');

  tips.push('🎯 Совет: генерируйте минимум 2-4 варианта — Suno каждый раз даёт разный результат.');

  return tips;
}
