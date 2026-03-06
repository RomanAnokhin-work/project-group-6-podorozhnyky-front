"use client";

import Link from "next/link";
import css from "./EditProfilePage.module.css";
import { useAuthStore } from "@/lib/store/authStore";
import { useRouter } from "next/navigation";
import { Formik, Form, Field, FormikHelpers } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCurrentUser } from "@/lib/api/clientApi";
import { MdAddAPhoto } from "react-icons/md";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  icons: {
    icon: "/favicon-1.svg"
  },
  title: "Редагувати | Podorozhnyky",
  description: "Редагування контенту на Podorozhnyky",
  robots: { index: false, follow: false },
};

interface FormValues {
  name: string;
  description: string;
  avatarUrl: string;
  avatarFile?: File | null;
}

const ProfileSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Занадто коротке!")
    .max(32, "Максимум 32 символи")
    .required("Обов'язкове поле"),
  description: Yup.string().max(150, "Максимум 150 символів"),
});

export default function EditProfilePage() {
  const user = useAuthStore((state) => state.user);
  const router = useRouter();
  const queryClient = useQueryClient();
  const setUser = useAuthStore((state) => state.setUser);

  const [previewUrl, setPreviewUrl] = useState<string>(user?.avatarUrl || "");

  useEffect(() => {
    if (user?.avatarUrl) {
      setPreviewUrl(user.avatarUrl);
    }
  }, [user]);

  const initialValues: FormValues = {
    avatarUrl: user?.avatarUrl || "",
    name: user?.name || "",
    description: user?.description || "",
    avatarFile: null,
  };

  const { mutate, isPending } = useMutation({
    mutationFn: (formData: FormData) => updateCurrentUser(formData),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["user", "me"] });
      setUser(response.data);
      router.push("/profile");
    },
    onError: (error) => {
      console.error("Update failed:", error);
    },
  });

  const handleSubmit = async (values: FormValues) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("description", values.description);

    if (values.avatarFile) {
      formData.append("avatar", values.avatarFile);
    } else if (!previewUrl) {
      formData.append("avatar", "");
    }

    mutate(formData);
  };

  return (
    <div className={css.wrapper}>
      <header className={css.header}>
        <Link href="/" className={css.logo_link}>
          <svg className={css.logo_icon} width="32" height="32">
            <use href="/icons.svg#icon-Favicon-1" />
          </svg>
          <p className={css.logo_text}>Подорожники</p>
        </Link>
      </header>

      <main className={css.main}>
        <h1>Давайте познайомимось ближче</h1>

        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={ProfileSchema}
          enableReinitialize={true}
        >
          {({ setFieldValue, values, isValid, dirty }) => {
            const isPhotoChanged = previewUrl !== (user?.avatarUrl || "");
            const isReady = (dirty || isPhotoChanged) && isValid;

            return (
              <Form className={css.form}>
                <div className={css.fieldGroup}>
                  <p className={css.label}>Аватар</p>
                  <div className={css.avatarSection}>
                    <div className={css.avatarCircle}>
                      {previewUrl ? (
                        <Image src={previewUrl} alt="Аватар" className={css.avatarImage} width={117} height={117}/>
                      ) : (
                        <MdAddAPhoto className={css.placeholderIcon} />
                      )}
                    </div>

                    {previewUrl ? (
                      <button
                        type="button"
                        className={css.uploadButton}
                        onClick={() => {
                          setPreviewUrl("");
                          setFieldValue("avatarFile", null);
                          setFieldValue("avatarUrl", "");
                        }}
                      >
                        Видалити фото
                      </button>
                    ) : (
                      <label className={css.uploadButton}>
                        Завантажити фото
                        <input
                          type="file"
                          name="avatar"
                          accept="image/*"
                          hidden
                          onChange={(e) => {
                            const file = e.currentTarget.files?.[0];
                            if (file) {
                              setFieldValue("avatarFile", file);
                              setPreviewUrl(URL.createObjectURL(file));
                            }
                          }}
                        />
                      </label>
                    )}
                  </div>
                </div>

                <div className={css.fieldGroup}>
                  <label htmlFor="description" className={css.label}>Короткий опис</label>
                  <Field
                    as="textarea"
                    id="description"
                    name="description"
                    placeholder="Розкажіть більше про вас"
                    maxLength={150}
                    className={css.textarea}
                  />
                  <p className={`${css.charCount} ${values.description.length >= 150 ? css.error : ""}`}>
                    {values.description.length >= 150
                      ? "Досягнуто ліміту символів (150)"
                      : `Лишилось символів: ${150 - values.description.length}`}
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={!isReady || isPending}
                  className={`${css.submitBtn} ${isReady ? css.active : ""}`}
                >
                  {isPending ? "Збереження..." : "Зберегти"}
                </button>
              </Form>
            );
          }}
        </Formik>
      </main>

      <footer className={css.footer}>
        <p className={css.text}>&copy; 2025 Подорожники</p>
      </footer>
    </div>
  );
}