"use client";

import css from "../AddStoryForm/AddStoryForm.module.css";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Image from "next/image";
import { fetchCategories, fetchStoryById } from "@/lib/api/clientApi";
import { SelectChevron } from "../AddStoryForm/SelectChevronIcon";
import AuthNavModal from "../AuthNavModal/AuthNavModal";
import ConfirmModal from "../ConfirmModal/ConfirmModal";
import { log } from "console";

type ApiCategory = { _id: string; name: string };

type Values = {
  cover: File | null;
  title: string;
  category: string;
  description: string;
  article: string;
};

const MAX_MB = 5;
const DESC_MAX = 61;

export default function AddEditForm({ storyId }: { storyId?: string }) {
  const router = useRouter();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [initialStoryData, setInitialStoryData] =
    useState<Partial<Values> | null>(null);
  const [storyLoading, setStoryLoading] = useState(false);

  const [categories, setCategories] = useState<ApiCategory[]>([]);
  const [catLoading, setCatLoading] = useState(true);
  const [catError, setCatError] = useState<string | null>(null);

  // ✅ модалка ошибки сохранения
  const [saveErrorOpen, setSaveErrorOpen] = useState(false);
  const [cancelOpen, setCancelOpen] = useState(false);

  // 1) Загружаем категории один раз
  useEffect(() => {
    (async () => {
      try {
        setCatLoading(true);
        setCatError(null);
        const data = await fetchCategories();
        setCategories(data ?? []);
      } catch {
        setCatError("Не вдалося завантажити категорії");
      } finally {
        setCatLoading(false);
      }
    })();
  }, []);

  // 2) Загружаем данные истории, если есть storyId
  useEffect(() => {
    if (!storyId) return;

    const loadStory = async () => {
      try {
        setStoryLoading(true);
        const data = await fetchStoryById(storyId);
        console.log(data);

        if (data) {
          setInitialStoryData({
            title: data.title,
            category: data.category._id,
            description: "",
            article: data.article,
            cover: null, // File object ми не можемо зберегти, тільки URL
          });

          if (data.img) {
            setPreviewUrl(data.img);
          }
        }
      } catch (error) {
        console.error("Error fetching story data:", error);
      } finally {
        setStoryLoading(false);
      }
    };

    loadStory();
  }, [storyId]);

  // 3) Чистим blob URL при смене/размонтаже
  useEffect(() => {
    return () => {
      if (previewUrl && previewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const initialValues: Values = {
    cover: null,
    title: initialStoryData?.title || "",
    category: initialStoryData?.category || "",
    description: initialStoryData?.description || "",
    article: initialStoryData?.article || "",
  };

  const schema = useMemo(
    () =>
      Yup.object({
        cover: Yup.mixed<File>()
          .nullable()
          .test("isFile", "Додайте обкладинку", (v) => {
            // В режимі редагування cover може бути null, якщо є previewUrl
            if (storyId && previewUrl) return true;
            return v instanceof File;
          })
          .test("fileSize", "Файл завеликий (макс 5MB)", (file) =>
            file instanceof File ? file.size <= MAX_MB * 1024 * 1024 : true,
          )
          .test("fileType", "Тільки JPG/PNG/WebP", (file) =>
            file instanceof File
              ? ["image/jpeg", "image/png", "image/webp"].includes(file.type)
              : true,
          ),
        title: Yup.string()
          .trim()
          .required("Вкажіть заголовок")
          .max(80, "Максимум 80 символів"),
        category: Yup.string().required("Оберіть категорію"),
        description: Yup.string()
          .trim()
          .required("Вкажіть короткий опис")
          .max(DESC_MAX, `Максимум ${DESC_MAX} символів`),
        article: Yup.string()
          .trim()
          .required("Вкажіть текст історії")
          .max(2500, "Максимум 2500 символів"),
      }),
    [storyId, previewUrl],
  );

  return (
    <div className={css.page}>
      <Formik
        initialValues={initialValues}
        enableReinitialize
        validationSchema={schema}
        validateOnMount
        onSubmit={async (values, { setSubmitting }) => {
          try {
            setSaveErrorOpen(false);

            const formData = new FormData();
            formData.append("img", values.cover as File);
            formData.append("title", values.title);
            formData.append("category", values.category);
            formData.append("article", values.article);
            formData.append("description", values.description);

            const res = await fetch(`/api/stories/${storyId}`, {
              method: "PATCH",
              body: formData,
              credentials: "include",
            });
            if (!res.ok) throw new Error("Failed");

            const json = await res.json();
            const id =
              json?.story?._id ?? json?.story?.id ?? json?._id ?? json?.id;

            // по ТЗ: редирект на /stories/[storyId]
            if (id) router.push(`/stories/${id}`);
            else router.push("/stories");
          } catch {
            // ✅ по ТЗ: модалка "Помилка збереження"
            setSaveErrorOpen(true);
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({
          resetForm,
          isValid,
          dirty,
          isSubmitting,
          setFieldValue,
          validateField,
          values,
          errors,
          touched,
        }) => (
          <>
            <Form className={css.form}>
              <div className={css.left}>
                {/* Cover */}
                <div>
                  <div className={css.label}>Обкладинка статті</div>
                  <div className={css.coverBox}>
                    <Image
                      src={
                        previewUrl ??
                        "/images/cover-placeholder/cover-placeholder.webp"
                      }
                      alt="cover"
                      fill
                      className={css.coverImg}
                      unoptimized={!!previewUrl}
                      priority={!previewUrl}
                      sizes="(min-width: 1440px) 416px, (min-width: 768px) 340px, 335px"
                    />
                  </div>

                  <div className={css.uploadRow}>
                    <input
                      id="cover"
                      className={css.fileInput}
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      onChange={(e) => {
                        const input = e.currentTarget;
                        const file = input.files?.[0] ?? null;

                        setFieldValue("cover", file);
                        validateField("cover");

                        setPreviewUrl((prev) => {
                          if (prev) URL.revokeObjectURL(prev);
                          return file ? URL.createObjectURL(file) : null;
                        });
                        input.value = "";
                      }}
                    />

                    <label htmlFor="cover" className={css.uploadBtn}>
                      Завантажити фото
                    </label>
                  </div>

                  {touched.cover && errors.cover ? (
                    <div className={css.error}>{errors.cover}</div>
                  ) : null}
                </div>

                {/* Title */}
                <div className={css.field}>
                  <div className={css.label}>Заголовок</div>
                  <Field
                    name="title"
                    className={`${css.input} ${touched.title && errors.title ? css.isError : ""}`}
                    placeholder="Введіть заголовок історії"
                  />
                  <div className={css.error}>
                    <ErrorMessage name="title" />
                  </div>
                </div>

                {/* Category */}
                <div className={css.field}>
                  <div className={css.label}>Категорія</div>

                  <div className={css.selectWrapper}>
                    <Field
                      as="select"
                      name="category"
                      className={`${css.select} ${touched.category && errors.category ? css.isError : ""}`}
                      disabled={catLoading || !!catError}
                    >
                      <option value="">
                        {catLoading
                          ? "Завантаження..."
                          : catError
                            ? "Помилка"
                            : "Категорія"}
                      </option>

                      {!catLoading &&
                        !catError &&
                        categories.map((c) => (
                          <option key={c._id} value={c._id}>
                            {c.name}
                          </option>
                        ))}
                    </Field>

                    <span className={css.chevronBtn} aria-hidden>
                      <SelectChevron />
                    </span>
                  </div>

                  {catError && <div className={css.error}>{catError}</div>}

                  <div className={css.error}>
                    <ErrorMessage name="category" />
                  </div>
                </div>

                {/* Description */}
                <div className={css.field}>
                  <div className={css.label}>Короткий опис</div>
                  <Field
                    as="textarea"
                    name="description"
                    className={`${css.textarea} ${touched.description && errors.description ? css.isError : ""}`}
                    placeholder="Введіть короткий опис історії"
                    maxLength={DESC_MAX}
                  />
                  <div className={css.uploadHint}>
                    Лишилось символів:{" "}
                    {DESC_MAX - (values.description?.length ?? 0)}
                  </div>
                  <div className={css.error}>
                    <ErrorMessage name="description" />
                  </div>
                </div>

                {/* Article */}
                <div className={css.field}>
                  <div className={css.label}>Текст історії</div>
                  <Field
                    as="textarea"
                    name="article"
                    className={`${css.textareaarticle} ${touched.article && errors.article ? css.isError : ""}`}
                    placeholder="Ваша історія тут"
                  />
                  <div className={css.error}>
                    <ErrorMessage name="article" />
                  </div>
                </div>
              </div>

              <div className={css.actions}>
                <button
                  type="submit"
                  className={css.primaryBtn}
                  disabled={
                    !isValid ||
                    !dirty ||
                    isSubmitting ||
                    catLoading ||
                    !!catError
                  }
                >
                  {isSubmitting ? "Збереження..." : "Зберегти"}
                </button>

                <button
                  type="button"
                  className={css.secondaryBtn}
                  onClick={() => {
                    if (!dirty && !previewUrl) {
                      resetForm();
                      setPreviewUrl(null);
                      return;
                    }

                    setCancelOpen(true);
                  }}
                >
                  Відмінити
                </button>
                {cancelOpen && (
                  <ConfirmModal
                    title={
                      storyId
                        ? "Скасувати редагування?"
                        : "Скасувати створення історії?"
                    }
                    text={
                      storyId
                        ? "Усі незбережені зміни буде втрачено."
                        : "Усі введені дані та обкладинка буде втрачено."
                    }
                    confirmButtonText="Так, скасувати"
                    cancelButtonText="Ні, продовжити"
                    isLoading={isSubmitting}
                    onCancel={() => setCancelOpen(false)}
                    onConfirm={() => {
                      setCancelOpen(false);
                      setPreviewUrl((prev) => {
                        if (prev?.startsWith("blob:"))
                          URL.revokeObjectURL(prev);
                        return null;
                      });
                      resetForm();
                      if (storyId) {
                        router.push(`/stories/${storyId}`);
                      }
                    }}
                  />
                )}
              </div>
            </Form>
          </>
        )}
      </Formik>
      {/* ✅ Модалка ошибки сохранения */}
      <AuthNavModal
        isOpen={saveErrorOpen}
        onClose={() => setSaveErrorOpen(false)}
      />
    </div>
  );
}
