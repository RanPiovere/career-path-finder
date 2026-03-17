import Navbar from "@/components/Navbar";
import TestsSection from "@/components/TestsSection";
import Footer from "@/components/Footer";

const TestsPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24">
        <TestsSection />
      </main>
      <Footer />
    </div>
  );
};

export default TestsPage;

