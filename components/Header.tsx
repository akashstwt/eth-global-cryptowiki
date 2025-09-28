"use client";

import React from 'react';
import { Wallet } from 'lucide-react';
import * as fcl from "@onflow/fcl";
import { useEffect, useState } from "react";
import Image from 'next/image';

const Header = () => {
  const [flowUser, setFlowUser] = useState<any>(null);

  useEffect(() => {
    // ✅ subscribe to Flow session
    fcl.currentUser().subscribe(setFlowUser);
  }, []);

  const connectFlow = async () => {
    await fcl.authenticate();
  };

  const disconnectFlow = async () => {
    await fcl.unauthenticate();
  };

  const handleWalletClick = () => {
    if (!flowUser?.addr) {
      connectFlow();
    } else {
      disconnectFlow();
    }
  };

  const scrollToChatInterface = () => {
    const chatSection = document.getElementById('chat-interface');
    if (chatSection) {
      chatSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-white/10">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Image
          src="/assets/logo.png"
          alt="CryptoWiki Logo"
          width={40}
          height={40}
          className='rounded-xl'
        />

        {/* Right side buttons */}
        <div className="flex items-center space-x-10">
          <button 
            onClick={scrollToChatInterface}
            className="text-white hover:text-gray-300 transition-colors"
          >
            Get Started
          </button>
          
          {/* Wallet Connect Button */}
          {!flowUser?.addr ? (
            <button 
              onClick={handleWalletClick}
              className="bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors flex items-center space-x-2"
            >
              <Wallet className="w-4 h-4" />
              <span>Connect</span>
            </button>
          ) : (
            <div className="flex items-center space-x-2">
              <span className="text-white text-sm">
                {flowUser.addr.slice(0, 6)}...{flowUser.addr.slice(-4)}
              </span>
              <button
                onClick={handleWalletClick}
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg transition-colors text-sm"
              >
                Disconnect
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;