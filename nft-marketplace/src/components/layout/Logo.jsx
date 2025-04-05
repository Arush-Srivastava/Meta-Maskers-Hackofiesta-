const Logo = () => {
    return (
      <div className="flex items-center">
        <div className="h-10 w-10 rounded-full bg-gradient-to-r from-primary to-blue-400 flex items-center justify-center">
          <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center">
            <div className="h-6 w-6 rounded-full bg-gradient-to-r from-primary to-blue-400"></div>
          </div>
        </div>
        <div className="ml-2">
          <div className="font-bold text-2xl text-gray-800">Meta</div>
          <div className="text-2xs text-gray-500 -mt-1">Maskers</div>
        </div>
      </div>
    );
  };
  
  export default Logo;