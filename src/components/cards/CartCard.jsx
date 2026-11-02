import { Card, CardContent } from '@/components/ui/card';
import { Minus, Plus, X } from 'lucide-react';
import { Badge } from '../ui/badge';
import { useDispatch } from 'react-redux';
import { clear, descreaseCart, increaseCart } from '@/store/CartSlice';
import { getProductImageUrl } from '@/utility/config/configs';

export default function CartCard({ data }) {
  const dispatch = useDispatch();

  return (
    <div>
      <Card>
        <CardContent className={'flex flex-row gap-2'}>
          {getProductImageUrl(data) ? (
            <img
              className="h-20 w-20 rounded-md bg-gray-300 object-cover"
              src={getProductImageUrl(data)}
              alt={data?.name ?? 'Product'}
            />
          ) : (
            <div className="flex h-20 w-20 items-center justify-center rounded-md bg-gray-300 text-xs text-gray-500">
              No image
            </div>
          )}
          <div className="flex-1 flex flex-col gap-2">
            <div className="font-medium">{data?.name}</div>
            <div className="flex flex-row gap-2">
              <div className="font-medium">{data?.brand?.name}</div>|
              <div className="font-medium">{data?.category?.name}</div>|
              <div className="">
                {data?.status ? (
                  <Badge variant="default">Instock</Badge>
                ) : (
                  <Badge variant="destructive">Outstock</Badge>
                )}
              </div>
            </div>
            <div className="flex flex-row gap-2">
              <div className="">
                Quantity: <Badge>{data?.qty}</Badge>
              </div>
              |
              <div className="">${Number(data?.qty) * Number(data?.price)}</div>
              <button
                className="bg-gray-100 hover:bg-gray-200 rounded-full cursor-pointer transition-all duration-300"
                onClick={() => {
                  dispatch(increaseCart(data));
                }}
              >
                <Plus />
              </button>
              <button
                className="bg-gray-100 hover:bg-gray-200 rounded-full cursor-pointer transition-all duration-300"
                onClick={() => {
                  dispatch(descreaseCart(data));
                }}
              >
                <Minus />
              </button>
            </div>
          </div>
          <div
            className="cursor-pointer"
            onClick={() => {
              dispatch(clear(data));
            }}
          >
            <X />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
