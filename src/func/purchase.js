import { request } from '@/utility/helper/request';

const getData = async () => {
  const res = await request('purchase', 'get');
  return res;
};

const createData = async (data) => {
  const res = await request('purchase', 'post', data);
  return res;
};

const updateData = async (id, data) => {
  const res = await request(`purchase/${id}`, 'post', data);
  return res;
};

const deleteData = async (id) => {
  const res = await request(`purchase/${id}`, 'delete');
  return res;
};

export { getData, createData, updateData, deleteData };

export const getPurchases = getData;
export const createPurchase = createData;
export const updatePurchase = updateData;
export const deletePurchase = deleteData;
