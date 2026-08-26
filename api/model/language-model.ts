export interface Language {
  code: string; // API language key, e.g. "en", "de"
  label: string; // English display name
  nativeLabel: string; // Name in its own language
}

export type LanguageCode =
  | "en"
  | "de"
  | "zh"
  | "fr"
  | "es"
  | "pt"
  | "ja"
  | "ko";
