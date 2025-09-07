
export interface SeoSettings {
  title?: string;
  description?: string;
  keywords?: string; // comma-separated
}

export interface Category {
  id: string;
  name: string;
  seo?: SeoSettings;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  sizes: string[];
  colors: string[];
  stock: number;
  rating: number;
  reviews: Review[];
  seo?: SeoSettings;
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  size: string;
  color: string;
}

export type OrderStatus = 'Pending' | 'Shipped' | 'Delivered' | 'Cancelled';

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  total: number;
  date: string;
  status: OrderStatus;
  shippingAddress: {
    name: string;
    address: string;
    city: string;
    zip: string;
  };
  paymentMethod: 'COD' | 'Online';
}

export type UserRole = 'customer' | 'admin';

export interface User {
  id: string;
  email: string;
  password?: string; // Should not be stored long term
  role: UserRole;
  orders: string[]; // array of order IDs
  wishlist: string[]; // array of product IDs
  isBlocked?: boolean;
}

export interface TradeArea {
  id:string;
  name: string;
  cities: string[];
  deliveryRadiusKm: number;
}

export interface Branch {
  id: string;
  name: string;
  address: string;
  city: string;
  contactPhone: string;
  tradeAreaId: string;
}

export interface FilterSettings {
  price: boolean;
  color: boolean;
  size: boolean;
}

export interface Promotion {
  id:string;
  code: string;
  discountPercent: number;
  isActive: boolean;
}