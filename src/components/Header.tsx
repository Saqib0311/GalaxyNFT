
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, User, Wallet } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import NotificationDropdown from './NotificationDropdown';

const Header = () => {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const connectWallet = async () => {
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({ 
          method: 'eth_requestAccounts' 
        });
        setWalletAddress(accounts[0]);
        setIsWalletConnected(true);
        console.log('Wallet connected:', accounts[0]);
      } else {
        alert('Please install MetaMask to connect your wallet');
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
    }
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/explore?search=${encodeURIComponent(searchTerm)}`);
    }
  };

  const isActivePage = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 backdrop-blur-xl bg-galaxy-deep/80">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div 
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => navigate('/')}
          >
            <div className="w-10 h-10 rounded-full bg-cosmic-gradient flex items-center justify-center">
              <span className="text-white font-bold text-lg">G</span>
            </div>
            <span className="text-2xl font-bold gradient-text">NFT Galaxy</span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => handleNavigation('/explore')}
              className={`transition-colors ${
                isActivePage('/explore') 
                  ? 'text-white' 
                  : 'text-white/80 hover:text-white'
              }`}
            >
              Explore
            </button>
            <button 
              onClick={() => handleNavigation('/create')}
              className={`transition-colors ${
                isActivePage('/create') 
                  ? 'text-white' 
                  : 'text-white/80 hover:text-white'
              }`}
            >
              Create
            </button>
            <button 
              onClick={() => handleNavigation('/collections')}
              className={`transition-colors ${
                isActivePage('/collections') 
                  ? 'text-white' 
                  : 'text-white/80 hover:text-white'
              }`}
            >
              Collections
            </button>
            <button 
              onClick={() => handleNavigation('/community')}
              className={`transition-colors ${
                isActivePage('/community') 
                  ? 'text-white' 
                  : 'text-white/80 hover:text-white'
              }`}
            >
              Community
            </button>
          </nav>

          {/* Search Bar */}
          <div className="hidden lg:flex items-center space-x-4 flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4" />
              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search NFTs, collections, or creators..."
                className="pl-10 bg-white/5 border-white/20 text-white placeholder:text-white/50 focus:border-galaxy-purple"
              />
            </form>
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            <NotificationDropdown />

            {isWalletConnected ? (
              <div className="flex items-center space-x-3">
                <div className="glass-card px-3 py-2 flex items-center space-x-2">
                  <Wallet className="w-4 h-4 text-galaxy-cyan" />
                  <span className="text-sm font-mono text-white">
                    {formatAddress(walletAddress)}
                  </span>
                </div>
                <Button variant="ghost" size="icon" className="text-white/80 hover:text-white">
                  <User className="w-5 h-5" />
                </Button>
              </div>
            ) : (
              <Button 
                onClick={connectWallet}
                className="bg-cosmic-gradient hover:opacity-90 text-white font-semibold px-6"
              >
                Connect Wallet
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
