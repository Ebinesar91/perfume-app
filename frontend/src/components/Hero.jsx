import { motion } from 'framer-motion';
import HeroCarousel from './HeroCarousel';

const Hero = () => {
    const scrollToProducts = () => {
        document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="relative h-[80vh] w-full">
            <HeroCarousel />

            <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4">
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6 drop-shadow-lg"
                >
                    Discover Your <span className="text-primary-light">Signature Fragrance</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl drop-shadow-md"
                >
                    Explore our exclusive collection of premium perfumes, crafted to leave a lasting impression.
                </motion.p>

                <motion.button
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    onClick={scrollToProducts}
                    className="bg-primary text-white px-8 py-3 rounded-full text-lg font-medium hover:bg-[#b08d2b] transition-all transform hover:scale-105 shadow-xl"
                >
                    Explore Collection
                </motion.button>
            </div>
        </div>
    );
};

export default Hero;
