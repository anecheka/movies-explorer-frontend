import React from 'react';
import './Footer.css';

function Footer() {
    
  return (
    <footer className="footer">
        <h5 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h5>
        <div className="footer__wrapper">
            <p className="footer__year">&copy; 2022</p>
            <ul className="footer__links-list">
                <li className="footer__links-list-item">
                    <a href="https://practicum.yandex.ru/" target="_blank" rel="noreferrer" className="footer__link">Яндекс.Практикум</a>
                </li>
                <li className="footer__links-list-item">
                    <a href="https://github.com/" target="_blank" rel="noreferrer" className="footer__link">Github</a>
                </li>
                <li className="footer__links-list-item">
                    <a href="https://www.facebook.com/" target="_blank" rel="noreferrer" className="footer__link">Facebook</a>
                </li>
            </ul>
        </div>
    </footer>
  );
}

export default Footer;
