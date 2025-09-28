"use client";
import { motion } from "motion/react";
import { HeroHighlight } from "./footer-highlight";
import Link from 'next/link';

export function Footer() {
  return (
    <HeroHighlight>
      <div className="relative z-10 container mx-auto px-6 py-10">
        {/* Top Section with Content */}
        <div className="mb-32">
          {/* Header Text */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: [20, -5, 0] }}
            transition={{ duration: 0.5, ease: [0.4, 0.0, 0.2, 1] }}
            className="mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight">
              <span className="block">8 Cities,</span>
              <span className="block">4 Studios,</span>
              <span className="block">1 NYC HQ.</span>
            </h2>
          </motion.div>

          {/* Links Grid */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16"
          >
            {/* Follow Us */}
            <div>
              <h3 className="text-white font-medium mb-4 uppercase tracking-wider text-sm">
                Follow Us
              </h3>
              <div className="space-y-2">
                <Link href="#" className="block text-gray-400 hover:text-white transition-colors underline">
                  LinkedIn
                </Link>
                <Link href="#" className="block text-gray-400 hover:text-white transition-colors underline">
                  Instagram
                </Link>
                <Link href="#" className="block text-gray-400 hover:text-white transition-colors underline">
                  Substack
                </Link>
              </div>
            </div>

            {/* Explore */}
            <div>
              <h3 className="text-white font-medium mb-4 uppercase tracking-wider text-sm">
                Explore a New Project
              </h3>
              <Link href="#" className="block text-gray-400 hover:text-white transition-colors underline mb-6">
                partnerships@cryptowiki.inc
              </Link>
              
              <h3 className="text-white font-medium mb-4 uppercase tracking-wider text-sm mt-8">
                Want to Work with Us?
              </h3>
              <Link href="#" className="block text-gray-400 hover:text-white transition-colors underline">
                Explore Careers
              </Link>
            </div>

            {/* Newsletter & Legal */}
            <div>
              <h3 className="text-white font-medium mb-4 uppercase tracking-wider text-sm">
                Get Insights that Matter
              </h3>
              <Link href="#" className="block text-gray-400 hover:text-white transition-colors underline mb-6">
                Subscribe to our newsletter
              </Link>
              
              <h3 className="text-white font-medium mb-4 uppercase tracking-wider text-sm mt-8">
                Legal
              </h3>
              <Link href="#" className="block text-gray-400 hover:text-white transition-colors underline">
                Privacy Policy
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Bottom Section - Large Branding */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="relative"
        >
          <h1 className="text-[8rem] md:text-[12rem] lg:text-[16rem] xl:text-[295px] font-bold text-white leading-none tracking-tight">
            CryptoWiki
          </h1>
        </motion.div>

        {/* Footer Bottom */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-8 pt-8 border-t border-gray-800"
        >
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400 space-y-4 md:space-y-0">
            <div className="flex flex-wrap items-center gap-4">
              <span>© 2025 CryptoWiki</span>
              <span>•</span>
              <span>Web3 Research</span>
              <span>•</span>
              <span>Blockchain Intelligence</span>
              <span>•</span>
              <span>Strategy</span>
            </div>
            <div className="text-gray-500">
              <span>Built for the future of Web3</span>
            </div>
          </div>
        </motion.div>
      </div>
    </HeroHighlight>
  );
}
