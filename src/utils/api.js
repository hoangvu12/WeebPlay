import axios from "axios";

const BASE_URL = "https://vuighe-clone.glitch.me/api/v1/anime";

export async function getAnimeInfo(slug) {
  const URL = `${BASE_URL}/info?slug=${slug}`;

  const { data } = await axios.get(URL);

  return data;
}

export async function getEpisodeInfo(animeId, episodeIndex) {
  const URL = `${BASE_URL}/${animeId}/episode/${episodeIndex}`;

  const { data } = await axios.get(URL);

  return data;
}

export async function getAnimeList() {
  const { data } = await axios.get(BASE_URL);

  return data;
}
