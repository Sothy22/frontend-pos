import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Navbar() {
  // read data from Redux
  const counter = useSelector((state) => state.counter.value);
  const nav_item = [
    { to: "/", label: "Home" },
    { to: "/product", label: "Product" },
    { to: "/about", label: "About" },
  ];

  return (
    <nav className="flex items-center justify-between px-4 py-2 shadow-sm">
      <div className="flex flex-row items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-400 text-sm font-bold">
          POS
        </div>
        <div className="flex flex-col">
          <div className="">POS System</div>
          <div className="">Teacher</div>
        </div>
      </div>
      <h1>Counter: {counter}</h1>
      <div className="flex flex-row gap-4">
        {nav_item.map((item, index) => (
          <NavLink
            key={`${item.to}-${index}`}
            className={({ isActive }) =>
              `rounded-full px-2 py-2 no-underline transition-colors ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-black hover:bg-blue-600 hover:text-white"
              }`
            }
            to={item?.to}
          >
            {item?.label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
