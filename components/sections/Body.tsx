const Body = () => {
  return (
    <section className="py-32 bg-white relative">
      <div className="container mx-auto px-6">
        <h2 className="text-5xl font-bold mb-20 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Main Content
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[1, 2, 3].map((item) => (
            <div 
              key={item} 
              className="group p-8 rounded-2xl bg-white border border-gray-100 shadow-lg shadow-gray-100/50
                transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              {/* Decorative gradient circle */}
              <div className="w-12 h-12 mb-8 rounded-full bg-gradient-to-br from-blue-600 to-purple-600" />
              
              <h3 className="text-2xl font-semibold mb-4 group-hover:text-blue-600 transition-colors">
                Section {item}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Body;
