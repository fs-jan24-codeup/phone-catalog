import { useTranslation } from 'react-i18next';
import { Dropdown } from '../Dropdown';

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
      <Dropdown
        value={savedLanguage}
        options={languages.map(lng => lng.code)}
        onChange={changeLanguage}
      />
    </div>
  );
};
