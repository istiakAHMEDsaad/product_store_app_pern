import { useAuth } from '@clerk/clerk-react';
import api from '../lib/axios';
import { useEffect } from 'react';
import axios from 'axios';

const useAuthReq = () => {
  const { isSignedIn, getToken, isLoaded } = useAuth();

  // include the token to the request headers
  useEffect(() => {
    const interceptor = axios.interceptors.request.use(async (config) => {
      if (isSignedIn) {
        const token = getToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }

      return config;
    });

    return () => api.interceptors.request.eject(interceptor);
  }, [isSignedIn, getToken]);
  return { isSignedIn, isClerkLoaded: isLoaded };
};

export default useAuthReq;
