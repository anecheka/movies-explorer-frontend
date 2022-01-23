import './AboutMe.css';
import photo from '../../images/photo.jpg';
import arrow from '../../images/arrow.svg';

function AboutMe() {
    
  return (
    <section className="about-me">
        <h2 className="about-me__title">Студент</h2>
        <div className="about-me__main">
            <div className="about-me__description">
                <h3 className="about-me__description-name">Виталий</h3>
                <h4 className="about-me__description-info">Фронтенд-разработчик, 30 лет</h4>
                <p className="about-me__description-bio">Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
                <ul className="about-me__links">
                    <li><a href="https://facebook.com/" target="_blank" rel="noreferrer" className="about-me__link">Facebook</a></li>
                    <li><a href="https://github.com/" target="_blank" rel="noreferrer" className="about-me__link">Github</a></li>
                </ul>
            </div>
            <img className="about-me__photo" src={photo} alt="Фотография студента" />
            <div className="about-me__portfolio">
                <h3 className="about-me__portfolio-title">Портфолио</h3>
                <ul className="about-me__portfolio-list">
                    <li className="about-me__portfolio-list-item">
                        <p>Статичный сайт</p>
                        <a href="/" className="about-me__portfolio-list-item-link" target="_blank">
                            <img className="about-me__portfolio-list-item-link-icon" src={arrow} alt="Иконка перехода на сторонний ресурс" />
                        </a>
                    </li>
                    <li className="about-me__portfolio-list-item">
                        <p>Адаптивный сайт</p>
                        <a href="/" className="about-me__portfolio-list-item-link" target="_blank">
                            <img className="about-me__portfolio-list-item-link-icon" src={arrow} alt="Иконка перехода на сторонний ресурс" />
                        </a>
                    </li>
                    <li className="about-me__portfolio-list-item">
                        <p>Одностраничное приложение</p>
                        <a href="/" className="about-me__portfolio-list-item-link" target="_blank">
                            <img className="about-me__portfolio-list-item-link-icon" src={arrow} alt="Иконка перехода на сторонний ресурс" />
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </section>
  );
}

export default AboutMe;