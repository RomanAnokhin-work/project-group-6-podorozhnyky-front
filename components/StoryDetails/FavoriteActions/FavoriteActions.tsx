"use client";

import { useRouter } from "next/navigation";
import { ReactNode, useState } from "react";
import ConfirmDeleteContent from "../../ConfirmDeleteContent/ConfirmDeleteContent";
import Modal from "../../Modal/Modal";
import css from "./FavoriteActions.module.css";
import { deleteStory } from "@/lib/api/clientApi";
import toast from "react-hot-toast";

type Props = {
  articleId: string;
  isAuthenticated: boolean;
  isFavorite: boolean;
  saving: boolean;
  isOwner: boolean;
  onToggle: () => void;
  onDelete: () => void;
  idForDelete: string
};

export default function FavoriteActions({
  idForDelete,
  articleId,
  isAuthenticated,
  isFavorite,
  saving,
  isOwner,
  onToggle,
  onDelete,
}: Props) {
  const router = useRouter();
  const [showConfirm, setShowConfirm] = useState(false);
  const handleClick = async ()=>{
    const deletePromise = deleteStory(idForDelete);
    toast.promise(deletePromise, {
    loading: 'Видалення історії...',
    success: 'Історію успішно видалено! Відправляємо вас на сторінку профілю.',
    error: 'Не вдалося видалити історію.',
  });
    try {
    await deletePromise;

    setTimeout(() => {
      router.push("/profile/own");
    }, 3000);
    
  } catch (error) {
    console.error("Delete error:", error);
  }
  }
  if (isOwner) {
    return (
      <>
        {showConfirm && (
          <Modal onClose={() => setShowConfirm(false)}>
            <ConfirmDeleteContent
              onConfirm={() => {
                setShowConfirm(false);
                onDelete();
              }}
              onCancel={() => setShowConfirm(false)}
            />
          </Modal>
        )}

        <div className={css.saveSection}>
          <h3 className={css.saveTitle}>Це ваша історія</h3>
          <p className={css.saveText}>
            Ви можете відредагувати або видалити її.
          </p>

          <div className={css.buttonsRow}>
            <button
              className={css.saveButton}
              onClick={() => router.push(`/stories/${articleId}/edit`)}
            >
              Редагувати
            </button>

            <button
              className={css.deleteButton}
              onClick={handleClick }
            >
              Видалити
            </button>
          </div>
        </div>
      </>
    );
  }
  // ---- 2) НЕ АВТОРИЗОВАНИЙ -------------------------------------
  if (!isAuthenticated) {
    return (
      <div className={css.saveSection}>
        <h3 className={css.saveTitle}>Увійдіть, щоб зберегти історію</h3>
        <p className={css.saveText}>
          Ця функція доступна лише авторизованим користувачам.
        </p>

        <button
          className={css.saveButton}
          onClick={() => router.push("/auth/login")}
        >
          Увійти
        </button>
      </div>
    );
  }

  // ---- 3) АВТОРИЗОВАНИЙ — НЕ в обраних --------------------------
  if (!isFavorite) {
    return (
      <div className={css.saveSection}>
        <h3 className={css.saveTitle}>Збережіть собі історію</h3>
        <p className={css.saveText}>
          Вона буде доступна у вашому профілі у розділі збережене.
        </p>

        <button className={css.saveButton} onClick={onToggle} disabled={saving}>
          {saving ? "Збереження..." : "Зберегти"}
        </button>
      </div>
    );
  }

  // ---- 4) АВТОРИЗОВАНИЙ — В ОБРАНИХ ------------------------------
  return (
    <div className={css.saveSection}>
      <h3 className={css.saveTitle}>Історія у ваших збережених</h3>
      <p className={css.saveText}>
        Ви можете видалити її із розділу збережених.
      </p>

      <button className={css.saveButton} onClick={onToggle} disabled={saving}>
        {saving ? "Видалення..." : "Видалити"}
      </button>
    </div>
  );
}
