// hooks/useLogout.js
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import useAuthStore from '@/store/authStore';

const useLogout = () => {
  // hooks at the top level of a custom hook
  const router = useRouter();
  const clearAuth = useAuthStore((state) => state.clearAuth);

  const logout = () => {
    clearAuth();
    Cookies.remove('token');
    Cookies.remove('role');
    router.push('/login');
  };

  return { logout };
};

export default useLogout;