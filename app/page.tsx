'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import UsersPage from './users/page';

const Home = () => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <UsersPage />
    </QueryClientProvider>
  );
};

export default Home;
