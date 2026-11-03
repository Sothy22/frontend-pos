import { request } from '@/utility/helper/request';

export const getPurchases = () => request('purchase', 'get');
export const getPurchase = (id) => request(`purchase/${id}`, 'get');
export const createPurchase = (data) => request('purchase', 'post', data);
export const deletePurchase = (id) => request(`purchase/${id}`, 'delete');
