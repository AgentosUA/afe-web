'use client';

import { useFormik } from 'formik';
import { observer } from 'mobx-react-lite';
import Link from 'next/link';
import * as yup from 'yup';

import { user } from '@/entities/user/model';
import { Button } from '@/shared/ui/atoms/button';
import { Input } from '@/shared/ui/atoms/input/ui';
import { Layout } from '@/widgets/layout/ui';

import styles from './ui.module.scss';

const LoginPage = observer(() => {
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
    onSubmit: () => {
      user.login(formik.values, (error) =>
        formik.setErrors({ password: error })
      );
    },
  });

  return (
    <Layout>
      <form className={styles.form} onSubmit={formik.handleSubmit}>
        <h2 className={styles.title}>Авторизация</h2>
        <Input
          id="email"
          label="Email or username"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email ? formik.errors.email : ''}
        />
        <Input
          id="password"
          type="password"
          label="Password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          error={formik.touched.password ? formik.errors.password : ''}
        />

        <Button type="submit">Log in</Button>
        <Link className={styles.forgotPassword} href="/auth/forgot-password">
          Forgot password?
        </Link>
      </form>
    </Layout>
  );
});

export default LoginPage;