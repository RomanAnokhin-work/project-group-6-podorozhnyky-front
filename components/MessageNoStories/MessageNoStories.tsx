"use client";

import Link from "next/link";
import css from "./MessageNoStories.module.css";
import Container from "../Container/Container";
  

export interface MessageNoStoriesProps {
  text: string;
  buttonText: string;
  buttonRoute: "/stories" | "/stories/create" | "/travellers";
}

const MessageNoStories = ({
  text = "ddd",
  buttonText = "ffff",
  buttonRoute = "/stories",
}: MessageNoStoriesProps) => {
  return (
    <Container className={css.container}>
    <div className={css.wrapper} role="status" aria-live="polite">
      <p className={css.text}>{text}</p>
      <Link href={buttonRoute} className={css.button}>
        {buttonText}
      </Link>
      </div>
      </Container>
  );
};

export default MessageNoStories;
