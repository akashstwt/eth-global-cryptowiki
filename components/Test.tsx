"use client"

import { motion, useScroll } from "framer-motion";
import { useEffect, useRef } from 'react';
import styles from './ScrollFillText.module.css';
import logo from '../public/assets/metal_cursor.png';
import Image from "next/image";

const ScrollFillText = () => {
  const textRef = useRef<HTMLDivElement>(null);
  const charsRef = useRef<HTMLSpanElement[]>([]);
  
  const { scrollYProgress } = useScroll({
    target: textRef,
    offset: ["start 80%", "center 20%"], // More condensed scroll range
  });

  useEffect(() => {
    // Split text into individual character spans
    const splitToChars = () => {
      if (!textRef.current) return;
      
      const text = "Welcome to CryptoWiki — Where Knowledge Meets the Blockchain";
      const container = textRef.current;
      container.innerHTML = '';
      
      const chars: HTMLSpanElement[] = [];
      
      for (let i = 0; i < text.length; i++) {
        const ch = text[i];
        if (ch === ' ') {
          container.appendChild(document.createTextNode(' '));
          continue;
        }
        const span = document.createElement('span');
        span.className = 'char';
        span.textContent = ch;
        container.appendChild(span);
        chars.push(span);
      }

      // Add the icon
      const icon = document.createElement('span');
      icon.className = 'icon';
      icon.textContent = '⚡';
      container.appendChild(icon);
      chars.push(icon);

      charsRef.current = chars;
    };

    const updateScrollProgress = () => {
      if (!textRef.current || charsRef.current.length === 0) return;
      
      const progress = scrollYProgress.get();
      const filledChars = Math.floor(progress * charsRef.current.length);

      charsRef.current.forEach((c, i) => {
        if (i < filledChars) {
          c.style.color = '#ffffff';
          if (c.classList.contains('icon')) {
            c.style.transform = 'scale(1.25)';
          }
        } else {
          c.style.color = 'rgba(255, 255, 255, 0.15)';
          if (c.classList.contains('icon')) {
            c.style.transform = 'scale(1)';
          }
        }
      });
    };

    splitToChars();
    
    // Subscribe to scroll progress changes
    const unsubscribe = scrollYProgress.onChange(updateScrollProgress);
    
    return () => {
      unsubscribe();
    };
  }, [scrollYProgress]);

  return (
    <div className={`${styles.wrapper} bg-amber-300`} >
      <div className={styles.spacer }></div>
      
      <motion.div 
        ref={textRef}
        className={styles.revealParagraph}
        
      >
        <p className="bg-gradient-to-r from-foreground to-gray-600 bg-clip-text text-transparent">
          Welcome to CryptoWiki,<br /> Where Knowledge Meets the <br /> Blockchain
        </p>
        <Image src={logo} width={50} height={50} alt="image" />
      </motion.div>

      <div className={styles.spacer}></div>
    </div>
  );
};

export default ScrollFillText;