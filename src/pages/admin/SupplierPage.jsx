import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Download,
  Edit,
  Import,
  Plus,
  Search,
  SearchSlash,
  Trash,
} from 'lucide-react';
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
import { formartDate } from '@/utility/helper/formartDate';
import {
  createData,
  deleteData,
  getData,
  searchData,
  updateData,
  ImportData,
} from '@/func/supplier';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

export default function CategoryPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [data, setData] = useState([]);
  const [form, setForm] = useState({
    id: '',
    name: '',
    code: '',
    website: '',
    address: '',
    email: '',
  });

  // Query for search supplier
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
    } else {
      const res = await createData(form);
      if (res) {
        console.log('Res created category: ', res);
      }
    }

    fetchingData();
    // close form
    setIsOpen(false);
    // clear form data
    setForm({
      id: '',
      name: '',
      code: '',
      website: '',
      address: '',
      email: '',
    });
  };

  const handleExcelFile = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.onload = async (event) => {
      const stringBuffer = event.target.result;
      const workSheet = XLSX.read(stringBuffer, { type: 'binary' });
      const sheetName = workSheet.SheetNames[0];
      const sheet = workSheet.Sheets[sheetName];
      const json = XLSX.utils.sheet_to_json(sheet);

      console.log('JSON data From Sheet :', json);
      const res = await ImportData({ supplier: json });
      if (res) {
        console.log('Res :', res);
        fetchingData();
      }
    };
    reader.readAsBinaryString(file);
  };

  return (
    <div className="">
      <div className="flex justify-between">
        <div className="flex flex-row gap-2 items-center">
          <h1>Supplier</h1>
          <div className="">
            <Input
              value={query}
              placeholder="Search supplier"
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <Button
            onClick={async () => {
              setLoading(true);
              const res = await searchData(query);
              if (res) {
                console.log('Res search supplier: ', res);
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
          {/* for Save file Excel */}
          <Button
            onClick={() => {
              const ws = XLSX.utils.json_to_sheet(data); // convert data to sheet
              const wb = XLSX.utils.book_new(); // create new workbook
              XLSX.utils.book_append_sheet(wb, ws, 'Supplier List');
              const excelBuffer = XLSX.write(wb, {
                bookType: 'xlsx',
                type: 'array',
              });
              saveAs(new Blob([excelBuffer]), 'SupplierList.xlsx');
            }}
          >
            <Download />
          </Button>
          <Label className={'border-2 rounded-md px-3 py-2'}>
            <Import />
            <div className="">Import Excel</div>
            <Input
              onChange={handleExcelFile}
              type="file"
              className={'hidden'}
            />
          </Label>
        </div>

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button>
              Create <Plus />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-xl">
            <DialogHeader>{isEdit ? 'Update' : 'Save'} Supplier</DialogHeader>
            {/* <DialogDescription>For create category</DialogDescription> */}
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
                <Label>Email</Label>
                <Input
                  value={form?.email}
                  placeholder="Email"
                  onChange={(e) => {
                    setForm({ ...form, email: e.target.value });
                  }}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label>Code</Label>
                <Input
                  value={form?.code}
                  placeholder="Code"
                  onChange={(e) => {
                    setForm({ ...form, code: e.target.value });
                  }}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label>Website</Label>
                <Input
                  value={form?.website}
                  placeholder="Website"
                  onChange={(e) => {
                    setForm({ ...form, website: e.target.value });
                  }}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <Label>Address</Label>
                <Textarea
                  value={form?.address}
                  placeholder="Address"
                  onChange={(e) => {
                    setForm({ ...form, address: e.target.value });
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
                      code: '',
                      website: '',
                      address: '',
                      email: '',
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
          <TableCaption>A list of category</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>No</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>code</TableHead>
              <TableHead>Website</TableHead>
              <TableHead>Address</TableHead>
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
                      <TableCell>{item?.email}</TableCell>
                      <TableCell>{item?.code}</TableCell>
                      <TableCell>{item?.website}</TableCell>
                      <TableCell>{item?.address}</TableCell>
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
                                  Are you sure to delete this category?
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
                                      console.log('Res delete category: ', res);
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
