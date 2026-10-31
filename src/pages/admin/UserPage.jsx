import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit, Plus, Trash, Trash2 } from "lucide-react";
import { useState } from "react";

export default function UserPage() {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({
    id: "",
    name: "",
    username: "",
    password: "",
    age: "",
    gender: "",
  });

  const [isOpen, setIsOpen] = useState(false);

  //   const users = [
  //     {
  //       name: "John",
  //       age: 30,
  //       major: "IT",
  //       gender: "Male",
  //     },
  //     {
  //       name: "Jen",
  //       age: 20,
  //       major: "Web development",
  //       gender: "Male",
  //     },
  //     {
  //       name: "Heng",
  //       age: 18,
  //       major: "Mobile development",
  //       gender: "Male",
  //     },
  //   ];

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data: ", form);
    setData([...data, { ...form, id: Date.now() }]);

    // Close form
    setIsOpen(false);
  };

  return (
    <div className="p-5">
      <div className="mb-5 flex justify-between">
        <div className="flex items-center gap-3">
          <div className="font-medium">User</div>
          <Input placeholder="Search user" />
        </div>

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger>
            <Button>
              <Plus />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create user</DialogTitle>
              <DialogDescription>For create user</DialogDescription>
            </DialogHeader>
            <form onSubmit={onSubmit} className="flex flex-col gap-3">
              <div className="flex flex-col gap-2">
                <Label>Name</Label>
                <Input
                  placeholder="name"
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label>Username</Label>
                <Input
                  placeholder="Usename"
                  onChange={(e) =>
                    setForm({ ...form, username: e.target.value })
                  }
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label>Password</Label>
                <Input
                  placeholder="Password"
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label>Gender</Label>
                <Input
                  placeholder="Gender"
                  onChange={(e) => setForm({ ...form, gender: e.target.value })}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label>Age</Label>
                <Input
                  placeholder="Age"
                  onChange={(e) => setForm({ ...form, age: e.target.value })}
                />
              </div>
              <div className="flex gap-2 justify-end">
                <Button type="buttom" variant="outline">
                  Cancel
                </Button>
                <Button type="submit">Save</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>No</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Age </TableHead>
            <TableHead>Major </TableHead>
            <TableHead>Gender </TableHead>
            <TableHead>Action </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{item?.name}</TableCell>
              <TableCell>{item?.age}</TableCell>
              <TableCell>{item?.major}</TableCell>
              <TableCell>{item?.gender}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button
                    onClick={() => {
                      alert(`Item delete: ${item?.name}`);
                    }}
                    variant="destructive"
                    className={"hover:cursor-pointer"}
                  >
                    <Trash2 />
                  </Button>
                  <Button
                    onClick={() => {
                      alert(`Item Edit: ${item?.name}`);
                    }}
                    variant="outline"
                    className={"hover:cursor-pointer"}
                  >
                    <Edit />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
