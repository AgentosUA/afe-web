'use client';

import { useFormik } from 'formik';
import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/navigation';
import * as yup from 'yup';

import { Button } from '@/shared/ui/atoms/button';
import { Input } from '@/shared/ui/atoms/input/ui';

import styles from './ui.module.scss';

const SignUp = observer(() => {
  const router = useRouter();

  const validationSchema = yup.object({
    email: yup.string().email('Not valid email').required('Required'),
    username: yup.string().required('Required'),
    password: yup.string().required('Required'),
    rePassword: yup
      .string()
      .required('Required')
      .oneOf([yup.ref('password'), ''], 'Passwords must match'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      username: '',
      password: '',
      rePassword: '',
    },
    onSubmit: async (values) => {
      try {
        await fetch('/api/users', {
          method: 'POST',
          body: JSON.stringify({
            email: values.email,
            username: values.username,
            password: values.password,
          }),

          headers: {
            'Content-Type': 'application/json',
          },
        });

        router.push('/auth/sign-in');
      } catch (error: any) {
        formik.setErrors({
          rePassword: error?.response?.data?.message ?? 'Unknown error',
        });
      }
    },

    enableReinitialize: true,
    validateOnBlur: true,
    validationSchema,
  });

  return (
    <form className={styles.form} onSubmit={formik.handleSubmit}>
      <h2>Sign up</h2>
      <Input
        id="email"
        type="Email"
        placeholder="Email"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.email ? formik.errors.email : ''}
      />
      <Input
        id="username"
        type="text"
        placeholder="Username"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.username}
        error={formik.touched.username ? formik.errors.username : ''}
      />
      <Input
        id="password"
        type="password"
        placeholder="Password"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.password}
        error={formik.touched.password ? formik.errors.password : ''}
      />
      <Input
        id="rePassword"
        type="password"
        placeholder="Re-password"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.rePassword}
        error={formik.touched.rePassword ? formik.errors.rePassword : ''}
      />
      <Button type="submit">Sign Up</Button>
    </form>
  );
});

export default SignUp;
