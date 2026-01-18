import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const images = [
    "/assets/hero-1.png",
    "/assets/hero-2.png",
    "/assets/hero-3.jpg"
];

const HeroCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="absolute inset-0 z-0 overflow-hidden">
            <AnimatePresence mode="popLayout">
                <motion.img
                    key={currentIndex}
                    src={images[currentIndex]}
                    alt="Hero Background"
                    className="absolute inset-0 w-full h-full object-cover"
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5 }}
                />
            </AnimatePresence>
            <div className="absolute inset-0 bg-black bg-opacity-40 z-10" />
        </div>
    );
};

export default HeroCarousel;
