import CartCard from '@/components/cards/CartCard';
import CheckOutCard from '@/components/cards/CheckOutCard';
import Poscard from '@/components/cards/Poscard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getData } from '@/func/product';
import { addToCart, clearAll } from '@/store/CartSlice';
import { setRefresh } from '@/store/refreshSlice';
import { Search, SearchSlash, Trash } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function PosPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const refresh = useSelector((state) => state.refresh);

  // fetching data
  const fetchingData = async () => {
    setLoading(true);
    const res = await getData();
    if (res) {
      console.log('Res product: ', res);
      setData(res?.data);
      setLoading(false);
    }
  };

  const total = cart.reduce((acc, item) => acc + item?.qty, 0);

  useEffect(() => {
    fetchingData();

    // Aotu refresh
    if (refresh) {
      fetchingData();
      dispatch(setRefresh(false));
    }
  }, [refresh, useSelector]);

  const addToCarts = (item) => {
    console.log('Add to cart: ', item);
    dispatch(addToCart(item));
    alert(item?.name);
  };

  return (
    <div>
      <div className="flex justify-between">
        <div className="flex flex-row items-center gap-2">
          <h1>Point of Sale</h1>
          <div className="flex gap-2">
            <Input
              value={query}
              placeholder="Search products..."
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <Button
            onClick={() => {}}
            ///
          >
            <Search />
          </Button>
          <Button
            onClick={() => {
              fetchingData();
              setQuery('');
            }}
          >
            <SearchSlash />
          </Button>
        </div>
      </div>
      {/* <h1>Pos Page</h1> */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
        <div className="col-span-3 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {Array.isArray(data) &&
            data.map((item, index) => (
              <Poscard
                key={index}
                data={{ ...item, addToCart: () => addToCarts(item) }}
              />
            ))}
        </div>
        <div className="col-span-1 bg-gray-100 p-4 border-1-2">
          <div className="flex justify-between items-center p-2">
            <div className="flex gap-2">
              <div className="font-medium">Total Items: </div>
              <div className="">{total}</div>
            </div>

            <button
              className="bg-gray-100 hover:bg-gray-200 rounded-full cursor-pointer transition-all duration-300"
              onClick={() => {
                dispatch(clearAll(data));
              }}
            >
              <Trash />
            </button>
          </div>
          <div className="flex flex-col gap-2">
            {Array.isArray(cart) &&
              cart.map((item, index) => <CartCard key={index} data={item} />)}
          </div>

          <div className="m-2">
            <CheckOutCard data={cart} />
          </div>
        </div>
      </div>
    </div>
  );
}
