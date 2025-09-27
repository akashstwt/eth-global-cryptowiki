import { Button } from "@/components/ui/button";
import { ArrowRight, Search } from "lucide-react";
import heroVideo from "@/assets/hero_video.mp4";
import flow from "@/assets/Flow.png";

const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex flex-col items-center px-6 bg-background">
      <div className="container mx-auto flex flex-col">
        <div className="grid lg:grid-row gap-12 items-center">
          {/* Video Section */}
          <div>
            <div className="relative flex justify-center align-middle mt-[10%]">
              <video 
                className="w-[200px] h-[200px] object-cover" 
                autoPlay 
                muted 
                loop
                playsInline
              >
                <source src={heroVideo} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              {/* Subtle overlay for better integration with dark theme */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
          </div>
          {/* Text Content Section */}
          <div className="text-center lg:text-left  justify-items-center align-middle mt-[-20px]">
            {/* Main Heading */}
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
              <span className="bg-gradient-to-r from-foreground to-gray-600 bg-clip-text text-transparent">
                CryptoWiki
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto lg:mx-0 align-middle justify-center">
              Your comprehensive Web3 research assistant. Get instant insights about cryptocurrencies, protocols, and blockchain projects.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-row sm:flex-row items-center justify-center  gap-4 mb-12">
              <button size="lg" className=" bg-white/20 text-white flex flex-row sm:flex-row items-center justify-middle lg:justify-middle px-24 py-4 rounded-lg border border-white/20 hover:bg-white/30 transition-colors duration-300">
                <Search className="w-4 h-4 mr-2 text-white justify-middle" />
                Start Research
              </button>
              <button size="lg" className="px-8 text-white flex flex-row sm:flex-row items-center justify-center lg:justify-middle">
                Learn More
                <ArrowRight className="w-4 h-4 ml-2 text-white" />
              </button>
            </div>

            {/* Simple Features */}
            <div className="flex flex-wrap items-center justify-center lg:justify-middle gap-8 text-sm text-muted-foreground">
              <span className="opacity-50 hover:opacity-90 transition-opacity duration-500">
                <img src={flow} alt="Flow" className="w-24" />
              </span>
              <span className="opacity-50 hover:opacity-90 transition-opacity duration-500">
                <img src={flow} alt="Flow" className="w-24" />
              </span>
              <span className="opacity-50 hover:opacity-90 transition-opacity duration-500">
                <img src={flow} alt="Flow" className="w-24" />
              </span>
              <span className="opacity-50 hover:opacity-90 transition-opacity duration-500">
                <img src={flow} alt="Flow" className="w-24" />
              </span>
            </div>

          </div>
           
          
        </div>
      </div>
    </section>
  );
};

export default Hero;