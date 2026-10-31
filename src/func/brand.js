import { request } from '@/utility/helper/request';
import { ArrowUpSquare } from 'lucide-react';

const getData = async () => {
  const res = await request('brand', 'get');
  return res;
};
const createData = async (data) => {
  const res = await request('brand', 'post', data);
  return res;
};

const searchData = async (query) => {
  const res = await request(`brand/search?query=${query}`, 'get');
  return res;
};

const updateData = async (id, data) => {
  const res = await request(`brand/${id}`, 'put', data);
  return res;
};

const deleteData = async (id) => {
  const res = await request(`brand/${id}`, 'delete');
  return res;
};

export { getData, updateData, deleteData, searchData, createData };
