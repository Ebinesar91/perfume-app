import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FiMenu, FiX, FiShoppingBag } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const { cartCount, setIsCartOpen } = useCart();

    const handleNavigation = (sectionId) => {
        setIsOpen(false);
        if (location.pathname !== '/') {
            navigate('/', { state: { scrollTo: sectionId } });
        } else {
            const element = document.getElementById(sectionId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    return (
        <nav className="bg-white shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    <Link to="/" className="text-3xl font-serif font-bold text-secondary tracking-wide" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                        Perfume<span className="text-primary">Shop</span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-8 items-center">
                        <Link to="/" className="text-gray-600 hover:text-primary transition-colors" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Home</Link>
                        <button onClick={() => handleNavigation('products-section')} className="text-gray-600 hover:text-primary transition-colors bg-transparent border-none cursor-pointer">Products</button>
                        <button onClick={() => handleNavigation('contact-section')} className="text-gray-600 hover:text-primary transition-colors bg-transparent border-none cursor-pointer">Contact</button>
                        <button
                            onClick={() => setIsCartOpen(true)}
                            className="text-gray-600 hover:text-primary transition-colors bg-transparent border-none cursor-pointer relative"
                        >
                            <FiShoppingBag size={24} />
                            {cartCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-primary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                    {cartCount}
                                </span>
                            )}
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600 focus:outline-none">
                            {isOpen ? <FiX size={28} /> : <FiMenu size={28} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white border-t"
                    >
                        <div className="px-4 pt-2 pb-6 space-y-2 flex flex-col">
                            <Link to="/" className="block py-2 text-gray-600 hover:text-primary" onClick={() => { setIsOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Home</Link>
                            <button onClick={() => handleNavigation('products-section')} className="block py-2 text-left text-gray-600 hover:text-primary">Products</button>
                            <button onClick={() => handleNavigation('contact-section')} className="block py-2 text-left text-gray-600 hover:text-primary">Contact</button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
