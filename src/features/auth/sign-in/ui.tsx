'use client';

import classNames from 'classnames';
import { useFormik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FC } from 'react';
import * as yup from 'yup';

import { Button } from '@/shared/ui/atoms/button';
import { Input } from '@/shared/ui/atoms/input/ui';

type SignInProps = {
  className?: string;
};

const SignIn: FC<SignInProps> = ({ className }) => {
  const validationSchema = yup.object({
    email: yup.string().required('Required'),
    password: yup.string().required('Required'),
  });

  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    enableReinitialize: true,
    validateOnBlur: true,
    validationSchema,
    onSubmit: async (payload) => {
      try {
        const res = await fetch('http://localhost:3000/api/users/login', {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: payload.email,
            password: payload.password,
          }),
        });
        const data = await res.json();

        console.log(data);

        // if (data.user) {
        //   router.push('/profile');
        // }
      } catch (error) {
        formik.setErrors({ password: 'Invalid login or password' });
      }
    },
  });

  return (
    <form
      className={classNames(
        'mt-36 mx-auto flex flex-col gap-6 max-w-96 w-full bg-black/65 p-4',
        className,
      )}
      onSubmit={formik.handleSubmit}
    >
      <h2 className="text-red-600 text-center font-bold text-2xl">
        Авторизация
      </h2>
      <Input
        id="email"
        placeholder="Почта или никнейм"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.email ? formik.errors.email : ''}
      />
      <Input
        id="password"
        type="password"
        placeholder="Пароль"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.password}
        error={formik.touched.password ? formik.errors.password : ''}
      />

      <Button type="submit">Авторизироваться</Button>
      <Link
        className="hover:underline hover:text-red-800 text-sm text-right"
        href="/auth/forgot-password"
      >
        Не помню пароль
      </Link>
    </form>
  );
};

export { SignIn };
