export const CATEGORIES = ['Men', 'Women', 'Kids', 'Streetwear', 'Accessories'] as const;

export const PAKISTAN_CITIES = [
  'Karachi', 'Lahore', 'Islamabad', 'Rawalpindi', 'Faisalabad', 
  'Multan', 'Gujranwala', 'Peshawar', 'Quetta', 'Sialkot'
];

export const MOCK_PRODUCTS = [
  {
    id: '1',
    name: 'Essential Oversized Hoodie',
    description: 'A premium heavy-weight cotton hoodie with a relaxed fit. Perfect for streetwear layering.',
    price: 4500,
    category: 'Streetwear',
    images: ['https://picsum.photos/seed/hoodie1/800/1000', 'https://picsum.photos/seed/hoodie2/800/1000'],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Onyx Black', hex: '#141414' },
      { name: 'Sand Beige', hex: '#D2B48C' }
    ],
    trending: true,
    newArrival: true,
    stock: 50,
    rating: 4.8,
    reviews: []
  },
  {
    id: '2',
    name: 'Midnight Silk Evening Gown',
    description: 'Luxurious silk gown for formal occasions. Elegantly tailored with a minimal silhouette.',
    price: 12000,
    category: 'Women',
    images: ['https://picsum.photos/seed/gown1/800/1000', 'https://picsum.photos/seed/gown2/800/1000'],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Midnight Blue', hex: '#191970' },
      { name: 'Champagne', hex: '#F7E7CE' }
    ],
    trending: true,
    newArrival: false,
    stock: 20,
    rating: 4.9,
    reviews: []
  },
  {
    id: '3',
    name: 'Tailored Wool Blazer',
    description: 'Classic wool blazer with a modern slim-fit cut. A staple for the professional man.',
    price: 8500,
    category: 'Men',
    images: ['https://picsum.photos/seed/blazer1/800/1000'],
    sizes: ['M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Charcoal', hex: '#36454F' },
      { name: 'Navy', hex: '#000080' }
    ],
    trending: false,
    newArrival: true,
    stock: 30,
    rating: 4.7,
    reviews: []
  },
  {
    id: '4',
    name: 'Urban Cargo Joggers',
    description: 'Tech-inspired cargo joggers with multiple utility pockets. Built for durability and style.',
    price: 3800,
    category: 'Streetwear',
    images: ['https://picsum.photos/seed/cargo1/800/1000'],
    sizes: ['S', 'M', 'L'],
    colors: [
      { name: 'Olive Green', hex: '#556B2F' },
      { name: 'Tech Black', hex: '#000000' }
    ],
    trending: true,
    newArrival: true,
    stock: 45,
    rating: 4.6,
    reviews: []
  },
  {
    id: '5',
    name: 'Gold Accent Leather Tote',
    description: 'Genuine leather tote bag with minimalist gold hardware. Spacious and chic.',
    price: 6200,
    category: 'Accessories',
    images: ['https://picsum.photos/seed/tote1/800/1000'],
    sizes: ['One Size'],
    colors: [
      { name: 'Tan', hex: '#D2B48C' },
      { name: 'Black', hex: '#000000' }
    ],
    trending: false,
    newArrival: false,
    stock: 15,
    rating: 4.5,
    reviews: []
  }
];
