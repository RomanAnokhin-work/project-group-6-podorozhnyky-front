import AddStoryForm from "@/components/AddStoryForm/AddStoryForm";
import { createStory } from "@/lib/api/Stories";

export default function StoriesCreatePage() {
  const handleCreate = async (data: any) => {
    await createStory(data);
  };

  return (
    <div>
      <h1>Створити нову історію</h1>
      <AddStoryForm onSubmit={handleCreate} />
    </div>
  );
}