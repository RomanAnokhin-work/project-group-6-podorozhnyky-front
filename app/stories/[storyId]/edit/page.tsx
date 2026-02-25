"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import AddStoryForm from "@/components/AddStoryForm/AddStoryForm";
import { getStoryById, updateStory } from "@/lib/api/Stories";

export default function EditStoryPage() {
  const { storyId } = useParams();
  const [story, setStory] = useState<any>(null);

  //  Завантаження історії
  useEffect(() => {
    if (!storyId) return;

    getStoryById(storyId as string).then(setStory);
  }, [storyId]);

  const handleUpdate = async (data: any) => {
    await updateStory(storyId as string, data);
  };

  if (!story) return <p>Loading...</p>;

  return (
    <div>
      <h1>Редагувати історію</h1>

      <AddStoryForm
        initialValues={story}
        onSubmit={handleUpdate}
      />
    </div>
  );
}