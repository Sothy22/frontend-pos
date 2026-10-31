import { request } from '@/utility/helper/request';

const getData = async () => {
  const res = await request('order', 'get');
  return res;
};

const createData = async (data) => {
  const res = await request('order', 'post', data);
  return res;
};

const updateData = async (id, data) => {
  const res = await request(`order/${id}`, 'post', data);
  return res;
};

const deleteData = async (id) => {
  const res = await request(`order/${id}`, 'delete');
  return res;
};

export { getData, createData, updateData, deleteData };
