
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-5xl font-bold text-gray-900 mb-6">
          Empowering Educators,{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/80">
            Transforming Lives
          </span>
        </h2>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          TeachEra is the premier platform connecting educators with opportunities, resources, and recognition. 
          Discover teaching positions, fellowships, research opportunities, and professional development resources 
          tailored for educators worldwide.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-primary hover:bg-primary/90">
            Explore Opportunities
          </Button>
          <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">
            Join Our Community
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
