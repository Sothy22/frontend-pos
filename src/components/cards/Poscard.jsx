import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';

export default function Poscard({ data }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      <Card className="w-87.5">
        <img className="w-full h-87.5" src={data?.imageurl} alt={data?.name} />
        <CardHeader>
          <CardTitle className={'flex gap-1'}>
            <div className="">{data?.name}</div>|
            <div className="">{data?.brand?.name}</div>|
            <div className="">{data?.category?.name}</div>|
            <div className="">
              {data?.status ? (
                <Badge variant="default">Instock</Badge>
              ) : (
                <Badge variant="destructive">Outstock</Badge>
              )}
            </div>
          </CardTitle>
          <CardDescription className="line-clamp-2">
            {data?.description}
          </CardDescription>
          <CardAction className="text-md font-bold flex gap-1"></CardAction>
        </CardHeader>
        <CardContent className="flex flex-row gap-2">
          <div>
            Price: <span className="font-bold">${data?.price}</span>
          </div>
          |
          <div>
            QTY: <Badge variant="destructive">{data?.qty}</Badge>
          </div>
          |
          <div className="">
            Discount: <span className="text-green-500">{data?.discount}%</span>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Details</Button>
          <Button
            className="text-white hover:bg-blue-600 cursor-pointer"
            onClick={() => data.addToCart?.(data)}
          >
            Add to Cart
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
