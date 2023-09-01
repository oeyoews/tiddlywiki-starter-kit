export async function getLatestCommit() {
  const apiURL = "https://api.github.com/repos/Jermolene/TiddlyWiki5/commits";
  try {
    const res = await fetch(apiURL);
    if (res.status !== 200) return null;
    const data = await res.json();
    return data[0].sha;
  } catch (error) {}
}