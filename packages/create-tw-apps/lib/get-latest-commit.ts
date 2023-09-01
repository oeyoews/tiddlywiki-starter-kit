export async function getLatestCommit() {
  const apiURL = "https://api.github.com/repos/Jermolene/TiddlyWiki5/commits";
  const res = await fetch(apiURL);
  const data = await res.json();
  return data[0].sha;
}