const ensureSlash = (value) => value.replace(/\/+$/, '') + '/';

const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api/';
const storageUrl =
  import.meta.env.VITE_STORAGE_BASE_URL ||
  `${apiUrl.replace(/\/api\/?$/, '')}/storage/`;

export const configs = {
  base_url: ensureSlash(apiUrl),
  image_url: ensureSlash(storageUrl),
};
