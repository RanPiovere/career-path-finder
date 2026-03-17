import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import TestPage from "./pages/TestPage";
import BlogPost from "./pages/BlogPost";
import NotFound from "./pages/NotFound";
import TestsPage from "./pages/TestsPage";
import BlogPage from "./pages/BlogPage";
import NewsPage from "./pages/NewsPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import CreateTestPage from "./pages/CreateTestPage";
import CreatePostPage from "./pages/CreatePostPage";
import CustomTestPage from "./pages/CustomTestPage";
import CustomPostPage from "./pages/CustomPostPage";
import { AuthProvider } from "./context/AuthContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/test" element={<TestsPage />} />
            <Route path="/test/create" element={<CreateTestPage />} />
            <Route path="/test/custom/:id" element={<CustomTestPage />} />
            <Route path="/test/:slug" element={<TestPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/create" element={<CreatePostPage />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/blog/custom/:id" element={<CustomPostPage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
