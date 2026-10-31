import { Outlet } from "react-router-dom";

export default function AuthLoyout() {
  return (
    <div className="flex h-screen flex-col">
      <main className="grow">
        <Outlet />
      </main>
    </div>
  );
}
