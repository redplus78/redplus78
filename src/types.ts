export interface SongData {
  // Основа песни
  theme: string;
  language: string;
  genre: string;
  mood: string;

  // Звучание
  vocal: string;
  vocalTimbre: string;
  instruments: string;
  tempo: string;
  bpm: string;
  references: string;

  // Структура и текст
  structure: string;
  hasSolo: boolean;
  hasBreak: boolean;
  length: string;
  textMode: string;
  customLyrics: string;
  lyricsStyle: string;
  hasHook: boolean;

  // Технические параметры
  sunoVersion: string;
  excludeStyles: string;
}

export const defaultData: SongData = {
  theme: '',
  language: 'Русский',
  genre: '',
  mood: '',
  vocal: 'Мужской',
  vocalTimbre: '',
  instruments: '',
  tempo: 'Средний',
  bpm: '',
  references: '',
  structure: 'Стандартная',
  hasSolo: false,
  hasBreak: false,
  length: 'Полноценная (3-4 мин)',
  textMode: 'Написать за меня',
  customLyrics: '',
  lyricsStyle: 'Рифмованный, лирический',
  hasHook: true,
  sunoVersion: 'v4',
  excludeStyles: '',
};
