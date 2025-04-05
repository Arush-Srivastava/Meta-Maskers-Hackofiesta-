import { useState } from 'react';
import { FiEdit2, FiHeart } from 'react-icons/fi';

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('collected');
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Profile Header */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
        {/* Cover Image */}
        <div className="h-48 bg-gradient-to-r from-primary to-blue-400 relative">
          <button className="absolute bottom-4 right-4 bg-white p-2 rounded-full shadow-md">
            <FiEdit2 className="text-gray-700" />
          </button>
        </div>
        
        {/* Profile Info */}
        <div className="px-6 py-4 flex flex-col md:flex-row items-start md:items-center">
          {/* Avatar */}
          <div className="relative -mt-16 mb-4 md:mb-0">
            <div className="h-24 w-24 rounded-full border-4 border-white bg-gradient-to-r from-primary to-blue-400 flex items-center justify-center">
              <span className="text-white text-2xl font-bold">MM</span>
            </div>
          </div>
          
          {/* User Info */}
          <div className="md:ml-6 flex-1">
            <h1 className="text-2xl font-bold text-gray-900">Meta Masker User</h1>
            <p className="text-gray-600">@metamasker</p>
            <p className="mt-2 text-gray-700">
              NFT enthusiast and digital art collector. Exploring the world of blockchain and digital ownership.
            </p>
          </div>
          
          {/* Stats */}
          <div className="mt-4 md:mt-0 flex space-x-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">24</p>
              <p className="text-sm text-gray-600">Items</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">142</p>
              <p className="text-sm text-gray-600">Followers</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">67</p>
              <p className="text-sm text-gray-600">Following</p>
            </div>
          </div>
        </div>
        
        {/* Tabs */}
        <div className="border-t border-gray-200 px-6">
          <div className="flex space-x-8">
            <TabButton 
              label="Collected" 
              active={activeTab === 'collected'} 
              onClick={() => setActiveTab('collected')} 
            />
            <TabButton 
              label="Created" 
              active={activeTab === 'created'} 
              onClick={() => setActiveTab('created')} 
            />
            <TabButton 
              label="Favorites" 
              active={activeTab === 'favorites'} 
              onClick={() => setActiveTab('favorites')} 
            />
          </div>
        </div>
      </div>
      
      {/* NFT Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {activeTab === 'collected' && (
          <>
            <NFTCard image="/nft1.png" likes={72} name="Colorful Character" />
            <NFTCard image="/nft2.png" likes={124} name="Cool Monkey" />
            <NFTCard image="/nft3.png" likes={53} name="Anime Character" />
          </>
        )}
        
        {activeTab === 'created' && (
          <>
            <NFTCard image="/nft3.png" likes={53} name="My Creation #1" />
          </>
        )}
        
        {activeTab === 'favorites' && (
          <>
            <NFTCard image="/nft2.png" likes={124} name="Cool Monkey" />
          </>
        )}
      </div>
    </div>
  );
};

const TabButton = ({ label, active, onClick }) => {
  return (
    <button
      className={`py-4 px-2 font-medium text-sm relative ${
        active ? 'text-primary' : 'text-gray-600 hover:text-gray-900'
      }`}
      onClick={onClick}
    >
      {label}
      {active && (
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"></div>
      )}
    </button>
  );
};

const NFTCard = ({ image, likes, name }) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg">
      <div className="relative">
        <img 
          src={image || "/placeholder.svg"} 
          alt="NFT" 
          className="w-full h-64 object-cover"
          
        />
        <div className="absolute top-3 right-3 bg-white rounded-full px-3 py-1 flex items-center shadow-md">
          <FiHeart className="text-gray-500 mr-1" />
          <span className="text-sm font-medium">{likes}</span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-medium text-gray-900">{name}</h3>
      </div>
    </div>
  );
};

export default ProfilePage;