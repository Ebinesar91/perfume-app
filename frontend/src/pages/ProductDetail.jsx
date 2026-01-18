import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FaStar, FaWhatsapp, FaFacebook, FaTwitter, FaMinus, FaPlus } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState('');
    const [selectedSize, setSelectedSize] = useState('');
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useCart();

    const handleAddToCart = () => {
        addToCart(product, selectedSize, quantity);
        alert('Product added to cart!');
    };

    // Review Form State
    const [newReview, setNewReview] = useState({ username: '', rating: 5, comment: '' });
    const [submittingReview, setSubmittingReview] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const productRes = await axios.get(`http://localhost:5000/api/products/${id}`);
                setProduct(productRes.data);
                setSelectedImage(productRes.data.images[0]);
                if (productRes.data.sizes.length > 0) setSelectedSize(productRes.data.sizes[0]);

                const reviewsRes = await axios.get(`http://localhost:5000/api/reviews/${id}`);
                setReviews(reviewsRes.data);

                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        setSubmittingReview(true);
        try {
            const res = await axios.post('http://localhost:5000/api/reviews', {
                productId: id,
                ...newReview
            });
            setReviews([res.data, ...reviews]);
            setNewReview({ username: '', rating: 5, comment: '' });
        } catch (error) {
            console.error('Error submitting review:', error);
        }
        setSubmittingReview(false);
    };

    const shareUrl = window.location.href;

    if (loading) return <div className="h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-16 w-16 border-t-2 border-primary"></div></div>;
    if (!product) return <div className="text-center py-20">Product not found</div>;

    return (
        <div className="bg-white">
            {/* Product Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                    {/* Image Gallery */}
                    <div className="space-y-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-100"
                        >
                            <img src={selectedImage} alt={product.name} className="w-full h-[500px] object-cover object-center" />
                        </motion.div>
                        <div className="flex space-x-4 overflow-x-auto pb-2">
                            {product.images.map((img, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSelectedImage(img)}
                                    className={`relative h-24 w-24 flex-shrink-0 cursor-pointer rounded-md overflow-hidden border-2 transition-all ${selectedImage === img ? 'border-primary ring-2 ring-primary ring-opacity-50' : 'border-transparent hover:border-gray-200'}`}
                                >
                                    <img src={img} alt="Thumbnail" className="h-full w-full object-cover" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Product Info */}
                    <div>
                        <div className="flex items-center space-x-4 mb-2">
                            <h1 className="text-3xl md:text-4xl font-serif font-bold text-secondary">{product.name}</h1>
                            {product.isOnOffer && (
                                <span className="bg-gradient-to-r from-red-500 to-pink-600 text-white text-sm font-bold px-3 py-1 rounded-full shadow-md">
                                    {product.offerLabel || `${product.discountPercentage}% OFF`}
                                </span>
                            )}
                        </div>

                        <div className="flex items-end space-x-3 mb-2">
                            <p className="text-3xl text-primary font-bold">${product.price}</p>
                            {product.isOnOffer && (
                                <p className="text-xl text-gray-400 line-through mb-1">${product.originalPrice}</p>
                            )}
                        </div>

                        {product.isOnOffer && (
                            <p className="text-green-600 font-medium text-sm mb-6">
                                You save ${(product.originalPrice - product.price).toFixed(2)} ({product.discountPercentage}%)
                            </p>
                        )}
                        {!product.isOnOffer && <div className="mb-6"></div>}

                        <p className="text-gray-600 mb-8 leading-relaxed">{product.description}</p>

                        {/* Sizes */}
                        <div className="mb-8">
                            <h3 className="text-sm font-medium text-gray-900 mb-4">Select Size</h3>
                            <div className="flex space-x-3">
                                {product.sizes.map((size) => (
                                    <button
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        className={`px-4 py-2 border rounded-md text-sm font-medium transition-all ${selectedSize === size ? 'border-primary bg-primary text-white' : 'border-gray-300 text-gray-700 hover:border-primary hover:text-primary'}`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center space-x-6 mb-8">
                            <div className="flex items-center border border-gray-300 rounded-full">
                                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 py-2 text-gray-600 hover:text-primary"><FaMinus size={12} /></button>
                                <span className="w-8 text-center text-gray-900 font-medium">{quantity}</span>
                                <button onClick={() => setQuantity(quantity + 1)} className="px-4 py-2 text-gray-600 hover:text-primary"><FaPlus size={12} /></button>
                            </div>
                            <button
                                onClick={handleAddToCart}
                                className="flex-1 bg-secondary text-white px-8 py-3 rounded-full font-medium hover:bg-black transition-colors shadow-lg transform active:scale-95"
                            >
                                Add to Cart
                            </button>
                        </div>

                        {/* Share */}
                        <div className="flex items-center space-x-4 border-t border-gray-100 pt-6">
                            <span className="text-sm text-gray-500">Share:</span>
                            <a href={`https://wa.me/?text=Check out ${product.name} on PerfumeShop: ${shareUrl}`} target="_blank" rel="noreferrer" className="text-green-500 hover:scale-110 transition-transform"><FaWhatsapp size={20} /></a>
                            <a href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`} target="_blank" rel="noreferrer" className="text-blue-600 hover:scale-110 transition-transform"><FaFacebook size={20} /></a>
                            <a href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${product.name}`} target="_blank" rel="noreferrer" className="text-blue-400 hover:scale-110 transition-transform"><FaTwitter size={20} /></a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Reviews Section */}
            <section className="bg-gray-50 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-2xl font-serif font-bold text-secondary mb-8">Customer Reviews</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {/* Reviews List */}
                        <div className="space-y-6">
                            {reviews.length === 0 ? <p className="text-gray-500">No reviews yet. Be the first to review!</p> : (
                                reviews.map((review) => (
                                    <div key={review._id} className="bg-white p-6 rounded-lg shadow-sm">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="font-bold text-gray-900">{review.username}</span>
                                            <div className="flex text-yellow-400">
                                                {[...Array(5)].map((_, i) => (
                                                    <FaStar key={i} className={i < review.rating ? 'text-yellow-400' : 'text-gray-300'} />
                                                ))}
                                            </div>
                                        </div>
                                        <p className="text-gray-600 text-sm">{review.comment}</p>
                                        <span className="text-xs text-gray-400 mt-2 block">{new Date(review.createdAt).toLocaleDateString()}</span>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Review Form */}
                        <div className="bg-white p-8 rounded-lg shadow-lg h-fit">
                            <h3 className="text-xl font-bold mb-4">Write a Review</h3>
                            <form onSubmit={handleReviewSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                                    <input
                                        type="text"
                                        required
                                        value={newReview.username}
                                        onChange={(e) => setNewReview({ ...newReview, username: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                                    <div className="flex space-x-2">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <button
                                                type="button"
                                                key={star}
                                                onClick={() => setNewReview({ ...newReview, rating: star })}
                                                className={`text-2xl focus:outline-none ${star <= newReview.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                                            >
                                                <FaStar />
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Comment</label>
                                    <textarea
                                        rows="4"
                                        required
                                        value={newReview.comment}
                                        onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary outline-none"
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    disabled={submittingReview}
                                    className="w-full bg-primary text-white py-3 rounded-md font-medium hover:bg-opacity-90 transition-colors disabled:bg-gray-400"
                                >
                                    {submittingReview ? 'Submitting...' : 'Submit Review'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ProductDetail;
