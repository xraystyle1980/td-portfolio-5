const Hero = () => {
  return (
    <section className="min-h-screen relative flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/2 w-[1000px] h-[1000px] rounded-full bg-gradient-to-br from-blue-100/40 to-purple-100/40 blur-3xl" />
        <div className="absolute -bottom-1/2 -left-1/2 w-[1000px] h-[1000px] rounded-full bg-gradient-to-tr from-blue-100/40 to-purple-100/40 blur-3xl" />
      </div>
      
      <div className="container mx-auto px-6 py-32 relative">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-7xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Welcome to My Site
          </h1>
          <p className="text-xl text-gray-600 mb-12 leading-relaxed">
            A brief description of what you do or offer
          </p>
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700">
            Get Started
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
