const ensureTrailingSlash = (value) => value.replace(/\/+$/, '') + '/';
const normalizeUrl = (value) => {
  const withoutDuplicatePathSlashes = value.replace(/([^:]\/)\/+/g, '$1');
  return ensureTrailingSlash(withoutDuplicatePathSlashes);
};

const apiUrl =
  normalizeUrl(
    import.meta.env.VITE_API_BASE_URL ||
      'https://backen-pos-6.onrender.com/api/',
  );
const storageUrl =
  import.meta.env.VITE_STORAGE_BASE_URL ||
  `${apiUrl.replace(/\/api\/?$/, '')}/storage/`;

export const configs = {
  base_url: ensureTrailingSlash(apiUrl),
  image_url: ensureTrailingSlash(storageUrl),
};
