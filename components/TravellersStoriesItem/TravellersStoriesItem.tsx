'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
  addArticleToSaved,
  removeArticleFromSaved,
} from '@/app/api/api';
import css from './TravellersStoriesItem.module.css';

type StoryOwner = {
  name?: string;
  avatarUrl?: string;
};

type StoryCategory = {
  name?: string;
};

export type TravellerStory = {
  _id: string;
  img: string;
  title: string;
  article: string;
  date: string;
  favoriteCount: number;
  category?: string | StoryCategory;
  ownerId?: string | StoryOwner;
  owner?: StoryOwner;
};

type TravellersStoriesItemProps = {
  story: TravellerStory;
  isAuthenticated?: boolean;
  isSaved?: boolean;
  onNeedAuth?: () => void;
};

export default function TravellersStoriesItem({
  story,
  isAuthenticated = false,
  isSaved = false,
  onNeedAuth,
}: TravellersStoriesItemProps) {
  const [saved, setSaved] = useState(isSaved);
  const [count, setCount] = useState(story.favoriteCount || 0);
  const [loading, setLoading] = useState(false);

  const categoryName =
    typeof story.category === 'string' ? story.category : (story.category?.name ?? '');
  const ownerSource = story.owner || story.ownerId;
  const authorName = typeof ownerSource === 'object' ? (ownerSource.name ?? '') : '';
  const authorAvatarUrl = typeof ownerSource === 'object' ? (ownerSource.avatarUrl ?? '') : '';
  const date = new Date(story.date);
  const formattedDate = Number.isNaN(date.getTime())
    ? story.date
    : date.toLocaleDateString('uk-UA');

  const handleSaveClick = async () => {
    if (loading) return;

    if (!isAuthenticated) {
      if (onNeedAuth) {
        onNeedAuth();
      }
      return;
    }

    const oldSaved = saved;
    const oldCount = count;
    const nextSaved = !saved;

    setSaved(nextSaved);
    setCount(nextSaved ? count + 1 : Math.max(0, count - 1));
    setLoading(true);

    try {
      if (nextSaved) {
        await addArticleToSaved(story._id);
      } else {
        await removeArticleFromSaved(story._id);
      }
    } catch {
      setSaved(oldSaved);
      setCount(oldCount);
      // TODO: show push notification with API error message
    } finally {
      setLoading(false);
    }
  };

  return (
    <article className={css.card}>
      <div className={css.imageWrap}>
        <img className={css.image} src={story.img} alt={story.title} />
      </div>

      <div className={css.content}>
        <div className={css.storyContent}>
          <p className={css.category}>{categoryName}</p>
          <h3 className={css.title}>{story.title}</h3>
          <p className={css.text}>{story.article}</p>
        </div>

        <div className={css.authorBlock}>
          <div className={css.avatarWrap}>
            {authorAvatarUrl ? (
              <img className={css.avatar} src={authorAvatarUrl} alt={authorName} />
            ) : (
              <span className={css.avatarFallback}>{authorName.slice(0, 1)}</span>
            )}
          </div>

          <div>
            <p className={css.authorName}>{authorName}</p>
            <p className={css.meta}>
              <span>{formattedDate}</span>
              <span className={css.dot}>&bull;</span>
              <span>{count}</span>
              <svg className={css.metaIcon} width="16" height="16" aria-hidden="true">
                <use href="/icons.svg#icon-bookmark" />
              </svg>
            </p>
          </div>
        </div>

        <div className={css.actions}>
          <Link className={css.viewButton} href={`/stories/${story._id}`}>
            {'Переглянути статтю'}
          </Link>

          <button
            className={`${css.saveButton} ${saved ? css.saveButtonActive : ''}`}
            type="button"
            onClick={handleSaveClick}
            disabled={loading}
            aria-label={
              saved
                ? 'Видалити зі збережених'
                : 'Додати в збережені'
            }
          >
            <svg className={css.bookmarkIcon} width="20" height="20" aria-hidden="true">
              <use href="/icons.svg#icon-bookmark" />
            </svg>
          </button>
        </div>

        {/* TODO: showAuthModal && <AuthNavModal onClose={...} /> */}
      </div>
    </article>
  );
}
