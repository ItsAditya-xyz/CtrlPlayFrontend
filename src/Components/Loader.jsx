const Loader = () => {
    return (
      <div className="flex flex-col items-center justify-center  ">
        <div className="relative">
          {/* Cards Stack Animation */}
          <div className="flex items-center justify-center">
            {[0, 1, 2, 3].map((index) => (
              <div
                key={index}
                className="absolute w-16 h-24 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg shadow-lg transform transition-all duration-1000 ease-in-out animate-pulse"
                style={{
                  animation: `cardFloat${index} 2s infinite`,
                  animationDelay: `${index * 0.2}s`,
                  transform: `translateY(${index * 2}px) rotate(${index * 5}deg)`,
                }}
              >
                {/* Card Inner Design */}
                <div className="absolute inset-0.5 bg-gray-800 rounded-lg flex items-center justify-center">
                  <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full animate-spin" />
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Loading Text */}
        <div className="mt-24 text-white text-xl font-bold">
          <span className="inline-flex items-center">
            Loading
            <div className="inline-flex items-center ml-2">
            <span className="animate-bounce ml">.</span>
            <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>.</span>
            <span className="animate-bounce" style={{ animationDelay: '0.4s' }}>.</span>
            </div>
          </span>
        </div>
  
        <style jsx>{`
          @keyframes cardFloat0 { 
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-10px) rotate(2deg); }
          }
          @keyframes cardFloat1 { 
            0%, 100% { transform: translateY(2px) rotate(5deg); }
            50% { transform: translateY(-8px) rotate(7deg); }
          }
          @keyframes cardFloat2 { 
            0%, 100% { transform: translateY(4px) rotate(10deg); }
            50% { transform: translateY(-6px) rotate(12deg); }
          }
          @keyframes cardFloat3 { 
            0%, 100% { transform: translateY(6px) rotate(15deg); }
            50% { transform: translateY(-4px) rotate(17deg); }
          }
        `}</style>
      </div>
    );
  };
  
  export default Loader;