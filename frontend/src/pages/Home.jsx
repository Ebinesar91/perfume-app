import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const location = useLocation();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/products');
                setProducts(res.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching products:', error);
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    useEffect(() => {
        if (location.state && location.state.scrollTo) {
            const element = document.getElementById(location.state.scrollTo);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
                window.history.replaceState({}, document.title);
            }
        }
    }, [location]);

    return (
        <div>
            <Hero />

            <section id="products-section" className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-serif font-bold text-secondary mb-4">Our Exclusive Collection</h2>
                        <div className="w-24 h-1 bg-primary mx-auto"></div>
                        <p className="mt-4 text-gray-500 max-w-2xl mx-auto">Handpicked fragrances that define elegance and sophistication.</p>
                    </div>

                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {products.map((product) => (
                                <ProductCard key={product._id} product={product} />
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Featured Section */}
            <section id="offers-section" className="py-20 bg-secondary text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-4xl font-serif font-bold mb-8">The Art of Perfumery</h2>
                    <p className="max-w-3xl mx-auto text-lg text-gray-300 mb-12">
                        We believe that perfume is an art form. Each bottle contains a story, a memory, and a dream waiting to be unfolded.
                    </p>
                    <button className="border-2 border-primary text-primary px-8 py-3 rounded-full hover:bg-primary hover:text-white transition-all duration-300">
                        Read Our Story
                    </button>
                </div>
            </section>
        </div>
    );
};

export default Home;
