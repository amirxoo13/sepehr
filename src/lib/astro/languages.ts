/** Languages offered in the picker. English is the authored source;
 *  every other code is a Google Translate target (`tl=`). */

export type LangDir = "ltr" | "rtl";

export type Language = {
  code: string;
  name: string;
  native: string;
  dir: LangDir;
};

export const RTL_CODES = new Set(["ar", "fa", "ur", "he", "ps", "sd", "yi", "ug", "ckb", "dv"]);

export const LANGUAGES: Language[] = [
  { code: "en", name: "English", native: "English", dir: "ltr" },
  { code: "fa", name: "Persian", native: "فارسی", dir: "rtl" },
  { code: "ar", name: "Arabic", native: "العربية", dir: "rtl" },
  { code: "tr", name: "Turkish", native: "Türkçe", dir: "ltr" },
  { code: "de", name: "German", native: "Deutsch", dir: "ltr" },
  { code: "fr", name: "French", native: "Français", dir: "ltr" },
  { code: "es", name: "Spanish", native: "Español", dir: "ltr" },
  { code: "pt", name: "Portuguese", native: "Português", dir: "ltr" },
  { code: "it", name: "Italian", native: "Italiano", dir: "ltr" },
  { code: "ru", name: "Russian", native: "Русский", dir: "ltr" },
  { code: "uk", name: "Ukrainian", native: "Українська", dir: "ltr" },
  { code: "pl", name: "Polish", native: "Polski", dir: "ltr" },
  { code: "nl", name: "Dutch", native: "Nederlands", dir: "ltr" },
  { code: "sv", name: "Swedish", native: "Svenska", dir: "ltr" },
  { code: "da", name: "Danish", native: "Dansk", dir: "ltr" },
  { code: "fi", name: "Finnish", native: "Suomi", dir: "ltr" },
  { code: "no", name: "Norwegian", native: "Norsk", dir: "ltr" },
  { code: "cs", name: "Czech", native: "Čeština", dir: "ltr" },
  { code: "hu", name: "Hungarian", native: "Magyar", dir: "ltr" },
  { code: "ro", name: "Romanian", native: "Română", dir: "ltr" },
  { code: "el", name: "Greek", native: "Ελληνικά", dir: "ltr" },
  { code: "he", name: "Hebrew", native: "עברית", dir: "rtl" },
  { code: "ur", name: "Urdu", native: "اردو", dir: "rtl" },
  { code: "hi", name: "Hindi", native: "हिन्दी", dir: "ltr" },
  { code: "bn", name: "Bengali", native: "বাংলা", dir: "ltr" },
  { code: "zh-CN", name: "Chinese (Simplified)", native: "简体中文", dir: "ltr" },
  { code: "zh-TW", name: "Chinese (Traditional)", native: "繁體中文", dir: "ltr" },
  { code: "ja", name: "Japanese", native: "日本語", dir: "ltr" },
  { code: "ko", name: "Korean", native: "한국어", dir: "ltr" },
  { code: "vi", name: "Vietnamese", native: "Tiếng Việt", dir: "ltr" },
  { code: "th", name: "Thai", native: "ไทย", dir: "ltr" },
  { code: "id", name: "Indonesian", native: "Indonesia", dir: "ltr" },
  { code: "ms", name: "Malay", native: "Melayu", dir: "ltr" },
  { code: "az", name: "Azerbaijani", native: "Azərbaycan", dir: "ltr" },
  { code: "hy", name: "Armenian", native: "Հայերեն", dir: "ltr" },
  { code: "ka", name: "Georgian", native: "ქართული", dir: "ltr" },
  { code: "ps", name: "Pashto", native: "پښتو", dir: "rtl" },
  { code: "ku", name: "Kurdish", native: "Kurdî", dir: "ltr" },
  { code: "sw", name: "Swahili", native: "Kiswahili", dir: "ltr" },
];

export const LANGUAGE_BY_CODE = Object.fromEntries(LANGUAGES.map((l) => [l.code, l]));

export function dirOf(code: string): LangDir {
  return LANGUAGE_BY_CODE[code]?.dir ?? (RTL_CODES.has(code) ? "rtl" : "ltr");
}

export function isKnownLocale(code: string): boolean {
  return Boolean(LANGUAGE_BY_CODE[code]);
}
