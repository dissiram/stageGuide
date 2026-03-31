import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider, useAuth } from "@/store/AuthContext";

// Pages
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import NotFound from "./pages/NotFound";

// Layouts
import MainLayout from "./layouts/MainLayout";
import AdminLayout from "./layouts/AdminLayout";

// Stagiaire Pages
import StagiaireDashboard from "./pages/stagiaire/Dashboard";
import MentorSpace from "./pages/stagiaire/MentorSpace";
import StagiaireMessages from "./pages/stagiaire/Messages";
import Formations from "./pages/stagiaire/Formations";
import StagesSearch from "./pages/stagiaire/StagesSearch";
import Emplois from "./pages/stagiaire/Emplois";
import Portfolio from "./pages/stagiaire/Portfolio";
import Documents from "./pages/stagiaire/Documents";

// Mentor Pages
import MentorDashboard from "./pages/mentor/Dashboard";
import MenteesList from "./pages/mentor/MenteesList";
import MenteeDetail from "./pages/mentor/MenteeDetail";
import MentorMessages from "./pages/stagiaire/Messages";
import Resources from "./pages/mentor/Resources";
import Reports from "./pages/mentor/Reports";

// Admin Pages
import AdminDashboard from "./pages/admin/Dashboard";
import UsersManagement from "./pages/admin/UsersManagement";
import Partners from "./pages/admin/Partners";
import Conventions from "./pages/admin/Conventions";
import Analytics from "./pages/admin/Analytics";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children, allowedRoles }: { children: React.ReactNode; allowedRoles?: string[] }) => {
  const { isAuthenticated, user, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-8 h-8 border-3 border-[#3E7BFA] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return <Navigate to={`/${user.role === 'admin' ? 'admin' : user.role}`} replace />;
  }
  
  return <>{children}</>;
};

const App = () => (
  <ThemeProvider defaultTheme="light">
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

              {/* Stagiaire Routes */}
              <Route
                path="/stagiaire"
                element={
                  <ProtectedRoute allowedRoles={['stagiaire']}>
                    <MainLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<StagiaireDashboard />} />
                <Route path="mentor" element={<MentorSpace />} />
                <Route path="messages" element={<StagiaireMessages />} />
                <Route path="formations" element={<Formations />} />
                <Route path="stages" element={<StagesSearch />} />
                <Route path="emplois" element={<Emplois />} />
                <Route path="portfolio" element={<Portfolio />} />
                <Route path="documents" element={<Documents />} />
              </Route>

              {/* Mentor Routes */}
              <Route
                path="/mentor"
                element={
                  <ProtectedRoute allowedRoles={['mentor']}>
                    <MainLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<MentorDashboard />} />
                <Route path="mentores" element={<MenteesList />} />
                <Route path="mentores/:id" element={<MenteeDetail />} />
                <Route path="messages" element={<MentorMessages />} />
                <Route path="ressources" element={<Resources />} />
                <Route path="rapports" element={<Reports />} />
              </Route>

              {/* Admin Routes */}
              <Route
                path="/admin"
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <AdminLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<AdminDashboard />} />
                <Route path="utilisateurs" element={<UsersManagement />} />
                <Route path="partenaires" element={<Partners />} />
                <Route path="conventions" element={<Conventions />} />
                <Route path="analytics" element={<Analytics />} />
              </Route>

              {/* Catch All */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
