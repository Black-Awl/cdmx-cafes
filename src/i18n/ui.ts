export const languages = {
  en: 'English',
  es: 'Español',
};

export const defaultLang = 'en';

export const ui = {
  en: {
    'nav.home': 'Home',
    'nav.cafes': 'Cafes',
    'nav.about': 'About',
    'site.title': 'CDMX Cafes',
    'site.description': 'Discover the best coffee spots in Mexico City!',
  },
  es: {
    'nav.home': 'Inicio',
    'nav.cafes': 'Cafés',
    'nav.about': 'Acerca de',
    'site.title': 'Cafés CDMX',
    'site.description': '¡Descubre los mejores lugares de café en la Ciudad de México!',
  },
} as const;

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split('/');
  if (lang in ui) return lang as keyof typeof ui;
  return defaultLang;
}

export function useTranslations(lang: keyof typeof ui) {
  return function t(key: keyof typeof ui[typeof defaultLang]) {
    return ui[lang][key] || ui[defaultLang][key];
  }
}
