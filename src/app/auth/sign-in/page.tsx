'use client';

import { useFormik } from 'formik';
import { observer } from 'mobx-react-lite';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import * as yup from 'yup';

import { store } from '@/entities/store';
import { Button } from '@/shared/ui/atoms/button';
import { Input } from '@/shared/ui/atoms/input/ui';
import { Layout } from '@/widgets/layout/ui';

import styles from './ui.module.scss';

const LoginPage = observer(() => {
  const router = useRouter();

  const validationSchema = yup.object({
    email: yup.string().required('Required'),
    password: yup.string().required('Required'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    enableReinitialize: true,
    validateOnBlur: true,
    validationSchema,
    onSubmit: async () => {
      await store.user.login(formik.values, (error) =>
        formik.setErrors({ password: error })
      );

      if (store.user.isAuthorised) {
        router.push('/profile');
      }
    },
  });

  return (
    <Layout>
      <form className={styles.form} onSubmit={formik.handleSubmit}>
        <h2 className="text-red-600 text-center text-2xl">Авторизация</h2>
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
    </Layout>
  );
});

export default LoginPage;
