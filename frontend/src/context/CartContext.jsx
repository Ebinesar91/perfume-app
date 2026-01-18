import { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        try {
            const savedCart = localStorage.getItem('perfume-cart');
            return savedCart ? JSON.parse(savedCart) : [];
        } catch (error) {
            console.error('Error loading cart from local storage', error);
            return [];
        }
    });
    const [isCartOpen, setIsCartOpen] = useState(false);

    useEffect(() => {
        localStorage.setItem('perfume-cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product, size, quantity) => {
        setCart((prevCart) => {
            const existingItemIndex = prevCart.findIndex(
                (item) => item._id === product._id && item.selectedSize === size
            );

            if (existingItemIndex > -1) {
                const newCart = [...prevCart];
                newCart[existingItemIndex].quantity += quantity;
                return newCart;
            } else {
                return [...prevCart, { ...product, selectedSize: size, quantity }];
            }
        });
        setIsCartOpen(true); // Auto-open cart when adding item
    };

    const removeFromCart = (productId, size) => {
        setCart((prevCart) =>
            prevCart.filter((item) => !(item._id === productId && item.selectedSize === size))
        );
    };

    const clearCart = () => setCart([]);

    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, cartCount, isCartOpen, setIsCartOpen }}>
            {children}
        </CartContext.Provider>
    );
};
