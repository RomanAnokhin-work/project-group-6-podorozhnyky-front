import Container from "../Container/Container";
import styles from "./Hero.module.css";

const Hero = () => {
  return (
    <section className={styles.hero} id="hero">
      <Container className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.title}>Відкрийте світ подорожей з нами!</h1>
          <p className={styles.description}>
            Приєднуйтесь до нашої спільноти мандрівників, де ви зможете ділитися
            своїми історіями та отримувати натхнення для нових пригод. Відкрийте
            для себе нові місця та знайдіть однодумців!
          </p>
          <a href="#join" className={styles.joinLink}>
            Доєднатись
          </a>
        </div>
      </Container>
    </section>
  );
};

export default Hero;
