export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'Men' | 'Women' | 'Kids' | 'Streetwear' | 'Accessories';
  images: string[];
  sizes: string[];
  colors: { name: string; hex: string }[];
  trending: boolean;
  newArrival: boolean;
  stock: number;
  rating: number;
  reviews: Review[];
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  image: string;
  size: string;
  color: string;
  quantity: number;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  address: {
    street: string;
    city: string;
    zipCode: string;
    phone: string;
  };
  paymentMethod: 'Stripe' | 'JazzCash' | 'Easypaisa' | 'COD';
  createdAt: string;
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  role: 'user' | 'admin';
  address?: {
    street: string;
    city: string;
    zipCode: string;
    phone: string;
  };
}
