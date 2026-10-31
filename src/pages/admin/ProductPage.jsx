import { useEffect, useState } from 'react';
import {
  createData,
  deleteData,
  getBrand,
  getCategory,
  getData,
  updateData,
} from '@/func/product';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Edit, Image, Plus, Search, SearchSlash, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Spinner } from '@/components/ui/spinner';
import { configs } from '@/utility/config/configs';

export default function ProductPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [brand, setBrand] = useState([]);
  const [category, setCategory] = useState([]);
  const [form, setForm] = useState({
    id: '',
    name: '',
    description: '',
    price: 0,
    qty: 1,
    discount: 0,
    status: true,
    category_id: '',
    brand_id: '',
    image: null,
  });
  const [isOpen, setIsOpen] = useState(false);

  const [query, setQuery] = useState('');
  const [isEdit, setIsEdit] = useState(false);

  const fetchingData = async () => {
    setLoading(true);
    const resBrand = await getBrand();
    setBrand(resBrand?.data);
    const resCategory = await getCategory();
    setCategory(resCategory?.data);
    const res = await getData();
    if (res) {
      console.log('Res product: ', res);
      setData(res?.data);
      setLoading(false);
    }
    console.log('Data State: ', data);
  };

  useEffect(() => {
    fetchingData();
  }, []);

  const htbl = [
    'No',
    'Name',
    'Description',
    'Price',
    'Quantity',
    'Discount',
    'Category',
    'Brand',
    'Image',
    'Action',
  ];

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log('Form data: ', form);

    // form data for upload image
    const formData = new FormData();
    formData.append('name', form?.name);
    formData.append('description', form?.description);
    formData.append('price', form?.price);
    formData.append('qty', form?.qty);
    formData.append('discount', form?.discount);
    formData.append('status', form?.status ? '1' : '0');
    formData.append('brand_id', form?.brand_id);
    formData.append('category_id', form?.category_id);

    if (form?.image instanceof File) {
      formData.append('image', form?.image);
    }

    if (isEdit) {
      // Update product
      formData.append('_method', 'put');
      const res = updateData(form.id, formData);
      if (res) {
        // Reset isEdit
        setIsEdit(false);
        fetchingData();
      }
    } else {
      // Create Product
      const res = await createData(formData);
      if (res) {
        fetchingData();
      }
    }

    // Close dialog form
    setIsOpen(false);
    // Reset form
    setForm({
      name: '',
      description: '',
      price: 0,
      qty: 1,
      discount: 0,
      status: true,
      category_id: '',
      brand_id: '',
      image: null,
    });
  };

  return (
    <div className="">
      <div className="flex justify-between">
        <div className="flex flex-row gap-2 items-center">
          <h1>Product </h1>
          <div className="">
            <Input
              value={query}
              placeholder="Search category"
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <Button
            onClick={async () => {
              //
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
          <DialogTrigger>
            <Button>
              Create <Plus />
            </Button>
          </DialogTrigger>
          <DialogContent className={'sm:max-w-md'}>
            <DialogHeader>Create Product</DialogHeader>
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
              <div className="flex gap-2">
                <div className="flex flex-col gap-1.5">
                  <Label>Price</Label>
                  <Input
                    type={'number'}
                    min={0}
                    value={form?.price}
                    placeholder="Price"
                    onChange={(e) => {
                      setForm({ ...form, price: e.target.value });
                    }}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label>Discount</Label>
                  <Input
                    type={'number'}
                    min={0}
                    value={form?.discount}
                    placeholder="Discount"
                    onChange={(e) => {
                      setForm({ ...form, discount: e.target.value });
                    }}
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <div className="flex flex-col gap-1.5 w-full">
                  <Label>Quantity</Label>
                  <Input
                    type={'number'}
                    min={0}
                    value={form?.qty}
                    placeholder="Quantity"
                    onChange={(e) => {
                      setForm({ ...form, qty: e.target.value });
                    }}
                  />
                </div>
                <div className="flex flex-col gap-1.5 w-full">
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
              </div>

              <div className="flex gap-2">
                <div className="flex flex-col gap-1.5 w-full">
                  <Label>Brand</Label>
                  <Select
                    value={form?.brand_id}
                    onValueChange={(value) => {
                      setForm({ ...form, brand_id: value });
                    }}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select brand" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {Array.isArray(brand) &&
                          brand.map((item, index) => (
                            <SelectItem index={index} value={item?.id}>
                              {item?.name}
                            </SelectItem>
                          ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col gap-1.5 w-full">
                  <Label>Category</Label>
                  <Select
                    value={form?.category_id}
                    onValueChange={(value) => {
                      setForm({ ...form, category_id: value });
                    }}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {Array.isArray(category) &&
                          category.map((item, index) => (
                            <SelectItem index={index} value={item?.id}>
                              {item?.name}
                            </SelectItem>
                          ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
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
              <div className="flex flex-col gap-1.5 w-full">
                <Label>Image</Label>
                <Input
                  type={'file'}
                  placeholder="Upload image"
                  onChange={(e) => {
                    setForm({ ...form, image: e.target.files[0] });
                  }}
                />
              </div>
              {/* Preview? */}
              {form?.image && (
                <div className="w-20 h-20">
                  <img
                    className="w-full h-full rounded-md bg-gray-300"
                    src={URL.createObjectURL(form?.image)}
                    alt="pic product"
                  />
                </div>
              )}
              <DialogFooter className={''}>
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => {
                    // Close dialog form
                    setIsOpen(false);
                    // Reset form
                    setForm({
                      name: '',
                      description: '',
                      price: 0,
                      qty: 1,
                      discount: 0,
                      status: true,
                      category_id: '',
                      brand_id: '',
                    });

                    //Reset isEdit
                    setIsEdit(false);
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit">Save</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Table className="border-separate border-spacing-y-1 [&_tbody_tr>td]:border-b [&_tbody_tr>td]:border-border/60 [&_tbody_tr>td]:py-3">
        <TableCaption>A list of your product.</TableCaption>
        <TableHeader>
          <TableRow>
            {htbl.map((head, index) => (
              <TableHead key={index}>{head}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow className="">
              <TableCell colspan={10}>
                <div className="flex justify-center mt-5">
                  <Spinner className={'size-5'} />
                </div>
              </TableCell>
            </TableRow>
          ) : (
            <>
              {Array.isArray(data) &&
                data.map((item, index) => (
                  <TableRow
                    index={index}
                    className="border-separate border-spacing-y-2"
                  >
                    <TableCell className="=">{index + 1}</TableCell>
                    <TableCell className="font-medium">{item?.name}</TableCell>
                    <TableCell className="font-medium">
                      {item?.description}
                    </TableCell>
                    <TableCell className="font-medium">
                      ${item?.price}
                    </TableCell>
                    <TableCell className="font-medium">{item?.qty}</TableCell>
                    <TableCell className="font-medium">
                      <Badge variant="destructive">{item?.discount}%</Badge>
                    </TableCell>
                    <TableCell className="font-medium">
                      {item?.category?.name
                        ? item?.category?.name
                        : 'No category'}
                    </TableCell>
                    <TableCell className="font-medium">
                      {item?.brand?.name ? item?.brand?.name : 'No brand'}
                    </TableCell>
                    <TableCell>
                      <div className="flex size-14 items-center justify-center overflow-hidden rounded-md border border-border bg-muted/50">
                        {item?.image ? (
                          <img
                            className="size-full object-cover"
                            src={configs.image_url + item?.image}
                            alt={item?.name ?? 'Product'}
                          />
                        ) : (
                          <div className="flex flex-col items-center gap-1 text-muted-foreground">
                            <Image className="size-5" />
                            <span className="text-[10px]">No image</span>
                          </div>
                        )}
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          size="icon"
                          className="size-8"
                          aria-label={`Edit ${item?.name}`}
                          onClick={() => {
                            console.log('Item edit: ', item);

                            // Set into form
                            setForm(item);
                            setIsEdit(true);
                            // Open dialog form
                            setIsOpen(true);
                          }}
                        >
                          <Edit />
                        </Button>

                        <AlertDialog>
                          <AlertDialogTrigger>
                            <Button
                              variant="destructive"
                              size="icon"
                              className="size-8"
                              aria-label={`Delete ${item?.name}`}
                            >
                              <Trash />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Are you sure to delete this product?
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
                                  console.log('item delete: ', item);

                                  const res = await deleteData(item?.id);
                                  if (res) {
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
  );
}
