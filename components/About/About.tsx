import Container from "../Container/Container";
import css from "./About.module.css";
const About = () => {
  return (
    <Container className={css.container}>
    <section className={css.about}>
    
        <div className={css.title_text}>
          <h2 className={css.title}>
            Проєкт, створений для тих, хто живе подорожами
          </h2>
          <p className={css.title_description}>
            Ми віримо, що кожна подорож — це унікальна історія, варта того, щоб
            нею поділилися. Наша платформа створена, щоб об`єднати людей,
            закоханих у відкриття нового. Тут ви можете ділитися власним
            досвідом, знаходити друзів та надихатися на наступні пригоди разом з
            нами.
          </p>
        </div>
        <div className={css.avout_container}>
          <div className={css.about_content}>
            <svg className={css.mission_icon} width="48" height="48">
              <use href="/icons.svg#icon-wand_stars" />
            </svg>
            <h3 className={css.about_content_title}>Наша місія</h3>
            <p className={css.about_content_description}>
              Об`єднувати людей через любов до пригод та надихати на нові
              відкриття.
            </p>
          </div>
          <div className={css.about_content}>
            <svg className={css.mission_icon} width="48" height="48">
              <use href="/icons.svg#icon-travel_luggage_and_bags" />
            </svg>
            <h3 className={css.about_content_title}>Автентичні історії</h3>
            <p className={css.about_content_description}>
              Ми цінуємо справжні, нередаговані враження від мандрівників з
              усього світу.
            </p>
          </div>
          <div className={css.about_content}>
            <svg className={css.mission_icon} width="48" height="48">
              <use href="/icons.svg#icon-communication" />
            </svg>
            <h3 className={css.about_content_title}>Ваша спільнота</h3>
            <p className={css.about_content_description}>
              Станьте частиною спільноти, де кожен може бути i автором, i
              читачем.
            </p>
          </div>
        </div>
        
      </section>
      </Container>
  );
};

export default About;
