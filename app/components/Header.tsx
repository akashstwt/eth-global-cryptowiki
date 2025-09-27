import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";
import logo from "@/assets/logo.png";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img src={logo} alt="CryptoWiki" className="w-8 h-8" />
            <div>
              <h1 className="text-xl font-semibold text-foreground">
                CryptoWiki
              </h1>
              <p className="text-xs text-muted-foreground">Web3 Research</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-8">
            
            <button className="text-white">
              Get Started
            </button>
            <button variant="outline" className="bg-white text-black hover:bg-gray-100 flex flex-row sm:flex-row items-center justify-start lg:justify-start px-8 py-2 rounded-md border border-white/20 hover:bg-white/30 transition-colors duration-300 hover:text-white">
              <Wallet className="w-4 h-4 mr-2" />
              Connect
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;