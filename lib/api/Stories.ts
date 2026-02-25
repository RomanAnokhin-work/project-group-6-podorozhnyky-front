export async function getStoryById(storyId: string) {
  const res = await fetch(`/api/stories/${storyId}`);
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
  await fetch(`/api/stories/${storyId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}