import { Product, User, Category, Order, TradeArea, Branch, Promotion } from '../types';

export const mockCategories: Category[] = [
  { id: '1', name: 'Men', seo: { title: 'Mens Fashion | LuxeThread', description: 'Shop the latest trends in mens clothing.' } },
  { id: '2', name: 'Women', seo: { title: 'Womens Fashion | LuxeThread', description: 'Discover stylish womens apparel.' } },
  { id: '3', name: 'Kids', seo: { title: 'Kids Clothing | LuxeThread', description: 'Fun and durable clothing for kids.' } },
  { id: '4', name: 'Accessories', seo: { title: 'Fashion Accessories | LuxeThread', description: 'Complete your look with our accessories.' } },
];

export const mockProducts: Product[] = [
  {
    id: 'p1',
    name: 'Classic Crewneck T-Shirt',
    description: 'A timeless classic, this soft cotton t-shirt is a wardrobe essential. Perfect for layering or wearing on its own.',
    price: 29.99,
    category: 'Men',
    imageUrl: 'https://picsum.photos/seed/p1/600/800',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['White', 'Black', 'Navy'],
    stock: 50,
    rating: 4.5,
    reviews: [
      { id: 'r1', userId: 'u3', userName: 'Test User', rating: 5, comment: 'Super soft and fits perfectly!', date: '2023-10-15T10:00:00Z' },
      { id: 'r2', userId: 'u1', userName: 'Customer', rating: 4, comment: 'Great quality, but shrunk a little after washing.', date: '2023-10-20T14:30:00Z' },
    ],
    seo: {
        title: 'Buy Classic Crewneck T-Shirt Online',
        description: 'High-quality cotton crewneck t-shirt for men. Available in white, black, and navy.',
        keywords: 't-shirt, crewneck, mens fashion, cotton shirt'
    }
  },
  {
    id: 'p2',
    name: 'Slim-Fit Denim Jeans',
    description: 'Crafted from premium stretch denim, these jeans offer a modern slim fit and all-day comfort.',
    price: 89.99,
    category: 'Men',
    imageUrl: 'https://picsum.photos/seed/p2/600/800',
    sizes: ['30', '32', '34', '36'],
    colors: ['Indigo', 'Black'],
    stock: 30,
    rating: 4.8,
    reviews: [
      { id: 'r3', userId: 'u3', userName: 'Test User', rating: 5, comment: 'Best jeans I have ever owned.', date: '2023-11-01T11:00:00Z' },
    ],
    seo: {
        title: 'Mens Slim-Fit Denim Jeans',
        description: 'Shop for premium stretch slim-fit denim jeans for men. The perfect fit for a modern look.',
        keywords: 'jeans, denim, mens jeans, slim-fit'
    }
  },
  {
    id: 'p3',
    name: 'Floral Print Midi Dress',
    description: 'Elegant and breezy, this midi dress features a vibrant floral print, a flattering waist tie, and a flowing skirt.',
    price: 129.99,
    category: 'Women',
    imageUrl: 'https://picsum.photos/seed/p3/600/800',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Rose', 'Sky Blue'],
    stock: 25,
    rating: 4.2,
    reviews: [],
    seo: {},
  },
  {
    id: 'p4',
    name: 'Cashmere V-Neck Sweater',
    description: 'Indulge in the luxury of pure cashmere with this exquisitely soft V-neck sweater. A versatile piece for any occasion.',
    price: 199.99,
    category: 'Women',
    imageUrl: 'https://picsum.photos/seed/p4/600/800',
    sizes: ['S', 'M', 'L'],
    colors: ['Heather Grey', 'Beige', 'Black'],
    stock: 8,
    rating: 5.0,
    reviews: [
      { id: 'r4', userId: 'u1', userName: 'Customer', rating: 5, comment: 'Worth every penny, incredibly soft.', date: '2023-10-25T09:20:00Z' },
    ],
    seo: {},
  },
  {
    id: 'p5',
    name: 'Dinosaur Graphic Hoodie',
    description: 'Fun and cozy, this hoodie with a cool dinosaur graphic will be your kid\'s new favorite. Made from soft fleece.',
    price: 45.00,
    category: 'Kids',
    imageUrl: 'https://picsum.photos/seed/p5/600/800',
    sizes: ['4T', '5T', '6'],
    colors: ['Green', 'Blue'],
    stock: 0,
    rating: 4.0,
    reviews: [],
    seo: {},
  },
  {
    id: 'p6',
    name: 'Leather Crossbody Bag',
    description: 'A chic and practical accessory, this genuine leather crossbody bag has multiple compartments to keep you organized.',
    price: 149.00,
    category: 'Accessories',
    imageUrl: 'https://picsum.photos/seed/p6/600/800',
    sizes: ['One Size'],
    colors: ['Tan', 'Black'],
    stock: 20,
    rating: 4.7,
    reviews: [],
    seo: {},
  },
   {
    id: 'p7',
    name: 'Linen Button-Up Shirt',
    description: 'Stay cool and stylish in this breathable linen shirt. Perfect for warm weather and beach vacations.',
    price: 75.50,
    category: 'Men',
    imageUrl: 'https://picsum.photos/seed/p7/600/800',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['White', 'Light Blue', 'Khaki'],
    stock: 35,
    rating: 4.3,
    reviews: [],
    seo: {},
  },
  {
    id: 'p8',
    name: 'High-Waisted Pleated Skirt',
    description: 'A sophisticated pleated skirt that falls just below the knee. Pairs beautifully with blouses or sweaters.',
    price: 95.00,
    category: 'Women',
    imageUrl: 'https://picsum.photos/seed/p8/600/800',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Emerald', 'Burgundy'],
    stock: 22,
    rating: 4.6,
    reviews: [],
    seo: {},
  },
];

export const mockUsers: User[] = [
  { id: 'u1', email: 'customer@example.com', password: 'password123', role: 'customer', orders: ['o1'], wishlist: ['p4', 'p2'], isBlocked: false },
  { id: 'u2', email: 'admin@example.com', password: 'admin123', role: 'admin', orders: [], wishlist: [], isBlocked: false },
  { id: 'u3', email: 'testuser@example.com', password: 'password123', role: 'customer', orders: [], wishlist: [], isBlocked: true },
];

export const mockOrders: Order[] = [
  {
    id: 'o1',
    userId: 'u1',
    items: [
      { productId: 'p1', name: 'Classic Crewneck T-Shirt', price: 29.99, quantity: 2, size: 'M', color: 'White' },
      { productId: 'p3', name: 'Floral Print Midi Dress', price: 129.99, quantity: 1, size: 'S', color: 'Rose' },
    ],
    total: 189.97,
    date: '2023-10-26T10:00:00Z',
    status: 'Delivered',
    shippingAddress: { name: 'Jane Doe', address: '123 Fashion Ave', city: 'New York', zip: '10001' },
    paymentMethod: 'Online',
  },
  {
    id: 'o2',
    userId: 'u1',
    items: [
      { productId: 'p6', name: 'Leather Crossbody Bag', price: 149.00, quantity: 1, size: 'One Size', color: 'Tan' },
    ],
    total: 149.00,
    date: '2023-10-28T14:30:00Z',
    status: 'Shipped',
    shippingAddress: { name: 'Jane Doe', address: '123 Fashion Ave', city: 'Los Angeles', zip: '90001' },
    paymentMethod: 'COD',
  },
    {
    id: 'o3',
    userId: 'u3',
    items: [
      { productId: 'p2', name: 'Slim-Fit Denim Jeans', price: 89.99, quantity: 1, size: '32', color: 'Indigo' },
    ],
    total: 89.99,
    date: '2023-11-01T11:00:00Z',
    status: 'Pending',
    shippingAddress: { name: 'Test User', address: '456 Tech Rd', city: 'Chicago', zip: '60601' },
    paymentMethod: 'Online',
  },
   {
    id: 'o4',
    userId: 'u1',
    items: [
      { productId: 'p4', name: 'Cashmere V-Neck Sweater', price: 199.99, quantity: 1, size: 'M', color: 'Beige' },
    ],
    total: 199.99,
    date: '2023-11-02T12:00:00Z',
    status: 'Delivered',
    shippingAddress: { name: 'Jane Doe', address: '123 Fashion Ave', city: 'New York', zip: '10001' },
    paymentMethod: 'Online',
  },
];

export const mockTradeAreas: TradeArea[] = [
  { id: 'ta1', name: 'Metro Area', cities: ['New York', 'Brooklyn', 'Queens'], deliveryRadiusKm: 25 },
  { id: 'ta2', name: 'Tri-State Outskirts', cities: ['Yonkers', 'Newark', 'Jersey City'], deliveryRadiusKm: 50 },
];

export const mockBranches: Branch[] = [
  { id: 'b1', name: 'Manhattan Flagship', address: '5th Avenue', city: 'New York', contactPhone: '212-555-0101', tradeAreaId: 'ta1' },
  { id: 'b2', name: 'Brooklyn Boutique', address: '123 Williamsburg St', city: 'Brooklyn', contactPhone: '718-555-0102', tradeAreaId: 'ta1' },
  { id: 'b3', name: 'Newark Hub', address: '456 Market St', city: 'Newark', contactPhone: '973-555-0103', tradeAreaId: 'ta2' },
];

export const mockPromotions: Promotion[] = [
    { id: 'promo1', code: 'SUMMER20', discountPercent: 20, isActive: true },
    { id: 'promo2', code: 'NEWBIE10', discountPercent: 10, isActive: true },
    { id: 'promo3', code: 'EXPIRED5', discountPercent: 5, isActive: false },
];