import { FaInstagram, FaFacebook, FaTwitter } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer id="contact-section" className="bg-secondary text-white pt-12 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <h3 className="text-2xl font-serif font-bold mb-4">Perfume<span className="text-primary">Shop</span></h3>
                        <p className="text-gray-400">
                            Discover your signature scent with our curated collection of premium fragrances from around the world.
                        </p>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Delivery Information</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Terms & Conditions</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-primary transition-colors text-xl"><FaInstagram /></a>
                            <a href="#" className="text-gray-400 hover:text-primary transition-colors text-xl"><FaFacebook /></a>
                            <a href="#" className="text-gray-400 hover:text-primary transition-colors text-xl"><FaTwitter /></a>
                        </div>
                    </div>
                </div>
                <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500">
                    <p>&copy; {new Date().getFullYear()} PerfumeShop. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
