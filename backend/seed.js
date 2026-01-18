const mongoose = require('mongoose');
const Product = require('./models/Product');
const Review = require('./models/Review');

mongoose.connect('mongodb://127.0.0.1:27017/perfume-shop', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('✅ MongoDB Connected for Seeding'))
    .catch((err) => console.error('❌ MongoDB Connection Error:', err));

const products = [
    {
        name: "Ethereal Bloom",
        description: "A delicate blend of wild orchids and morning dew, capturing the essence of a secret garden at sunrise. Notes of jasmine, lily of the valley, and white musk create a soft, lingering trail.",
        shortDescription: "Floral notes of wild orchids and morning dew.",
        price: 85,
        originalPrice: 100,
        discountPercentage: 15,
        isOnOffer: true,
        offerLabel: "15% OFF",
        sizes: ["30ml", "50ml", "100ml"],
        images: [
            "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=1000&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=1000&auto=format&fit=crop"
        ]
    },
    {
        name: "Midnight Noir",
        description: "Intense and mysterious, this fragrance combines black currant, bergamot, and rich amber. Perfect for evening wear, it exudes sophistication and bold elegance.",
        shortDescription: "Rich amber and black currant for the night.",
        price: 120,
        originalPrice: 120,
        isOnOffer: false,
        sizes: ["50ml", "100ml"],
        images: [
            "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=1000&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1616995241061-0c0b89aa6f4f?q=80&w=1000&auto=format&fit=crop"
        ]
    },
    {
        name: "Oceanic Breeze",
        description: "Crisp and refreshing, evoking the spirit of the open sea. Marine accords mixed with citrus and driftwood offer a clean, invigorating scent for everyday vitality.",
        shortDescription: "Fresh marine accords with citrus notes.",
        price: 72,
        originalPrice: 90,
        discountPercentage: 20,
        isOnOffer: true,
        offerLabel: "20% OFF",
        sizes: ["30ml", "50ml", "100ml"],
        images: [
            "https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=1000&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1585386959984-a4155224a943?q=80&w=1000&auto=format&fit=crop"

        ]
    },
    {
        name: "Golden Oud",
        description: "A luxurious and opulent woody fragrance featuring rare agarwood, spices, and vanilla. Warm and inviting, it leaves an unforgettable impression of grandeur.",
        shortDescription: "Luxurious woody fragrance with spicy notes.",
        price: 150,
        originalPrice: 150,
        isOnOffer: false,
        sizes: ["50ml", "100ml"],
        images: [
            "https://images.unsplash.com/photo-1557827983-012eb6ea8dc1?q=80&w=1000&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1615486511484-92e172cc4fe0?q=80&w=1000&auto=format&fit=crop"
        ]
    },
    {
        name: "Rose Petal Crush",
        description: "A modern interpretation of the classic rose, mixed with pink pepper and patchouli. Romantic, chic, and vibrantly feminine for the modern woman.",
        shortDescription: "Modern rose scent with pink pepper.",
        price: 92,
        originalPrice: 115,
        discountPercentage: 20,
        isOnOffer: true,
        offerLabel: "20% OFF",
        sizes: ["30ml", "50ml"],
        images: [
            "https://images.unsplash.com/photo-1587017539504-67cfbddac569?q=80&w=1000&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1615485925763-867862f8016a?q=80&w=1000&auto=format&fit=crop"
        ]
    }
];

const seedDB = async () => {
    try {
        await Product.deleteMany({});
        await Review.deleteMany({});

        const createdProducts = await Product.insertMany(products);
        console.log(`✅ Seeded ${createdProducts.length} products`);

        // Add some sample reviews
        const reviews = [
            {
                productId: createdProducts[0]._id,
                username: "Alice",
                rating: 5,
                comment: "Absolutely love this scent! lasts all day."
            },
            {
                productId: createdProducts[0]._id,
                username: "Sophie",
                rating: 4,
                comment: "Very floral and fresh, my new favorite."
            },
            {
                productId: createdProducts[1]._id,
                username: "James",
                rating: 5,
                comment: "Deep and masculine, perfect for dates."
            }
        ];

        await Review.insertMany(reviews);
        console.log(`✅ Seeded ${reviews.length} reviews`);

    } catch (err) {
        console.error('❌ Seeding Error:', err);
    } finally {
        mongoose.connection.close();
    }
};

seedDB();
