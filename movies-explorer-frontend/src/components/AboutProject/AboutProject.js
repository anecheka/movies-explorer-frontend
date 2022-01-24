import './AboutProject.css';

function AboutProject() {
  return (
    <section className="about-project">
      <h2 className="about-project__title">О проекте</h2>
      <div className="about-project__description">
        <h3 className="about-project__description-title about-project__description-title_contents_stages">Дипломный проект включал 5&nbsp;этапов</h3>
        <p className="about-project__description-copy about-project__description-copy_contents_stages">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и&nbsp;финальные доработки.</p>
        <h3 className="about-project__description-title about-project__description-title_contents_timeline">На&nbsp;выполнение диплома ушло 5&nbsp;недель
        </h3>
        <p className="about-project__description-copy about-project__description-copy_contents_timeline">У&nbsp;каждого этапа был мягкий и&nbsp;жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
      </div>
      <div className="about-project__timeline-diagram-section">
        <p className="about-project__timeline-diagram about-project__timeline-diagram_contents_back">1&nbsp;неделя</p>
        <p className="about-project__timeline-diagram-label about-project__timeline-diagram-label_contents_back">Back-end</p>
        <p className="about-project__timeline-diagram about-project__timeline-diagram_contents_front">4&nbsp;недели</p>
        <p className="about-project__timeline-diagram-label about-project__timeline-diagram-label_contents_front">Front-end</p>
      </div>
    </section>
  );
}

export default AboutProject;