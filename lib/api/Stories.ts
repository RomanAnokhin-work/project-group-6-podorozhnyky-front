export async function getStoryById(storyId: string) {
  const res = await fetch(`/api/stories/${storyId}`);

  if (!res.ok) {
    throw new Error("Failed to fetch story");
  }

  return res.json();
}

export async function createStory(data: any) {
  await fetch(`/api/stories`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

export async function updateStory(storyId: string, data: any) {
  const res = await fetch(`/api/stories/${storyId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to update story");
  }
}