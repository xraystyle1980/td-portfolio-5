const Navigation = () => {
  return (
    <nav className="fixed top-0 w-full bg-white/70 backdrop-blur-md z-50 border-b border-gray-100">
      <div className="container mx-auto px-6 py-5">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Logo
          </div>
          <ul className="flex gap-8">
            {['Home', 'About', 'Contact'].map((item) => (
              <li key={item}>
                <a 
                  href={`#${item.toLowerCase()}`} 
                  className="relative font-medium text-gray-700 hover:text-blue-600 transition-colors duration-300
                    after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 
                    after:bottom-0 after:left-0 after:bg-blue-600 after:transition-transform 
                    after:duration-300 hover:after:scale-x-100"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
