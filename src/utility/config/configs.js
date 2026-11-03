const ensureTrailingSlash = (value) => value.replace(/\/+$/, '') + '/';
const normalizeUrl = (value) => {
  const withoutDuplicatePathSlashes = value.replace(/([^:]\/)\/+/g, '$1');
  return ensureTrailingSlash(withoutDuplicatePathSlashes);
};

const apiUrl = normalizeUrl(
  import.meta.env.VITE_API_BASE_URL || 'https://backen-pos-1.onrender.com/api/',
);
const storageUrl =
  import.meta.env.VITE_STORAGE_BASE_URL ||
  `${apiUrl.replace(/\/api\/?$/, '')}/storage/`;

export const configs = {
  base_url: ensureTrailingSlash(apiUrl),
  image_url: ensureTrailingSlash(storageUrl),
};

export const getProductImageUrl = (product) => {
  if (typeof product?.image_url === 'string' && product.image_url) {
    return product.image_url;
  }
  if (typeof product?.imageurl === 'string' && product.imageurl) {
    return product.imageurl;
  }
  if (typeof product?.image === 'string' && product.image) {
    if (/^https?:\/\//i.test(product.image)) {
      return product.image;
    }
    return `${configs.image_url}${product.image.replace(/^\/+/, '')}`;
  }
  return null;
};
