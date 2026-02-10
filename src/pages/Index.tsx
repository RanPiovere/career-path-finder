import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import TestsSection from "@/components/TestsSection";
import BlogSection from "@/components/BlogSection";
import NewsSection from "@/components/NewsSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <TestsSection />
        <BlogSection />
        <NewsSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
