import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import UserProvider from './context/user/userContextProvider.tsx';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
   
    <QueryClientProvider client={queryClient}> 
    <ToastContainer           
          toastClassName="bg-white shadow-lg rounded-lg p-4"
          className="text-sm text-gray-800"
          style={{ width: 'auto', minWidth: '25rem' }} />
           <UserProvider>
    <App />
    </UserProvider>
    </QueryClientProvider>
   
  </StrictMode>,
)
