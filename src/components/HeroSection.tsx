
import { Button } from "@/components/ui/button";
import SignupFormModal from "@/components/SignupFormModal";
import { useState } from "react";
const HeroSection = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-5xl font-bold text-gray-900 mb-6">
          Empowering Teachers,{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/80">
            Transforming Lives
          </span>
        </h2>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Teachera is the premier platform connecting teachers with opportunities and recognition. 
          Discover teaching positions, awards, fellowships, research opportunities and professional 
          development resources tailored to teachers worldwide.

        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-primary hover:bg-primary/50">
            <a href="#opportunities" className="text-white-700 hover:text-primary transition-colors">Explore Opportunities</a>
          </Button>
          <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">
            <a href="#community" className="text-gray-700 hover:text-primary transition-colors" onClick={() => setModalOpen(true)}>Join Our Community</a>
          </Button>
        </div>
      </div>

      {/* Signup Modal */}
      {isModalOpen && <SignupFormModal onClose={() => setModalOpen(false)} />}
    </section>
  );
};

export default HeroSection;
