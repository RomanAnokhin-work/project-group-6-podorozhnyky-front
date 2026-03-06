"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import {
  addArticleToSaved,
  removeArticleFromSaved,
} from '@/lib/api/clientApi';
import AuthNavModal from '@/components/AuthNavModal/AuthNavModal';
import css from './TravellersStoriesItem.module.css';
import { useAuthStore } from '@/lib/store/authStore';
import { useQueryClient } from "@tanstack/react-query";

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
  isOwnStory?: boolean;
  onNeedAuth?: () => void;
};

const getCategoryName = (category: TravellerStory["category"]) => {
  if (typeof category === "object" && category !== null) {
    return category.name ?? "";
  }

  return "";
};

export default function TravellersStoriesItem({
  story,
  isAuthenticated,
  isSaved = false,
  isOwnStory = false,
}: TravellersStoriesItemProps) {
  const { user, setUser } = useAuthStore.getState();
  const queryClient = useQueryClient();
  const storeIsAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const effectiveIsAuthenticated = isAuthenticated ?? storeIsAuthenticated;
  const [saved, setSaved] = useState(isSaved);
  const [count, setCount] = useState(story.favoriteCount || 0);
  const [loading, setLoading] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    setSaved(isSaved)
  },[isSaved])

  const categoryName = getCategoryName(story.category);
  const ownerSource = (story.owner || story.ownerId) as StoryOwner;
  
  const authorName = ownerSource?.name || "";
  const authorAvatarUrl = ownerSource?.avatarUrl || "";
  const formattedDate = new Date(story.date).toLocaleDateString("uk-UA");
  const saveButtonClassName = saved ? `${css.saveButton} ${css.saveButtonSaved}` : css.saveButton;
  const bookmarkIconClassName = saved ? `${css.bookmarkIcon} ${css.bookmarkIconSaved}` : css.bookmarkIcon

  const openAuthModal = () => setShowAuthModal(true);

  const handleSaveClick = async () => {
    if (loading) return;

    if (!effectiveIsAuthenticated) {
      openAuthModal();
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
        if (!user) return;

setUser({
  ...user,
  savedArticles: [...user.savedArticles, story._id],
});
      } else {
        await removeArticleFromSaved(story._id);
       if (!user) return;

setUser({
  ...user,
  savedArticles: user.savedArticles.filter(id => id !== story._id),
});
      }
      
    } catch {
      setSaved(oldSaved);
      setCount(oldCount);
      if (!effectiveIsAuthenticated) {
        openAuthModal();
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <article className={css.card}>
      <div className={css.imageWrap} style={{ position: "relative" }}>
        <Image
          className={css.image}
          src={story.img}
          alt={story.title}
          width={416}
          height={277}
        />
      </div>

      <div className={css.content}>
        <div className={css.storyContent}>
          <p className={css.category}>{categoryName}</p>
          <h3 className={css.title}>{story.title}</h3>
          <p className={css.text}>{story.article}</p>
        </div>

        <div className={css.authorBlock}>
          <div className={css.avatarWrap} style={{ position: "relative" }}>
            {authorAvatarUrl ? (
              <Image
                className={css.avatar}
                src={authorAvatarUrl}
                alt={authorName || "Author avatar"}
                width={48}
                height={48}
              />
            ) : (
              <span className={css.avatarFallback}>
                {authorName.slice(0, 1)}
              </span>
            )}
          </div>

          <div>
            <p className={css.authorName}>{authorName}</p>
            <p className={css.meta}>
              <span>{formattedDate}</span>
              <span className={css.dot}>&bull;</span>
              <span>{count}</span>
              <svg
                className={css.metaIcon}
                width="16"
                height="16"
                aria-hidden="true"
              >
                <use href="/icons.svg#icon-bookmark" />
              </svg>
            </p>
          </div>
        </div>

        <div className={css.actions}>
          <Link className={css.viewButton} href={`/stories/${story._id}`}>
            {"Переглянути статтю"}
          </Link>

          <button
            className={saveButtonClassName}
            type="button"
            onClick={handleSaveClick}
            disabled={loading}
            aria-pressed={saved}
            aria-label={saved ? "Видалити зі збережених" : "Додати в збережені"}
          >

            {isOwnStory ? <Link href={`/stories/${story._id}/edit`}><svg className={css.editIcon} aria-hidden="true">
              <use href="/icons.svg#icon-edit" />
            </svg></Link> : <svg className={bookmarkIconClassName} aria-hidden="true">
              <use href="/icons.svg#icon-bookmark" />
            </svg>}
          </button>
            
        </div>

        <AuthNavModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
        />
      </div>
    </article>
  );
}
