import css from "./AuthTitle.module.css";

interface AuthTitleProps {
  title: string;
  subTitle: string;
}

export default function AuthTitle({ title, subTitle }: AuthTitleProps) {
  return (
    <div className={css.wrap}>
      <h1 className={css.title}>{title}</h1>
      <p className={css.subTitle}>{subTitle}</p>
    </div>
  );
}
