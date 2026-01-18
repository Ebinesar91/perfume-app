import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiTrash2, FiShoppingBag } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const CartSidebar = () => {
    const { cart, removeFromCart, cartCount, isCartOpen, setIsCartOpen, clearCart } = useCart();
    const navigate = useNavigate();

    const totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

    const handleCheckout = () => {
        alert('Checkout functionality coming soon!');
        // navigate('/checkout');
    };

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsCartOpen(false)}
                        className="fixed inset-0 bg-black bg-opacity-50 z-[60]"
                    />

                    {/* Sidebar */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'tween', duration: 0.3 }}
                        className="fixed top-0 right-0 h-full w-full md:w-96 bg-white shadow-2xl z-[70] flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-6 border-b flex justify-between items-center bg-gray-50">
                            <h2 className="text-xl font-serif font-bold text-secondary flex items-center">
                                <FiShoppingBag className="mr-2" /> Your Cart ({cartCount})
                            </h2>
                            <button onClick={() => setIsCartOpen(false)} className="text-gray-500 hover:text-red-500 transition-colors">
                                <FiX size={24} />
                            </button>
                        </div>

                        {/* Cart Items */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6">
                            {cart.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-4">
                                    <FiShoppingBag size={48} className="opacity-20" />
                                    <p>Your cart is empty.</p>
                                    <button
                                        onClick={() => setIsCartOpen(false)}
                                        className="text-primary hover:underline"
                                    >
                                        Start Shopping
                                    </button>
                                </div>
                            ) : (
                                cart.map((item) => (
                                    <div key={`${item._id}-${item.selectedSize}`} className="flex space-x-4">
                                        <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                            <img
                                                src={item.images[0]}
                                                alt={item.name}
                                                className="h-full w-full object-cover object-center"
                                            />
                                        </div>
                                        <div className="flex flex-1 flex-col">
                                            <div>
                                                <div className="flex justify-between text-base font-medium text-gray-900">
                                                    <h3>{item.name}</h3>
                                                    <p className="ml-4">${item.price * item.quantity}</p>
                                                </div>
                                                <p className="mt-1 text-sm text-gray-500">{item.selectedSize}</p>
                                            </div>
                                            <div className="flex flex-1 items-end justify-between text-sm">
                                                <p className="text-gray-500">Qty {item.quantity}</p>
                                                <button
                                                    type="button"
                                                    onClick={() => removeFromCart(item._id, item.selectedSize)}
                                                    className="font-medium text-red-500 hover:text-red-700 flex items-center"
                                                >
                                                    <FiTrash2 className="mr-1" /> Remove
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Footer */}
                        {cart.length > 0 && (
                            <div className="border-t border-gray-200 p-6 bg-gray-50">
                                <div className="flex justify-between text-base font-medium text-gray-900 mb-4">
                                    <p>Subtotal</p>
                                    <p>${totalPrice}</p>
                                </div>
                                <p className="mt-0.5 text-sm text-gray-500 mb-6">Shipping and taxes calculated at checkout.</p>
                                <button
                                    onClick={handleCheckout}
                                    className="w-full flex items-center justify-center rounded-full border border-transparent bg-secondary px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-black transition-all hover:shadow-lg"
                                >
                                    Checkout
                                </button>
                                <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                                    <p>
                                        or{" "}
                                        <button
                                            type="button"
                                            className="font-medium text-primary hover:text-primary-light"
                                            onClick={() => setIsCartOpen(false)}
                                        >
                                            Continue Shopping
                                            <span aria-hidden="true"> &rarr;</span>
                                        </button>
                                    </p>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default CartSidebar;
