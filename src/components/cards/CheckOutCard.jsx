import { Input } from '@base-ui/react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { useReactToPrint } from 'react-to-print';
import InvoiceCard from './InvoiceCard';
import { useRef, useState } from 'react';
import { createData } from '@/func/order';
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { clearAll } from '@/store/CartSlice';
import { setRefresh } from '@/store/refreshSlice';

export default function CheckOutCard({ data }) {
  // for print
  const ref = useRef();
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    paid_amount: '',
    total_amount: '',
    remark: '',
    payment_method: '',
  });
  const totalItem = data.reduce((acc, item) => acc + item?.qty, 0);
  const totalOrigenal = data.reduce(
    (acc, item) => acc + Number(item?.qty) * Number(item?.price),
    0,
  );
  const totalDiscount = data.reduce(
    (acc, item) =>
      acc +
      ((Number(item?.discount) * Number(item?.price)) / 100) *
        Number(item?.qty),
    0,
  );

  const totalAmount = Number(totalOrigenal) - Number(totalDiscount);

  // event for print
  const onPrint = useReactToPrint({
    contentRef: ref,
  });

  // check out
  const handleCheckout = async () => {
    const payload = {
      paid_amount: Number(form.paid_amount),
      total_amount: totalAmount,
      remark: form?.remark,
      payment_method: form?.payment_method,
      detail: data.map((item) => ({
        price: item?.price,
        qty: item?.qty,
        discount: item?.discount,
        total:
          Number(item?.price) * Number(item?.qty) -
          ((Number(item?.price) * Number(item?.discount)) / 100) *
            Number(item?.qty),
        product_id: item?.id,
      })),
    };

    try {
      const res = await createData(payload);
      if (res) {
        console.log('Res : ', res);
        toast('Event has been created.');
        setForm({
          paid_amount: '',
          total_amount: '',
          remark: '',
          payment_method: '',
        });
        dispatch(setRefresh(true));
        // clear all cart
        dispatch(clearAll());
      }
    } catch (error) {
      console.log('Error :', error);
      toast.error('Error');
    }
  };

  const items = [
    { label: 'ABA', value: 'ABA' },
    { label: 'AC', value: 'AC' },
    { label: 'Cash', value: 'Cash' },
  ];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row justify-between border-b">
        <div className="">Items: </div>
        <div className="">{totalItem.toFixed(2)}</div>
      </div>
      <div className="flex flex-row justify-between border-b">
        <div className="">Total Origenal: </div>
        <div className="">${totalOrigenal.toFixed(2)}</div>
      </div>
      <div className="flex flex-row justify-between border-b">
        <div className="">Total Discount: </div>
        <div className="">{totalDiscount.toFixed(2)}%</div>
      </div>
      <div className="flex flex-row justify-between border-b">
        <div className="">Total: </div>
        <div className="">${totalOrigenal - totalDiscount.toFixed(2)}</div>
      </div>
      <div className="flex flex-row justify-between border-b gap-2 pb-2">
        <Input
          value={form.paid_amount}
          placeholder="Amount Payment"
          onChange={(e) => setForm({ ...form, paid_amount: e.target.value })}
        />
        <Select
          // items={items}
          value={form?.payment_method}
          onValueChange={(value) =>
            setForm((prev) => ({ ...prev, payment_method: value }))
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Payment Method" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {items.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="">
        <Textarea
          value={form.remark}
          placeholder="remark"
          onChange={(e) => setForm({ ...form, remark: e.target.value })}
        />
      </div>

      <div className="flex flex-row gap-2 justify-end">
        <Button variant="outline" onClick={onPrint}>
          Print
        </Button>
        <Button onClick={handleCheckout}>Check Out</Button>
      </div>
      <div className="hidden">
        <InvoiceCard
          ref={ref}
          data={{ items: data, discount: totalDiscount }}
        />
      </div>
    </div>
  );
}
