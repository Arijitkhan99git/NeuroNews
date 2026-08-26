import { Language } from "../model/language-model";

// DataCube's AI News API has no /api/languages endpoint — the 8
// supported languages are fixed and documented at:

// https://www.datacubeai.space/en/tools/ai-news-api
const SUPPORTED_LANGUAGES: Language[] = [
  { code: "en", label: "English", nativeLabel: "English" },
  { code: "de", label: "German", nativeLabel: "Deutsch" },
  { code: "zh", label: "Chinese", nativeLabel: "中文" },
  { code: "fr", label: "French", nativeLabel: "Français" },
  { code: "es", label: "Spanish", nativeLabel: "Español" },
  { code: "pt", label: "Portuguese", nativeLabel: "Português" },
  { code: "ja", label: "Japanese", nativeLabel: "日本語" },
  { code: "ko", label: "Korean", nativeLabel: "한국어" },
];

// Kept async on purpose — call sites treat this exactly like a network
// call, so swapping in a real endpoint later needs no changes elsewhere.
export async function fetchLanguages(): Promise<Language[]> {
  return Promise.resolve(SUPPORTED_LANGUAGES);
}
