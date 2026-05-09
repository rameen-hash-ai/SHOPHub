const mongoose=require('mongoose'); //importing the mongoose module
const Product=require('./models/Product'); //importing the Product model

const products=[
    {
        name:'Apple iPhone 14 Pro Max',
        price:1099,
        originalPrice:1199,
        category:'Smartphones',
        brand:'Apple',
        rating:4.8,
        reviews:1500,
        stock:50,
        sold:200,
        description:'The iPhone 14 Pro Max features a stunning 6.7-inch Super Retina XDR display, powered by the A16 Bionic chip for lightning-fast performance. With its advanced camera system, you can capture professional-quality photos and videos. The device also offers improved battery life, ensuring you stay connected all day long.',
        image:'https://via.placeholder.com/300x300?text=Apple+iPhone+14+Pro+Max'
    },
    {
        name:'Samsung Galaxy S23 Ultra',
        price:1199,
        originalPrice:1299, 
        category:'Smartphones',
        brand:'Samsung',
        rating:4.7,
        reviews:1200,
        stock:50,
        sold:180,
        description:'The Samsung Galaxy S23 Ultra features a stunning 6.8-inch Dynamic AMOLED 2X display, powered by the Exynos 2300 chip for exceptional performance. With its advanced camera system, you can capture professional-quality photos and videos. The device also offers improved battery life, ensuring you stay connected all day long.',
        image:'https://via.placeholder.com/300x300?text=Samsung+Galaxy+S23+Ultra'
    },
    {
        name:'Sony WH-1000XM4',
        price:349,
        originalPrice:399,
        category:'Electronics',
        brand:'GoPro',
        rating:7.5,
        reviews:500,
        stock:100,
        sold:300,
        description:'The Sony WH-1000XM4 headphones offer industry-leading noise cancellation, exceptional sound quality, and a comfortable fit. With up to 30 hours of battery life and smart features like adaptive sound control, these headphones are perfect for music lovers and travelers alike.',
        image:'https://via.placeholder.com/300x300?text=Sony+WH-1000XM4' 

    },
       {
        name: 'Canon EOS DSLR Camera',
        price: 199.50,
        originalPrice: 250.00,
        category: 'Electronics',
        brand: 'Canon',
        rating: 8.2,
        reviews: 41,
        stock: 12,
        sold: 43,
        description: 'Professional DSLR camera with 24.1MP CMOS sensor. Shoot stunning stills and Full HD video.',
        image: 'https://via.placeholder.com/200x160/f0f0f0/333?text=Canon+EOS'
    },
    {
        name: 'MacBook Pro 16" M1',
        price: 999.50,
        originalPrice: 1299.00,
        category: 'Electronics',
        brand: 'Apple',
        rating: 9.5,
        reviews: 87,
        stock: 8,
        sold: 210,
        description: 'The most powerful MacBook Pro ever. M1 Pro chip delivers up to 70% faster CPU performance.',
        image: 'https://via.placeholder.com/200x160/f0f0f0/333?text=MacBook+Pro'
    },
    {
        name: 'Apple Watch Series 7',
        price: 299.50,
        originalPrice: 399.00,
        category: 'Accessories',
        brand: 'Apple',
        rating: 8.9,
        reviews: 55,
        stock: 25,
        sold: 133,
        description: 'Apple Watch Series 7 with always-on Retina display. Crack-resistant front crystal and IP6X dust resistance.',
        image: 'https://via.placeholder.com/200x160/f0f0f0/333?text=Apple+Watch'
    },
    {
        name: 'Xiaomi Redmi Note 10',
        price: 32.00,
        originalPrice: 40.00,
        category: 'Smartphones',
        brand: 'Xiaomi',
        rating: 7.8,
        reviews: 63,
        stock: 60,
        sold: 289,
        description: 'Redmi Note 10 with 108MP AI quad camera and 5000mAh battery. 6.43" Super AMOLED display.',
        image: 'https://via.placeholder.com/200x160/f0f0f0/333?text=Redmi+Note'
    },
    {
        name: 'Sony WH-1000XM4 Headphones',
        price: 249.50,
        originalPrice: 320.00,
        category: 'Accessories',
        brand: 'Sony',
        rating: 9.1,
        reviews: 74,
        stock: 18,
        sold: 176,
        description: 'Industry-leading noise canceling headphones with 30-hour battery life and multipoint connection.',
        image: 'https://via.placeholder.com/200x160/f0f0f0/333?text=Sony+WH'
    }
];
    

async function seedDB(){
    try{
        await mongoose.connect('mongodb://localhost:27017/ecommerce'); //connect to the MongoDB database
        console.log('Connected to MongoDB');
        await Product.deleteMany({});
        console.log('Cleared existing products');
        await Product.insertMany(products);
        console.log('Seeded products successfully');
        mongoose.connection.close();
    } catch (error) {
        console.error('Error seeding database:', error);
        mongoose.connection.close();
    }
}

seedDB(); //call the seedDB function to execute the seeding process