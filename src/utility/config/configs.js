const ensureSlash = (value) => value.replace(/\/+$/, '') + '/';

const apiUrl =
  import.meta.env.VITE_API_BASE_URL || 'https://backen-pos-3.onrender.com/api/';
const storageUrl =
  import.meta.env.VITE_STORAGE_BASE_URL ||
  `${apiUrl.replace(/\/api\/?$/, '')}/storage/`;

export const configs = {
  base_url: ensureSlash(apiUrl),
  image_url: ensureSlash(storageUrl),
};
