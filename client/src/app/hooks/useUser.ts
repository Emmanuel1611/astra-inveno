import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';

export interface UserData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  avatar: string | null;
  lastLoginAt: string;
  organization: {
    id: string;
    name: string;
    logo: string | null;
    slug: string;
  };
}

export function useUser() {
  const { data, isLoading, error } = useQuery<UserData>({
    queryKey: ["user-data"],
    queryFn: async () => {
      const response = await api.get("/auth/me");
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
    retry: false,
  });

  return {
    userData: data,  
    isLoading,
    error,
  };
}
