import { SignIn } from '@/features/auth/sign-in/ui';
import { Main } from '@/widgets/layout/main/ui';

const LoginPage = async () => {
  return (
    <Main>
      <SignIn />
    </Main>
  );
};

export default LoginPage;
