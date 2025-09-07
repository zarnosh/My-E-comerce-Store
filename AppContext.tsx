import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { Product, User, Order, Category, OrderStatus, UserRole, Review, TradeArea, Branch, FilterSettings, Promotion } from '../types';
import { mockProducts, mockUsers, mockOrders, mockCategories, mockTradeAreas, mockBranches, mockPromotions } from '../data/mockData';

type ToastMessage = {
  message: string;
  type: 'success' | 'error';
} | null;

interface AppContextType {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  orders: Order[];
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
  categories: Category[];
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
  tradeAreas: TradeArea[];
  setTradeAreas: React.Dispatch<React.SetStateAction<TradeArea[]>>;
  branches: Branch[];
  setBranches: React.Dispatch<React.SetStateAction<Branch[]>>;
  promotions: Promotion[];
  setPromotions: React.Dispatch<React.SetStateAction<Promotion[]>>;
  currentUser: User | null;
  login: (email: string, role: UserRole) => User | null;
  logout: () => void;
  addOrder: (order: Omit<Order, 'id' | 'date' | 'userId'>) => void;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  updateProduct: (product: Product) => void;
  addProduct: (product: Omit<Product, 'id'>) => void;
  deleteProduct: (productId: string) => void;
  deleteMultipleProducts: (productIds: string[]) => void;
  updateProductStock: (productId: string, newStock: number) => void;
  updateCategory: (category: Category) => void;
  addCategory: (category: Omit<Category, 'id'>) => void;
  deleteCategory: (categoryId: string) => void;
  toggleWishlist: (productId: string) => void;
  addReview: (productId: string, review: { rating: number; comment: string; }) => void;
  toggleUserBlockedStatus: (userId: string) => void;
  addTradeArea: (tradeArea: Omit<TradeArea, 'id'>) => void;
  updateTradeArea: (tradeArea: TradeArea) => void;
  deleteTradeArea: (tradeAreaId: string) => void;
  addBranch: (branch: Omit<Branch, 'id'>) => void;
  updateBranch: (branch: Branch) => void;
  deleteBranch: (branchId: string) => void;
  addPromotion: (promotion: Omit<Promotion, 'id'>) => void;
  updatePromotion: (promotion: Promotion) => void;
  deletePromotion: (promotionId: string) => void;
  filterSettings: FilterSettings;
  updateFilterSettings: (settings: FilterSettings) => void;
  toast: ToastMessage;
  showToast: (message: string, type: 'success' | 'error') => void;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [categories, setCategories] = useState<Category[]>(mockCategories);
  const [tradeAreas, setTradeAreas] = useState<TradeArea[]>(mockTradeAreas);
  const [branches, setBranches] = useState<Branch[]>(mockBranches);
  const [promotions, setPromotions] = useState<Promotion[]>(mockPromotions);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [toast, setToast] = useState<ToastMessage>(null);
  const [filterSettings, setFilterSettings] = useState<FilterSettings>({
    price: true,
    color: true,
    size: true,
  });

  useEffect(() => {
    const storedUser = sessionStorage.getItem('currentUser');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
     const storedFilters = localStorage.getItem('filterSettings');
    if (storedFilters) {
      setFilterSettings(JSON.parse(storedFilters));
    }
  }, []);
  
  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const login = (email: string, role: UserRole): User | null => {
    const user = users.find(u => u.email === email && u.role === role);
    if (user) {
      if (user.isBlocked) {
        showToast('This account has been blocked.', 'error');
        return null;
      }
      const userWithWishlist = { ...user, wishlist: user.wishlist || [] };
      setCurrentUser(userWithWishlist);
      sessionStorage.setItem('currentUser', JSON.stringify(userWithWishlist));
      return userWithWishlist;
    }
    return null;
  };

  const logout = () => {
    setCurrentUser(null);
    sessionStorage.removeItem('currentUser');
  };

  const addOrder = (orderData: Omit<Order, 'id' | 'date' | 'userId'>) => {
    if (!currentUser) return;
    const newOrder: Order = {
      ...orderData,
      id: `o${Date.now()}`,
      date: new Date().toISOString(),
      userId: currentUser.id,
    };
    setOrders(prev => [newOrder, ...prev]);

    orderData.items.forEach(item => {
      setProducts(prevProducts =>
        prevProducts.map(p =>
          p.id === item.productId ? { ...p, stock: p.stock - item.quantity } : p
        )
      );
    });
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
  };
  
  const updateProduct = (updatedProduct: Product) => {
    setProducts(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
  };
  
  const updateProductStock = (productId: string, newStock: number) => {
    setProducts(prev => prev.map(p => p.id === productId ? { ...p, stock: newStock } : p));
  };

  const addProduct = (productData: Omit<Product, 'id'>) => {
    const newProduct: Product = { ...productData, rating: 0, reviews: [], id: `p${Date.now()}`, seo: {} };
    setProducts(prev => [newProduct, ...prev]);
  };
  
  const deleteProduct = (productId: string) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
  };

  const deleteMultipleProducts = (productIds: string[]) => {
    setProducts(prev => prev.filter(p => !productIds.includes(p.id)));
    showToast(`${productIds.length} products deleted successfully.`, 'success');
  };

  const updateCategory = (updatedCategory: Category) => {
    setCategories(prev => prev.map(c => c.id === updatedCategory.id ? updatedCategory : c));
  };

  const addCategory = (categoryData: Omit<Category, 'id'>) => {
    const newCategory: Category = { ...categoryData, id: `c${Date.now()}`, seo: {} };
    setCategories(prev => [...prev, newCategory]);
  };

  const deleteCategory = (categoryId: string) => {
    setCategories(prev => prev.filter(c => c.id !== categoryId));
  };

  const toggleWishlist = (productId: string) => {
    if (!currentUser) {
        showToast('Please log in to manage your wishlist.', 'error');
        return;
    }
    const isInWishlist = currentUser.wishlist.includes(productId);
    const updatedWishlist = isInWishlist
        ? currentUser.wishlist.filter(id => id !== productId)
        : [...currentUser.wishlist, productId];

    const updatedUser = { ...currentUser, wishlist: updatedWishlist };
    
    setCurrentUser(updatedUser);
    setUsers(prevUsers => prevUsers.map(u => u.id === currentUser.id ? updatedUser : u));
    sessionStorage.setItem('currentUser', JSON.stringify(updatedUser));
    showToast(isInWishlist ? 'Removed from wishlist' : 'Added to wishlist', 'success');
  };

  const addReview = (productId: string, reviewData: { rating: number; comment: string; }) => {
    if (!currentUser) return;

    const newReview: Review = {
        id: `r${Date.now()}`,
        userId: currentUser.id,
        userName: currentUser.email.split('@')[0],
        ...reviewData,
        date: new Date().toISOString(),
    };

    setProducts(prevProducts =>
        prevProducts.map(p => {
            if (p.id === productId) {
                const updatedReviews = [...p.reviews, newReview];
                const newRating = updatedReviews.reduce((acc, r) => acc + r.rating, 0) / updatedReviews.length;
                return { ...p, reviews: updatedReviews, rating: parseFloat(newRating.toFixed(1)) };
            }
            return p;
        })
    );
    showToast('Thank you for your review!', 'success');
  };

  const toggleUserBlockedStatus = (userId: string) => {
    setUsers(prevUsers =>
      prevUsers.map(user =>
        user.id === userId ? { ...user, isBlocked: !user.isBlocked } : user
      )
    );
  };

  const addTradeArea = (tradeAreaData: Omit<TradeArea, 'id'>) => {
    const newTradeArea: TradeArea = { ...tradeAreaData, id: `ta${Date.now()}` };
    setTradeAreas(prev => [...prev, newTradeArea]);
  };

  const updateTradeArea = (updatedTradeArea: TradeArea) => {
    setTradeAreas(prev => prev.map(ta => ta.id === updatedTradeArea.id ? updatedTradeArea : ta));
  };

  const deleteTradeArea = (tradeAreaId: string) => {
    setTradeAreas(prev => prev.filter(ta => ta.id !== tradeAreaId));
    // Also handle cascading delete for branches
    setBranches(prev => prev.filter(b => b.tradeAreaId !== tradeAreaId));
  };

  const addBranch = (branchData: Omit<Branch, 'id'>) => {
    const newBranch: Branch = { ...branchData, id: `b${Date.now()}` };
    setBranches(prev => [...prev, newBranch]);
  };

  const updateBranch = (updatedBranch: Branch) => {
    setBranches(prev => prev.map(b => b.id === updatedBranch.id ? updatedBranch : b));
  };

  const deleteBranch = (branchId: string) => {
    setBranches(prev => prev.filter(b => b.id !== branchId));
  };

  const updateFilterSettings = (settings: FilterSettings) => {
    setFilterSettings(settings);
    localStorage.setItem('filterSettings', JSON.stringify(settings));
    showToast('Filter settings updated!', 'success');
  };

  const addPromotion = (promotionData: Omit<Promotion, 'id'>) => {
    const newPromotion: Promotion = { ...promotionData, id: `promo${Date.now()}` };
    setPromotions(prev => [...prev, newPromotion]);
  };

  const updatePromotion = (updatedPromotion: Promotion) => {
    setPromotions(prev => prev.map(p => p.id === updatedPromotion.id ? updatedPromotion : p));
  };

  const deletePromotion = (promotionId: string) => {
    setPromotions(prev => prev.filter(p => p.id !== promotionId));
  };


  return (
    <AppContext.Provider value={{
      products, setProducts,
      users, setUsers,
      orders, setOrders,
      categories, setCategories,
      tradeAreas, setTradeAreas,
      branches, setBranches,
      promotions, setPromotions,
      currentUser, login, logout,
      addOrder, updateOrderStatus,
      updateProduct, addProduct, deleteProduct, deleteMultipleProducts, updateProductStock,
      updateCategory, addCategory, deleteCategory,
      toggleWishlist, addReview, toggleUserBlockedStatus,
      addTradeArea, updateTradeArea, deleteTradeArea,
      addBranch, updateBranch, deleteBranch,
      addPromotion, updatePromotion, deletePromotion,
      filterSettings, updateFilterSettings,
      toast, showToast,
    }}>
      {children}
    </AppContext.Provider>
  );
};