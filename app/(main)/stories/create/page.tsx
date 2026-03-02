import AddStoryForm from "@/components/AddStoryForm/AddStoryForm";
import css from "@/components/AddStoryForm/AddStoryForm.module.css";
import Container from "@/components/Container/Container";

export default function AddStoryPage() {
  return (
    <Container className={css.container}>
      <h1 className={css.title}>Створити нову історію</h1>
      <AddStoryForm />
    </Container>
  );
}
