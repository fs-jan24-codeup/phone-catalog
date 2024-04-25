import Kateryna from '../../../public/img/contacts/Kateryna.jfif';
import Vasyl from '../../../public/img/contacts/Vasyl.jfif';
import Viktoriia from '../../../public/img/contacts/Viktoriia.jfif';
import Vitalii from '../../../public/img/contacts/Vitalii.jfif';
import Iliia from '../../../public/img/contacts/Iliia.jfif';
import Vadym from '../../../public/img/contacts/Vadym.jfif';
import './Contacts.scss';

export const Contacts: React.FC = () => {
    const contacts = [
        { name: 'Vasyl Dudla', image: Vasyl, githubLink: 'https://github.com/Vasya564' },
        { name: 'Kateryna Shepetska', image: Kateryna, githubLink: 'https://github.com/kshepetska' },
        { name: 'Viktoriia Zaitseva', image: Viktoriia, githubLink: 'https://github.com/ViktoriiaRepo' },
        { name: 'Vitalii Vashkevych', image: Vitalii, githubLink: 'https://github.com/VitaliiVashkevych' },
        { name: 'Iliia Onyshchuk', image: Iliia, githubLink: 'https://github.com/khromakeiqt' },
        { name: 'Vadym Khromei', image: Vadym, githubLink: 'https://github.com/khromakeiqt' },
    ];      

    return (
            <div className="contacts">
                {contacts.map(contact => (
                    <div className='contact__container'>
                        <div className="contact__wrapper">
                            <div className="contact__img">
                                <img src={contact.image} alt={contact.name} className="img" />
                            </div>
                        <p className="contact__name">
                            {contact.name}
                        </p>
                        <p className="contact__text">
                            Fullstack developer
                        </p>
                        <button className='contact__github'>
                            <a href={contact.githubLink} target="_blank" rel="noreferrer" className='contact__link'>
                                Github
                            </a>
                        </button>
                       </div>
                    </div>
                    
                ))}
            </div>
    );
};
