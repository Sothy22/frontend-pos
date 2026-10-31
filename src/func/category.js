import { request } from '@/utility/helper/request';
import { ArrowUpSquare } from 'lucide-react';

const getData = async () => {
  const res = await request('category', 'get');
  return res;
};
const createData = async (data) => {
  const res = await request('category', 'post', data);
  return res;
};

const searchData = async (query) => {
  const res = await request(`category/search?query=${query}`, 'get');
  return res;
};

const updateData = async (id, data) => {
  const res = await request(`category/${id}`, 'put', data);
  return res;
};

const deleteData = async (id) => {
  const res = await request(`category/${id}`, 'delete');
  return res;
};

export { getData, updateData, deleteData, searchData, createData };
