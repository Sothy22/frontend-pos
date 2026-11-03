import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { request } from '@/utility/helper/request';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [form, setform] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    role: 'user',
  });
  const [validate, setValidate] = useState({});
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setValidate({});
    setMessage('');

    if (form.password !== form.password_confirmation) {
      setValidate({ password_confirmation: ['Passwords do not match.'] });
      return;
    }

    setLoading(true);

    try {
      const res = await request('register', 'post', form);
      const registerData = res?.data ?? res;

      if (res?.error || res?.errors || registerData?.errors) {
        setValidate(res?.errors || registerData?.errors || {});
        setMessage(res?.message || registerData?.message || '');
        return;
      }

      if (registerData?.success === false) {
        setMessage(registerData?.message || 'Registration failed.');
        return;
      }

      setform({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        role: 'user',
        // role: 'user',
      });
      navigate('/auth/login', { replace: true });
    } catch (error) {
      console.error(error);
      setMessage('Unable to register. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background p-4">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-[350px] bg-gray-100 rounded-xl p-4 flex flex-col gap-4"
        autoComplete="off"
      >
        <h2 className="text-xl font-bold text-center">Register</h2>

        <div className="flex flex-col gap-4">
          <div className="grid gap-2">
            <Label>Name</Label>
            <Input
              required
              name="register-name"
              autoComplete="off"
              value={form.name}
              placeholder="Name"
              type="text"
              onChange={(e) => setform({ ...form, name: e.target.value })}
            />
            {validate?.name && (
              <p className="text-red-500">{validate.name[0]}</p>
            )}
          </div>
          <div className="grid gap-2">
            <Label>Email</Label>
            <Input
              required
              name="register-email"
              type="email"
              autoComplete="off"
              value={form.email}
              placeholder="Email"
              onChange={(e) => setform({ ...form, email: e.target.value })}
            />
            {validate?.email && (
              <p className="text-red-500">{validate.email[0]}</p>
            )}
          </div>
          <div className="grid gap-2">
            <Label>Password</Label>
            <Input
              required
              name="register-password"
              value={form.password}
              placeholder="Password"
              type="password"
              autoComplete="new-password"
              onChange={(e) => setform({ ...form, password: e.target.value })}
            />
            {validate?.password && (
              <p className="text-red-500">{validate.password[0]}</p>
            )}
          </div>
          <div className="grid gap-2">
            <Label>Role</Label>
            <select
              name="role"
              value={form.role}
              onChange={(e) => setform({ ...form, role: e.target.value })}
              className="h-9 rounded-md border border-input bg-transparent px-3 text-sm"
              required
            >
              <option value="admin">Admin</option>
            </select>
            {validate?.role && (
              <p claselectssName="text-red-500">{validate.role[0]}</p>
            )}
          </div>
          <div className="grid gap-2">
            <Label>Confirm Password</Label>
            <Input
              required
              name="register-password-confirmation"
              value={form.password_confirmation}
              placeholder="Confirm Password"
              type="password"
              autoComplete="new-password"
              onChange={(e) =>
                setform({ ...form, password_confirmation: e.target.value })
              }
            />
            {validate?.password_confirmation && (
              <p className="text-red-500">
                {validate.password_confirmation[0]}
              </p>
            )}
          </div>
        </div>

        {message && <p className="text-center text-red-500">{message}</p>}

        <Button type="submit" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </Button>
        <div className="text-center">
          <span>Are you already have account ? </span>
          <NavLink to={'/auth/login'} className="text-blue-600 hover:underline">
            Login
          </NavLink>
        </div>
      </form>
    </div>
  );
}
