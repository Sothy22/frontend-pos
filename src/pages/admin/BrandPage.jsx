import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Edit, Plus, Search, SearchSlash, Trash } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Spinner } from '@/components/ui/spinner';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { formartDate } from '@/utility/helper/formartDate';
import { request } from '@/utility/helper/request';
import {
  createData,
  deleteData,
  getData,
  searchData,
  updateData,
} from '@/func/brand';

export default function BrandPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [data, setData] = useState([]);
  const [form, setForm] = useState({
    id: '',
    name: '',
    status: true,
    description: '',
  });

  // Query for search category
  const [query, setQuery] = useState('');

  // function fetching data
  const fetchingData = async () => {
    setLoading(true);
    const res = await getData();
    console.log('Res: ', res?.data);
    if (res) {
      setData(res?.data || res);
      setLoading(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchingData();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log('Form data: ', form);

    if (isEdit) {
      const res = await updateData(form?.id, form);
      if (res) {
        console.log('Res updated category: ', res);
      }
      // reset isEdit
      setIsEdit(false);
      fetchingData();
    } else {
      const res = await createData(form);
      if (res) {
        console.log('Res created category: ', res);
        fetchingData();
      }
    }

    fetchingData();
    // close form
    setIsOpen(false);
    // clear form data
    setForm({ id: '', name: '', status: true, description: '' });
  };

  return (
    <div className="">
      <div className="flex justify-between">
        <div className="flex flex-row gap-2 items-center">
          <h1>Brand</h1>
          <div className="">
            <Input
              value={query}
              placeholder="Search Brand"
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <Button
            onClick={async () => {
              setLoading(true);
              const res = await searchData(query);
              if (res) {
                console.log('Res search Brand: ', res);
                setData(res?.data);
                setLoading(false);
              }
            }}
          >
            <Search />
          </Button>
          <Button
            onClick={() => {
              fetchingData();
              // Clear text search
              setQuery('');
            }}
          >
            <SearchSlash />
          </Button>
        </div>

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button>
              Create <Plus />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-xl">
            <DialogHeader>{isEdit ? 'Updata' : 'Create'} Brand</DialogHeader>
            {/* <DialogDescription>For create Brand</DialogDescription> */}
            <form action="" onSubmit={onSubmit} className="flex flex-col gap-3">
              <div className="flex flex-col gap-1.5">
                <Label>Name</Label>
                <Input
                  value={form?.name}
                  placeholder="Name"
                  onChange={(e) => {
                    setForm({ ...form, name: e.target.value });
                  }}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label>Status</Label>
                <Select
                  value={String(form?.status)}
                  onValueChange={(value) => {
                    setForm({ ...form, status: String(value) === 'true' });
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="true">Active</SelectItem>
                      <SelectItem value="false">Inactive</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-1.5">
                <Label>Description</Label>
                <Textarea
                  value={form?.description}
                  placeholder="Description"
                  onChange={(e) => {
                    setForm({ ...form, description: e.target.value });
                  }}
                />
              </div>
              <DialogFooter className="">
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => {
                    // Close Dialog form
                    setIsOpen(false);
                    // Clear form data
                    setForm({
                      id: '',
                      name: '',
                      status: true,
                      description: '',
                    });
                    // Reset isEdit
                    setIsEdit(false);
                  }}
                >
                  Cancel
                </Button>
                <Button variant="" type="submit">
                  {isEdit ? 'Update' : 'Save'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="mt-5">
        <Table>
          <TableCaption>A list of Brand</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>No</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Create at</TableHead>
              <TableHead>Update at</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6}>
                  <div className="flex justify-center mt-5">
                    <Spinner className={'size-5'} />
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              <>
                {Array.isArray(data) &&
                  data.length > 0 &&
                  data.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{item?.name}</TableCell>
                      <TableCell>{item?.description}</TableCell>
                      <TableCell>
                        {item?.status ? (
                          <Badge>Active</Badge>
                        ) : (
                          <Badge variant="secondary">Inactive</Badge>
                        )}
                      </TableCell>
                      <TableCell>{formartDate(item?.created_at)}</TableCell>
                      <TableCell>{formartDate(item?.updated_at)}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            onClick={() => {
                              console.log('Item edit: ', item);
                              // Open form
                              setIsOpen(true);
                              // Set data into form data
                              setForm(item);
                              // Set isEdit
                              setIsEdit(true);
                            }}
                          >
                            <Edit />
                          </Button>

                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="destructive">
                                <Trash />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Are you sure to delete this Brand?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  This action cannot be undone. This will
                                  permanently delete your account from our
                                  servers.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={async () => {
                                    console.log('Item delete: ', item);
                                    const res = await deleteData(item?.id);
                                    if (res) {
                                      console.log('Res delete Brand: ', res);
                                      fetchingData();
                                    }
                                  }}
                                >
                                  OK
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
              </>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
