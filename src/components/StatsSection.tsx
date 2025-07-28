
const StatsSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">2,500+</div>
            <div className="text-gray-600">Active Opportunities</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">15,000+</div>
            <div className="text-gray-600">Registered Teachers</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">50+</div>
            <div className="text-gray-600">Countries Served</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow mb-2">98</div>
            <div className="text-gray-600">Free Resources</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
