'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import UsersPage from './users/page';

const queryClient = new QueryClient();

const Home = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <UsersPage />
    </QueryClientProvider>
  );
};

export default Home;
