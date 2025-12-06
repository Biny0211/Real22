import { MemberProvider } from '@/integrations';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { ScrollToTop } from '@/lib/scroll-to-top';
import { MemberProtectedRoute } from '@/components/ui/member-protected-route';
import ErrorPage from '@/integrations/errorHandlers/ErrorPage';
import Layout from '@/components/Layout';
import HomePage from '@/components/pages/HomePage';
import FeaturesPage from '@/components/pages/FeaturesPage';
import BoardPage from '@/components/pages/BoardPage';
import PricingPage from '@/components/pages/PricingPage';
import LoginPage from '@/components/pages/LoginPage';
import AccountPage from '@/components/pages/AccountPage';
import DashboardPage from '@/components/pages/DashboardPage';
import FilesPage from '@/components/pages/FilesPage';
import StoragesPage from '@/components/pages/StoragesPage';
import DevicesPage from '@/components/pages/DevicesPage';
import { DEV_MODE_ENABLED, MOCK_MEMBER } from '@/lib/dev-mode';
import { useEffect } from 'react';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />, // MIXED ROUTE: Shows different content for authenticated vs anonymous users
      },
      {
        path: "features",
        element: <FeaturesPage />,
      },
      {
        path: "board",
        element: (
          <MemberProtectedRoute messageToSignIn="Sign in to access the board">
            <BoardPage />
          </MemberProtectedRoute>
        ),
      },
      {
        path: "pricing",
        element: <PricingPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "account",
        element: (
          <MemberProtectedRoute messageToSignIn="Sign in to access your account dashboard">
            <AccountPage />
          </MemberProtectedRoute>
        ),
      },
      {
        path: "dashboard",
        element: (
          <MemberProtectedRoute messageToSignIn="Sign in to access your dashboard">
            <DashboardPage />
          </MemberProtectedRoute>
        ),
      },
      {
        path: "files",
        element: (
          <MemberProtectedRoute messageToSignIn="Sign in to access your files">
            <FilesPage />
          </MemberProtectedRoute>
        ),
      },
      {
        path: "storages",
        element: (
          <MemberProtectedRoute messageToSignIn="Sign in to access your storages">
            <StoragesPage />
          </MemberProtectedRoute>
        ),
      },
      {
        path: "devices",
        element: (
          <MemberProtectedRoute messageToSignIn="Sign in to access your devices">
            <DevicesPage />
          </MemberProtectedRoute>
        ),
      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
], {
  basename: import.meta.env.BASE_NAME,
});

export default function AppRouter() {
  // Initialize dev mode on mount
  useEffect(() => {
    if (DEV_MODE_ENABLED && MOCK_MEMBER) {
      const MEMBER_STORAGE_KEY = 'member-store';
      try {
        localStorage.setItem(MEMBER_STORAGE_KEY, JSON.stringify(MOCK_MEMBER));
      } catch (error) {
        console.error('Failed to store mock member:', error);
      }
    }
  }, []);

  return (
    <MemberProvider>
      <RouterProvider router={router} />
    </MemberProvider>
  );
}
