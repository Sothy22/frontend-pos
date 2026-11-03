import { request } from '@/utility/helper/request';

export const getCustomers = () => request('customer', 'get');
export const createCustomer = (data) => request('customer', 'post', data);
export const updateCustomer = (id, data) =>
  request(`customer/${id}`, 'put', data);
export const deleteCustomer = (id) => request(`customer/${id}`, 'delete');
