
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, User, Wallet, Bell } from 'lucide-react';

const Header = () => {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');

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

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 backdrop-blur-xl bg-galaxy-deep/80">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-full bg-cosmic-gradient flex items-center justify-center">
              <span className="text-white font-bold text-lg">G</span>
            </div>
            <span className="text-2xl font-bold gradient-text">NFT Galaxy</span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#explore" className="text-white/80 hover:text-white transition-colors">
              Explore
            </a>
            <a href="#create" className="text-white/80 hover:text-white transition-colors">
              Create
            </a>
            <a href="#collections" className="text-white/80 hover:text-white transition-colors">
              Collections
            </a>
            <a href="#community" className="text-white/80 hover:text-white transition-colors">
              Community
            </a>
          </nav>

          {/* Search Bar */}
          <div className="hidden lg:flex items-center space-x-4 flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4" />
              <Input
                placeholder="Search NFTs, collections, or creators..."
                className="pl-10 bg-white/5 border-white/20 text-white placeholder:text-white/50 focus:border-galaxy-purple"
              />
            </div>
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="text-white/80 hover:text-white">
              <Bell className="w-5 h-5" />
            </Button>

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
