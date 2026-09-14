import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isOffScreen, setIsOffScreen] = useState(true);

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia("(hover: none)").matches) return;
    
    setIsVisible(true);

    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (isOffScreen) setIsOffScreen(false);
    };

    const handleMouseOver = (e) => {
      const isClickable = 
        e.target.tagName.toLowerCase() === 'a' ||
        e.target.tagName.toLowerCase() === 'button' ||
        e.target.closest('a') ||
        e.target.closest('button') ||
        e.target.classList.contains('cursor-pointer');
        
      setIsHovering(!!isClickable);
    };

    const handleMouseLeave = () => setIsOffScreen(true);
    const handleMouseEnter = () => setIsOffScreen(false);

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Hide native cursor on body
    document.body.style.cursor = 'none';
    
    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.body.style.cursor = 'auto';
    };
  }, [isOffScreen]);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      {!isOffScreen && (
        <>
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              x: mousePosition.x - 4,
              y: mousePosition.y - 4,
              scale: isHovering ? 0 : 1,
              opacity: isHovering ? 0 : 1
            }}
            exit={{ opacity: 0, scale: 0 }}
            className="fixed top-0 left-0 w-2 h-2 bg-cyan-400 rounded-full pointer-events-none z-[9999]"
            transition={{ type: "tween", ease: "backOut", duration: 0.1 }}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              x: mousePosition.x - 20,
              y: mousePosition.y - 20,
              scale: isHovering ? 1.5 : 1,
              opacity: 1,
              backgroundColor: isHovering ? "rgba(34, 211, 238, 0.1)" : "rgba(34, 211, 238, 0)"
            }}
            exit={{ opacity: 0, scale: 0 }}
            className="fixed top-0 left-0 w-10 h-10 border border-cyan-400 rounded-full pointer-events-none z-[9998] shadow-[0_0_15px_rgba(34,211,238,0.4)] backdrop-blur-[1px]"
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.5 }}
          />
        </>
      )}
    </AnimatePresence>
  );
};
