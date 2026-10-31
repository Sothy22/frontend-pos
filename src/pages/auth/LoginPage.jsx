import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { setUser } from '../../store/userSlice';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { request } from '@/utility/helper/request';
import { setToken } from '@/store/tokenSlice';

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setform] = useState({
    email: '',
    password: '',
  });
  const [validate, setValidate] = useState({});
  const [message, setMessage] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await request('login', 'post', form);

      const loginData = res?.data ?? res;

      if (res?.error) {
        setMessage(res?.message);
        setValidate(res?.errors || {});
        return;
      }

      if (loginData?.token) {
        dispatch(setUser(loginData.user));
        dispatch(setToken(loginData.token));

        // Clear the login form
        setform({
          email: '',
          password: '',
        });
        setValidate({});
        setMessage('');

        const destination = location.state?.from;
        navigate(
          destination
            ? `${destination.pathname}${destination.search || ''}${destination.hash || ''}`
            : '/',
          { replace: true },
        );
        return;
      }

      setMessage(loginData?.message || 'Login failed. Please try again.');
    } catch (error) {
      console.error(error);
      setMessage('Unable to login. Please try again.');
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background p-4">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-[350px] bg-gray-100 rounded-xl p-4 flex flex-col gap-5"
      >
        <h1 className="font-bold text-xl text-center">Login</h1>
        <div className="grid gap-4">
          <div className="grid gap-3">
            <Label>Email</Label>
            <Input
              name="login-email"
              type="email"
              autoComplete="off"
              value={form.email}
              onChange={(e) => setform({ ...form, email: e.target.value })}
              placeholder="Email"
              required
            />
            {validate?.email && (
              <p className="text-red-500">{validate?.email[0]}</p>
            )}
            {message !== 'Incorrect password' && (
              <p className="text-red-500">{message}</p>
            )}
          </div>
          <div className="grid gap-3">
            <Label>Password</Label>
            <Input
              name="login-password"
              type="password"
              autoComplete="new-password"
              value={form.password}
              onChange={(e) => setform({ ...form, password: e.target.value })}
              placeholder="Password"
              required
            />
            {validate?.password && (
              <p className="text-red-500">{validate?.password[0]}</p>
            )}
            {message !== 'Account is not found.' && (
              <p className="text-red-500">{message}</p>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Button type="submit">Login</Button>
          <Button type="button" variant="outline">
            Cancel
          </Button>
        </div>
        <div className=" text-center">
          <span>I don't have an account </span>
          <NavLink
            to={'/auth/register'}
            className={'text-blue-600 hover:underline'}
          >
            Register
          </NavLink>
        </div>
      </form>
    </div>
  );
}
