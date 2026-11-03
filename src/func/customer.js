import { request } from '@/utility/helper/request';

const getData = async () => {
  const res = await request('customer', 'get');
  return res;
};

const createData = async (data) => {
  const res = await request('customer', 'post', data);
  return res;
};

const updateData = async (id, data) => {
  const res = await request(`customer/${id}`, 'post', data);
  return res;
};

const deleteData = async (id) => {
  const res = await request(`customer/${id}`, 'delete');
  return res;
};

export { getData, createData, updateData, deleteData };
