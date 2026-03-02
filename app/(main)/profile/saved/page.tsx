import { getMe } from "@/lib/api/serverApi";

export default async function SavedStory() {
  const { savedArticles } = await getMe();

  return (
    <ul>
      {savedArticles.map((article) => (
        <li key={article}></li>
      ))}
    </ul>
  );
}
