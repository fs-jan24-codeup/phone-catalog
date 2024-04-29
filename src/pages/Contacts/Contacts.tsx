import Kateryna from '../../assets/images/contacts/Kateryna.jfif';
import Vasyl from '../../assets/images/contacts/Vasyl.jfif';
import Viktoriia from '../../assets/images/contacts/Viktoriia.jfif';
import Vitalii from '../../assets/images/contacts/Vitalii.jfif';
import Iliia from '../../assets/images/contacts/Iliia.jfif';
import Vadym from '../../assets/images/contacts/Vadym.jfif';
import './Contacts.scss';
import '../../components/FadeOut/FadeOut.scss'
import { useEffect } from 'react';

export const Contacts: React.FC = () => {
  const contacts = [
    {
      name: 'Vasyl Dudla',
      image: Vasyl,
      githubLink: 'https://github.com/Vasya564',
    },
    {
      name: 'Kateryna Shepetska',
      image: Kateryna,
      githubLink: 'https://github.com/kshepetska',
    },
    {
      name: 'Viktoriia Zaitseva',
      image: Viktoriia,
      githubLink: 'https://github.com/ViktoriiaRepo',
    },
    {
      name: 'Vitalii Vashkevych',
      image: Vitalii,
      githubLink: 'https://github.com/VitaliiVashkevych',
    },
    {
      name: 'Iliia Onyshchuk',
      image: Iliia,
      githubLink: 'https://github.com/illya-onyshchuk',
    },
    {
      name: 'Vadym Khromei',
      image: Vadym,
      githubLink: 'https://github.com/khromakeiqt',
    },
  ];

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);


  return (
    <div className="contacts fadeOut animate">
      {contacts.map(contact => (
        <div className="contact__container">
          <div className="contact__wrapper">
            <div className="contact__img">
              <img src={contact.image} alt={contact.name} className="img" />
            </div>
            <p className="contact__name">{contact.name}</p>
            <p className="contact__text">Fullstack developer</p>
            <button className="contact__github">
              <a
                href={contact.githubLink}
                target="_blank"
                rel="noreferrer"
                className="contact__link"
              >
                Github
              </a>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
