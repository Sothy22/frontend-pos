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
import { Edit, Plus, Trash } from 'lucide-react';
import { createData, deleteData, getData, updateData } from '@/func/customer';
import { formartDate } from '@/utility/helper/formartDate';

const emptyForm = { id: '', name: '', address: '', email: '', tel: '' };

export default function CustomerPage() {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);

  const fetchData = async () => {
    const response = await getData();
    setData(response?.data || []);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const submit = async (event) => {
    event.preventDefault();
    const payload = {
      name: form.name,
      address: form.address,
      email: form.email || null,
      tel: form.tel || null,
    };
    if (form.id) {
      await updateData(form.id, payload);
    } else {
      await createData(payload);
    }
    setOpen(false);
    setForm(emptyForm);
    fetchData();
  };

  const remove = async (id) => {
    await deleteData(id);
    fetchData();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1>Customer</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus /> Create
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {form.id ? 'Update Customer' : 'Create Customer'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={submit} className="space-y-3">
              <div className="space-y-1">
                <Label>Name</Label>
                <Input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>
              <div className="space-y-1">
                <Label>Email</Label>
                <Input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
              <div className="space-y-1">
                <Label>Phone</Label>
                <Input
                  value={form.tel}
                  onChange={(e) => setForm({ ...form, tel: e.target.value })}
                />
              </div>
              <div className="space-y-1">
                <Label>Address</Label>
                <Input
                  value={form.address}
                  onChange={(e) =>
                    setForm({ ...form, address: e.target.value })
                  }
                />
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    setForm(emptyForm);
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit">{form.id ? 'Update' : 'Create'}</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Created</TableHead>
            <TableHead>Action</TableHead>
            <TableHead />
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item._id || item.id}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.email}</TableCell>
              <TableCell>{item.tel}</TableCell>
              <TableCell>{item.address}</TableCell>
              <TableCell>{formartDate(item.created_at)}</TableCell>
              <TableCell className="flex gap-2">
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => {
                    setForm({
                      id: item._id || item.id,
                      name: item.name || '',
                      address: item.address || '',
                      email: item.email || '',
                      tel: item.tel || '',
                    });
                    setOpen(true);
                  }}
                >
                  <Edit />
                </Button>
                <Button
                  size="icon"
                  variant="destructive"
                  onClick={() => remove(item._id || item.id)}
                >
                  <Trash />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
