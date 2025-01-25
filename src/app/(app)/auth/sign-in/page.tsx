import { SignIn } from '@/features/auth/sign-in/ui';
import { Layout } from '@/widgets/layout/ui';


const LoginPage = async () => {
  return (
    <Layout>
      <SignIn />
    </Layout>
  );
};

export default LoginPage;
