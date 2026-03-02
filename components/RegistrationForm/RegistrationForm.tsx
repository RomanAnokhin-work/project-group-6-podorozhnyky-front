"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import { useRouter } from "next/navigation";
import * as Yup from "yup";
import toast, { Toaster } from "react-hot-toast";
import { register, RegisterRequest } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import Container from "../Container/Container";
import css from "./RegistrationForm.module.css";

const validationSchema = Yup.object({
  name: Yup.string()
    .required("Ім'я та прізвище обов'язкове")
    .trim()
    .min(2, "Мінімум 2 символи"),
  email: Yup.string()
    .required("Пошта обов'язкова")
    .email("Введіть коректну email-адресу"),
  password: Yup.string()
    .required("Пароль обов'язковий")
    .min(8, "Пароль має містити мінімум 8 символів"),
});

type FormValues = {
  name: string;
  email: string;
  password: string;
};

const initialValues: FormValues = {
  name: "",
  email: "",
  password: "",
};

export default function RegistrationForm() {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  const handleSubmit = async (values: FormValues) => {
    try {
      const payload: RegisterRequest = {
        name: values.name.trim(),
        email: values.email.trim(),
        password: values.password,
      };
      const user = await register(payload);
      setUser(user);
      router.push("/");
    } catch (err: unknown) {
      let message = "Сталася помилка. Спробуйте ще раз.";
      if (err && typeof err === "object") {
        if (
          "response" in err &&
          err.response &&
          typeof err.response === "object"
        ) {
          const response = (err as {
            response: { status?: number; data?: unknown };
          }).response;

          if (response.status === 400 || response.status === 409) {
            message = "Цей користувач вже зареєстрований";
          } else {
            const data = response.data;
            if (data && typeof data === "object" && "message" in data) {
              message = String((data as { message: string }).message);
            } else if (data && typeof data === "object" && "error" in data) {
              message = String((data as { error: string }).error);
            }
          }
        } else if ("message" in err) {
          message = String((err as { message: string }).message);
        }
      }
      toast.error(message);
    }
  };

  return (
    <section className={css.section}>
      <Container className={css.container}>
        <Toaster position="top-right" />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className={css.form} noValidate>
            <div className={css.formGroup}>
              <label htmlFor="name" className={css.label}>
                Ім&apos;я та Прізвище*
              </label>
              <Field
                id="name"
                name="name"
                type="text"
                placeholder="Ваше ім'я та прізвище"
                className={css.input}
                autoComplete="name"
              />
              <ErrorMessage
                name="name"
                component="span"
                className={css.error}
              />
            </div>

            <div className={css.formGroup}>
              <label htmlFor="email" className={css.label}>
                Пошта*
              </label>
              <Field
                id="email"
                name="email"
                type="email"
                placeholder="hello@podorozhnyky.ua"
                className={css.input}
                autoComplete="email"
              />
              <ErrorMessage
                name="email"
                component="span"
                className={css.error}
              />
            </div>

            <div className={css.formGroup}>
              <label htmlFor="password" className={css.label}>
                Пароль*
              </label>
              <Field
                id="password"
                name="password"
                type="password"
                placeholder="********"
                className={css.input}
                autoComplete="new-password"
              />
              <ErrorMessage
                name="password"
                component="span"
                className={css.error}
              />
            </div>

            <button
              type="submit"
              className={css.submitButton}
              disabled={isSubmitting}
              aria-busy={isSubmitting}
            >
              {isSubmitting ? "Зачекайте" : "Зареєструватись"}
            </button>
          </Form>
        )}
      </Formik>
      </Container>
    </section>
  );
}
