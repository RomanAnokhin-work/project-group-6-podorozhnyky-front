"use client";

import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { useId } from "react";
import css from "./LoginForm.module.css";
import { useRouter } from "next/navigation";
import { getMe, login, LoginRequest } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
interface LoginFormValues {
  email: string;
  password: string;
}

const initialValues: LoginFormValues = {
  email: "",
  password: "",
};

const LoginFormSchema = Yup.object().shape({
  email: Yup.string()
    .email("Не валідний емейл")
    .max(64, "Значення задовге")
    .required("Поле обовʼязкове"),
  password: Yup.string()
    .min(8, "Мінімум 8 символів")
    .max(128, "Значення задовге")
    .required("Поле обовʼязкове"),
});

function LoginForm() {
  const setUser = useAuthStore((state) => state.setUser);
  const router = useRouter();
  const fieldId = useId();

  const { mutate, isPending } = useMutation({
    mutationFn: login,
    onSuccess: async () => {
      const user = await getMe(); // з clientApi
      setUser(user);
      router.push("/profile");
      toast.success("Ви успішно увійшли! Ласкаво просимо в мережу мандрівників!👋"); 
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          toast.error("Невірна електронна пошта або пароль");
          return;
        }
      }

      toast.error("Щось пішло не так. Спробуйте ще раз.");
    },
  });

  const handleSubmit = (
    values: LoginRequest,
    actions: FormikHelpers<LoginRequest>,
  ) => {
    mutate(values, {
      onSettled: () => {
        actions.setSubmitting(false);
      },
    });
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={LoginFormSchema}
      onSubmit={handleSubmit}
      validateOnBlur
      validateOnChange
    >
      {({ isSubmitting }) => {
        return (
          <Form className={css.form}>
            <div className={css.field}>
              <label className={css.label} htmlFor={`${fieldId}-email`}>
                Пошта*
              </label>
              <Field
                className={css.input}
                id={`${fieldId}-email`}
                // type="email"
                name="email"
                placeholder="hello@podorozhnyky.ua"
              />
              <ErrorMessage
                className={css.error}
                name="email"
                component="span"
              />
            </div>

            <div className={css.field}>
              <label className={css.label} htmlFor={`${fieldId}-password`}>
                Пароль*
              </label>

              <div className={css.passwordWrapper}>
                <Field
                  className={css.input}
                  id={`${fieldId}-password`}
                  name="password"
                  type="password"
                  placeholder="********"
                />
              </div>
              <Link href="/auth/send-reset-email" className={css.forgotLink}>
                Забули пароль?
              </Link>

              <ErrorMessage
                className={css.error}
                name="password"
                component="span"
              />
            </div>
            <button
              type="submit"
              className={css.submitButton}
              disabled={isSubmitting || isPending}
            >
              {isPending ? "Завантаження..." : "Увійти"}
            </button>
          </Form>
        );
      }}
    </Formik>
  );
}

export default LoginForm;
