import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const ProductCard = ({ product }) => {
    return (
        <Link to={`/product/${product._id}`}>
            <motion.div
                whileHover={{ y: -10, scale: 1.02 }}
                className="group relative bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer"
            >
                <div className="h-80 overflow-hidden relative">
                    <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Offer Badge on Image */}
                    {product.isOnOffer && (
                        <div className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-pink-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md z-10">
                            {product.offerLabel || `${product.discountPercentage}% OFF`}
                        </div>
                    )}

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                        <span className="opacity-0 group-hover:opacity-100 bg-white text-secondary px-6 py-2 rounded-full font-medium transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-lg">
                            View Details
                        </span>
                    </div>
                </div>

                <div className="p-6">
                    <h3 className="text-xl font-serif font-bold text-secondary mb-2">{product.name}</h3>
                    <p className="text-gray-500 text-sm mb-3 line-clamp-2">{product.shortDescription}</p>

                    <div className="flex items-center space-x-3 group-hover:drop-shadow-sm transition-all">
                        {product.isOnOffer ? (
                            <>
                                <span className="text-primary font-bold text-xl">${product.price}</span>
                                <span className="text-gray-400 text-sm line-through">${product.originalPrice}</span>
                            </>
                        ) : (
                            <span className="text-primary font-bold text-xl">${product.price}</span>
                        )}
                        {!product.isOnOffer && (
                            <span className="text-xs text-gray-400 uppercase tracking-widest ml-auto">Premium</span>
                        )}
                    </div>
                </div>
            </motion.div>
        </Link>
    );
};

export default ProductCard;
