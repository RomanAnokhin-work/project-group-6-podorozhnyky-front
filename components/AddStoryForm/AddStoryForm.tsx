"use client";

import css from "./AddStoryForm.module.css";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { fetchCategories } from "@/lib/api/clientApi";
import { SelectChevron } from "./SelectChevronIcon";
import AuthNavModal from "../AuthNavModal/AuthNavModal";

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

export default function AddStoryForm() {
  const router = useRouter();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const [categories, setCategories] = useState<ApiCategory[]>([]);
  const [catLoading, setCatLoading] = useState(true);
  const [catError, setCatError] = useState<string | null>(null);

  // ✅ модалка ошибки сохранения
  const [saveErrorOpen, setSaveErrorOpen] = useState(false);

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

  const initialValues: Values = {
    cover: null,
    title: "",
    category: "",
    description: "",
    article: "",
  };

  const schema = useMemo(
    () =>
      Yup.object({
        cover: Yup.mixed<File>()
          .required("Додайте обкладинку")
          .test("fileSize", "Файл завеликий (макс 5MB)", (file) =>
            file ? file.size <= MAX_MB * 1024 * 1024 : false
          )
          .test("fileType", "Тільки JPG/PNG/WebP", (file) =>
            file ? ["image/jpeg", "image/png", "image/webp"].includes(file.type) : false
          ),
        title: Yup.string().trim().required("Вкажіть заголовок").max(80, "Максимум 80 символів"),
        category: Yup.string().required("Оберіть категорію"),
        description: Yup.string()
          .trim()
          .required("Вкажіть короткий опис")
          .max(DESC_MAX, `Максимум ${DESC_MAX} символів`),
        article: Yup.string().trim().required("Вкажіть текст історії").max(2500, "Максимум 2500 символів"),
      }),
    []
  );

  return (
    <div className={css.page}>
      <Formik
        initialValues={initialValues}
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

            // когда бек будет готов:
             formData.append("description", values.description);

            const res = await fetch("/api/stories", { method: "POST", body: formData, credentials: "include" });
            if (!res.ok) throw new Error("Failed");

            const json = await res.json();
            const id = json?.story?._id ?? json?.story?.id ?? json?._id ?? json?.id;

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
        {({ isValid, dirty, isSubmitting, setFieldValue, setFieldTouched, values, errors, touched }) => (
          <>
            <Form className={css.form}>
              <div className={css.left}>
                {/* Cover */}
                <div>
                  <div className={css.label}>Обкладинка статті</div>

                  <div className={css.coverBox}>
                    {previewUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={previewUrl} alt="cover" className={css.coverImg} />
                    ) : (
                      <div className={css.coverPlaceholder} aria-hidden>
                        <svg className={css.placeholderIcon} viewBox="0 0 64 64" fill="none">
                          <circle cx="26" cy="28" r="4" fill="rgba(255, 255, 255, 1)" />
                          <path
                            d="M16 46L28 34L36 42L42 36L56 50H16Z"
                            fill="rgba(255, 251, 251, 1)"
                          />
                        </svg>
                      </div>
                    )}
                  </div>

                  <div className={css.uploadRow}>
                    <input
                      id="cover"
                      className={css.fileInput}
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      onChange={(e) => {
                        const file = e.currentTarget.files?.[0] ?? null;
                        setFieldValue("cover", file);
                        setFieldTouched("cover", true, true);

                        if (previewUrl) URL.revokeObjectURL(previewUrl);
                        setPreviewUrl(file ? URL.createObjectURL(file) : null);
                      }}
                    />
                    <label htmlFor="cover" className={css.uploadBtn}>
                      Завантажити фото
                    </label>
                  </div>

                  <div className={css.error}>
                    <ErrorMessage name="cover" />
                  </div>
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
                        {catLoading ? "Завантаження..." : catError ? "Помилка" : "Категорія"}
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
                    Лишилось символів: {DESC_MAX - (values.description?.length ?? 0)}
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
                  disabled={!isValid || !dirty || isSubmitting || catLoading || !!catError}
                >
                  {isSubmitting ? "Збереження..." : "Зберегти"}
                </button>

                <button type="button" className={css.secondaryBtn} onClick={() => router.back()}>
                  Відмінити
                </button>
              </div>
            </Form>
          </>
        )}
      </Formik>
       {/* ✅ Модалка ошибки сохранения */}
        <AuthNavModal
          isOpen={saveErrorOpen}
          onClose={() => setSaveErrorOpen(false)}/>
    </div>
  );
}