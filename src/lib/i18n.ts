/**
 * Internationalization (i18n) utilities
 */

export type Language = 'en' | 'ar' | 'id';

export interface Translation {
  [key: string]: string;
}

export const translations: Record<Language, Translation> = {
  en: {
    'nav.home': 'Home',
    'nav.blog': 'Blog',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'footer.about': 'About Iqra Society',
    'footer.quickLinks': 'Quick Links',
    'footer.connect': 'Connect',
    'footer.copyright': 'All rights reserved.',
    'blog.latest': 'Latest Articles',
    'blog.readMore': 'Read More',
    'blog.postedOn': 'Posted on',
    'contact.title': 'Contact Us',
    'contact.send': 'Send Message',
    'search.placeholder': 'Search articles...',
  },
  ar: {
    'nav.home': 'الرئيسية',
    'nav.blog': 'المدونة',
    'nav.about': 'عن المجتمع',
    'nav.contact': 'اتصل بنا',
    'footer.about': 'عن جمعية إقرأ',
    'footer.quickLinks': 'روابط سريعة',
    'footer.connect': 'تواصل معنا',
    'footer.copyright': 'جميع الحقوق محفوظة.',
    'blog.latest': 'أحدث المقالات',
    'blog.readMore': 'اقرأ المزيد',
    'blog.postedOn': 'نشر في',
    'contact.title': 'اتصل بنا',
    'contact.send': 'إرسال رسالة',
    'search.placeholder': 'ابحث عن مقالات...',
  },
  id: {
    'nav.home': 'Beranda',
    'nav.blog': 'Blog',
    'nav.about': 'Tentang Kami',
    'nav.contact': 'Kontak',
    'footer.about': 'Tentang Iqra Society',
    'footer.quickLinks': 'Tautan Cepat',
    'footer.connect': 'Hubungi Kami',
    'footer.copyright': 'Hak cipta dilindungi.',
    'blog.latest': 'Artikel Terbaru',
    'blog.readMore': 'Baca Selengkapnya',
    'blog.postedOn': 'Diposting pada',
    'contact.title': 'Hubungi Kami',
    'contact.send': 'Kirim Pesan',
    'search.placeholder': 'Cari artikel...',
  },
};

/**
 * Get translation for a key in the specified language
 */
export function t(key: string, lang: Language = 'en'): string {
  return translations[lang]?.[key] || key;
}

/**
 * Get the current language from the URL path
 */
export function getLanguageFromUrl(url: URL): Language {
  const [, lang] = url.pathname.split('/');
  if (lang === 'ar' || lang === 'id') {
    return lang;
  }
  return 'en';
}

/**
 * Get the localized path for a given path
 */
export function localizedPath(path: string, lang: Language): string {
  if (lang === 'en') {
    return path;
  }
  return `/${lang}${path}`;
}
