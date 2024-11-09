import axios from 'axios';

type LoginDto = {
  email?: string;
  username?: string;
  password: string;
};

type LoginResponse = {
  token: string;
  refreshToken: string;
};

type SignUpDto = {
  email: string;
  username: string;
  password: string;
};

type ChangePasswordDto = { oldPassword: string; newPassword: string };

type RefreshTokenDto = {
  refreshToken: string;
};

type User = {
  id: string;

  email: string;

  username: string;

  avatar: string | null;

  language: string | null;

  role: string;

  steamId: string | null;
};

const instance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
  headers: {
    'Content-Type': 'application/json',
  },
});

const afeApi = {
  user: {
    get: async () => {
      return instance.get<User>('/profile');
    },
    changeAvatar: async (data: { avatar: string }) => {
      return instance.post('/profile/change-avatar', data);
    },
    login: async (data: LoginDto) => {
      return instance.post<LoginResponse>('/auth/sign-in', data);
    },
    signUp: async (data: SignUpDto) => {
      return instance.post<SignUpDto>('/auth/sign-up', data);
    },
    changePassword: async (data: ChangePasswordDto) => {
      return instance.post('/auth/change-password', data);
    },
    forgotPassword: async (data: { email: string }) => {
      return instance.post('/auth/forgot-password', data);
    },
    refreshToken: async () => {
      return instance.post<LoginResponse>('/auth/refresh-token');
    },
  },
};

export { afeApi, instance };

export type { User, LoginDto, LoginResponse };
