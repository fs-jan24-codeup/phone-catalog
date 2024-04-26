import React from 'react';
import { useTranslation } from 'react-i18next';

const languages = [
  { code: 'en', lang: 'English' },
  { code: 'ua', lang: 'Ukrainian' },
  { code: 'fr', lang: 'French' },
  { code: 'zh', lang: 'Chinese' },
];

export const LanguagesSelector: React.FC = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lngCode: string) => {
    i18n.changeLanguage(lngCode);
    localStorage.setItem('selectedLanguage', lngCode);
  };

  const savedLanguage = localStorage.getItem('selectedLanguage') || 'en';

  return (
    <div className="languages__dropdown">
      <select
        value={savedLanguage}
        onChange={e => changeLanguage(e.target.value)}
      >
        {languages.map(lng => (
          <option key={lng.code} value={lng.code}>
            {lng.lang}
          </option>
        ))}
      </select>
    </div>
  );
};
