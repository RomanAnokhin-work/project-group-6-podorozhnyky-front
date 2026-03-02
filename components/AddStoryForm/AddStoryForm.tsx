"use client";

import { useEffect, useState } from "react";

type StoryFormData = {
  title: string;
  content: string;
  image: string;
};

type Props = {
  initialValues?: StoryFormData;
  onSubmit: (data: StoryFormData) => void;
};

export default function AddStoryForm({ initialValues, onSubmit }: Props) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");

  //  Заповнення форми при редагуванні
  useEffect(() => {
    if (initialValues) {
      setTitle(initialValues.title || "");
      setContent(initialValues.content || "");
      setImage(initialValues.image || "");
    }
  }, [initialValues]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
if (!title.trim()) {
  alert("Введіть назву");
  return;
}
    onSubmit({
      title,
      content,
      image,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Назва"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Текст історії"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <input
        placeholder="URL зображення"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />

      {/*  Відображення зображення */}
      {image && (
        <div>
         <img
  src={image}
  alt="Story preview"
  width={300}
  onError={(e) => (e.currentTarget.src = "/placeholder.png")}
/>
        </div>
      )}

      <button type="submit">Зберегти</button>
    </form>
  );
}
