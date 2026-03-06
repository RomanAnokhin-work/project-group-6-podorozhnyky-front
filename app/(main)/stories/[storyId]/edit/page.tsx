


import AddStoryForm from "@/components/AddStoryForm/AddStoryForm";
import Container from "@/components/Container/Container";
import css from "@/components/AddStoryForm/AddStoryForm.module.css";
import AddEditForm from "@/components/AddEditForm/AddEditForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
   icons: {
    icon: "/favicon-1.svg"
  },
  title: "Редагувати | Podorozhnyky",
  description: "Редагування контенту на Podorozhnyky",
  robots: { index: false, follow: false },
};

export default async function EditStoryPage({
  params,
}: {
  params: Promise<{ storyId: string }>;
}) {
  const { storyId } = await params;
  console.log(storyId);

 return (
    <Container className={css.container}>
      <h1 className={css.title}>Редагувати історію</h1>
      <AddEditForm storyId={storyId} />
    </Container>
  );
}
