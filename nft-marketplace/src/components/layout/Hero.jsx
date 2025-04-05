import { FiHeart } from 'react-icons/fi';

const Hero = () => {
  return (
    <div className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-orange-300 to-orange-100 z-0"></div>
      
      {/* Content */}
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="flex flex-col md:flex-row">
          {/* Left side - Text content */}
          <div className="md:w-1/2 pt-10 md:pt-20">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
              Discover and<br />
              Create your own<br />
              NFTs Digital Art.
            </h1>
            <p className="mt-6 text-gray-600 text-xl max-w-md">
              There are a thousand more NFTs that
              interest you, find and collect what you like, or make one yourself!
            </p>
            <div className="mt-8 flex space-x-4">
              {/* <button className="bg-primary text-white px-6 py-3 rounded-full flex items-center">
                <span className="mr-2">◆</span>
                Explore
              </button> */}
              <button className="bg-white text-gray-800 font-bold px-6 py-3 rounded-full flex items-center">
                <span className="mr-2">✎</span>
                Create Your Own NFT !
              </button>
            </div>
          </div>
          
          {/* Right side - Dragon image */}
          <div className="md:w-1/2 mt-10 md:mt-0 relative">
            <img 
              src="/dragon.png" 
              alt="Dragon NFT" 
              className="w-full h-auto object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://via.placeholder.com/600x500?text=Dragon+NFT";
              }}
            />
          </div>
        </div>
        
        {/* NFT Cards */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <NFTCard 
            image="/nft1.png" 
            likes={72} 
            fallbackText="Colorful Character NFT"
          />
          <NFTCard 
            image="/nft2.png" 
            likes={124} 
            fallbackText="Cool Monkey NFT"
          />
          <NFTCard 
            image="/nft3.png" 
            likes={53} 
            fallbackText="Anime Character NFT"
          />
        </div>
      </div>
    </div>
  );
};

const NFTCard = ({ image, likes, fallbackText }) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg">
      <div className="relative">
        <img 
          src={image || "/placeholder.svg"} 
          alt="NFT" 
          className="w-full h-64 object-cover"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = `https://via.placeholder.com/400x300?text=${fallbackText}`;
          }}
        />
        <div className="absolute top-3 right-3 bg-white rounded-full px-3 py-1 flex items-center shadow-md">
          <FiHeart className="text-gray-500 mr-1" />
          <span className="text-sm font-medium">{likes}</span>
        </div>
      </div>
    </div>
  );
};

export default Hero;