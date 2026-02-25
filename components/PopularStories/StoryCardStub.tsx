/**
 * TEMPORARY STUB
 * Will be replaced with TravellersStoriesItem
 */
import Image from "next/image";
import Link from "next/link";
import css from "./StoryCardStub.module.css";
import type { ApiStory } from "@/types/story";

type Props = {
  story: ApiStory;
};

function formatDate(dateStr?: string) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("uk-UA");
}

function makeExcerpt(text?: string, maxLen = 150) {
  if (!text) return "";
  const cleaned = text.trim().replace(/\s+/g, " ");
  if (cleaned.length <= maxLen) return cleaned;
  return cleaned.slice(0, maxLen).trimEnd() + "...";
}

export default function StoryCardStub({ story }: Props) {
  const {
    title,
    img,
    article,
    category,
    ownerId,
    favoriteCount,
    date,
    _id,
  } = story;

  const categoryName = category?.name ?? "Категорія";
  const authorName = ownerId?.name ?? "Автор";
  const authorAvatar = ownerId?.avatarUrl;
  const formattedDate = formatDate(date);
  const excerpt = makeExcerpt(article);

  return (
    <div className={css.container}>
    <article className={css.card}>
      <div className={css.imageWrap}>
        {img ? (
          <Image
            src={img}
            alt={title || "Story image"}
            fill
            className={css.image}
            sizes="(max-width: 900px) 100vw, 50vw"
            priority={false}
          />
        ) : (
          <div className={css.imagePlaceholder} />
        )}
      </div>

      <div className={css.body}>
        <div className={css.category}>{categoryName}</div>

        <h3 className={css.title}>{title || "Без назви"}</h3>

        <p className={css.excerpt}>{excerpt}</p>

        <div className={css.metaRow}>
          <div className={css.author}>
            {authorAvatar ? (
              <Image
                src={authorAvatar}
                alt={authorName}
                width={28}
                height={28}
                className={css.avatar}
              />
            ) : (
              <div className={css.avatarPlaceholder} />
            )}
            <span className={css.authorName}>{authorName}</span>
          </div>

          <div className={css.meta}>
            {formattedDate && <span>{formattedDate}</span>}
            {formattedDate && <span className={css.dot}>•</span>}
            <span>{favoriteCount ?? 0} ❤</span>
          </div>
        </div>

        <div className={css.footer}>
          {/* 🔹 временно link-заглушка */}
          <Link href={`/stories/${_id}`} className={css.button}>
            Переглянути статтю
          </Link>

          <button
            className={css.bookmark}
            type="button"
            aria-label="bookmark"
            disabled
            title="Bookmark logic will be added later"
          >
            🔖
          </button>
        </div>
      </div>
    </article></div>
  );
}