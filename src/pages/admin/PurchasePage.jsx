import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Plus, Trash } from 'lucide-react';
import { getPurchases, createPurchase, deletePurchase } from '@/func/purchase';
import { getData as getProducts } from '@/func/product';
import { getData as getSuppliers } from '@/func/supplier';
import { formartDate } from '@/utility/helper/formartDate';

const emptyDetail = {
  product_id: '',
  cost: '',
  qty: 1,
  discount: 0,
  remark: '',
  ref: '',
};

export default function PurchasePage() {
  const [data, setData] = useState([]);
  const [products, setProducts] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    supplier_id: '',
    shipping_cost: 0,
    paid: 0,
    paid_date: '',
    detail: [emptyDetail],
  });

  const fetchData = async () => {
    const [purchaseResponse, productResponse, supplierResponse] =
      await Promise.all([getPurchases(), getProducts(), getSuppliers()]);
    setData(purchaseResponse?.data || []);
    setProducts(productResponse?.data || []);
    setSuppliers(supplierResponse?.data || []);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const updateDetail = (index, field, value) => {
    setForm((current) => ({
      ...current,
      detail: current.detail.map((item, itemIndex) =>
        itemIndex === index ? { ...item, [field]: value } : item,
      ),
    }));
  };

  const submit = async (event) => {
    event.preventDefault();
    await createPurchase({
      ...form,
      shipping_cost: Number(form.shipping_cost),
      paid: Number(form.paid),
      detail: form.detail.map((item) => ({
        ...item,
        cost: Number(item.cost),
        qty: Number(item.qty),
        discount: Number(item.discount),
      })),
    });
    setOpen(false);
    setForm({ supplier_id: '', shipping_cost: 0, paid: 0, paid_date: '', detail: [emptyDetail] });
    fetchData();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1>Purchase</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild><Button><Plus /> Create</Button></DialogTrigger>
          <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-3xl">
            <DialogHeader><DialogTitle>Create Purchase</DialogTitle></DialogHeader>
            <form onSubmit={submit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1"><Label>Supplier</Label><select className="h-9 w-full rounded-md border px-3" required value={form.supplier_id} onChange={(e) => setForm({ ...form, supplier_id: e.target.value })}><option value="">Select supplier</option>{suppliers.map((item) => <option key={item._id || item.id} value={item._id || item.id}>{item.name}</option>)}</select></div>
                <div className="space-y-1"><Label>Paid Date</Label><Input type="date" value={form.paid_date} onChange={(e) => setForm({ ...form, paid_date: e.target.value })} /></div>
                <div className="space-y-1"><Label>Shipping Cost</Label><Input type="number" min="0" value={form.shipping_cost} onChange={(e) => setForm({ ...form, shipping_cost: e.target.value })} /></div>
                <div className="space-y-1"><Label>Paid</Label><Input type="number" min="0" value={form.paid} onChange={(e) => setForm({ ...form, paid: e.target.value })} /></div>
              </div>
              {form.detail.map((detail, index) => (
                <div key={index} className="grid grid-cols-2 gap-3 rounded-md border p-3 md:grid-cols-6">
                  <div className="space-y-1 md:col-span-2"><Label>Product</Label><select className="h-9 w-full rounded-md border px-3" required value={detail.product_id} onChange={(e) => updateDetail(index, 'product_id', e.target.value)}><option value="">Select product</option>{products.map((item) => <option key={item._id || item.id} value={item._id || item.id}>{item.name}</option>)}</select></div>
                  <div className="space-y-1"><Label>Cost</Label><Input required type="number" min="0" value={detail.cost} onChange={(e) => updateDetail(index, 'cost', e.target.value)} /></div>
                  <div className="space-y-1"><Label>Qty</Label><Input required type="number" min="1" value={detail.qty} onChange={(e) => updateDetail(index, 'qty', e.target.value)} /></div>
                  <div className="space-y-1"><Label>Discount</Label><Input type="number" min="0" value={detail.discount} onChange={(e) => updateDetail(index, 'discount', e.target.value)} /></div>
                  <div className="space-y-1"><Label>Ref</Label><Input value={detail.ref} onChange={(e) => updateDetail(index, 'ref', e.target.value)} /></div>
                </div>
              ))}
              <Button type="button" variant="outline" onClick={() => setForm({ ...form, detail: [...form.detail, emptyDetail] })}><Plus /> Add Product</Button>
              <DialogFooter><Button variant="outline" type="button" onClick={() => setOpen(false)}>Cancel</Button><Button type="submit">Save Purchase</Button></DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <Table>
        <TableHeader><TableRow><TableHead>Supplier</TableHead><TableHead>Shipping</TableHead><TableHead>Paid</TableHead><TableHead>Status</TableHead><TableHead>Created</TableHead><TableHead /></TableRow></TableHeader>
        <TableBody>{data.map((item) => (
          <TableRow key={item._id || item.id}>
            <TableCell>{item.supplier?.name || '-'}</TableCell>
            <TableCell>{item.shipping_cost}</TableCell>
            <TableCell>{item.paid}</TableCell>
            <TableCell>{item.status ? 'Active' : 'Inactive'}</TableCell>
            <TableCell>{formartDate(item.created_at)}</TableCell>
            <TableCell><Button size="icon" variant="destructive" onClick={async () => { await deletePurchase(item._id || item.id); fetchData(); }}><Trash /></Button></TableCell>
          </TableRow>
        ))}</TableBody>
      </Table>
    </div>
  );
}
