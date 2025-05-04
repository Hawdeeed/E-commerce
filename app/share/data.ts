import { Banner, Category, Product } from './types';

export const categories: Category[] = [
  {
    id: '1',
    name: 'Summer Lawn \'25',
    image: '/images/categories/summer-lawn.jpg'
  },
  {
    id: '2',
    name: 'Winter Replica Prints',
    image: '/images/categories/winter-replica.jpg'
  },
  {
    id: '3',
    name: 'Velvet Luxury',
    image: '/images/categories/velvet-luxury.jpg'
  },
  {
    id: '4',
    name: 'Eastern Chic Pret',
    image: '/images/categories/eastern-chic.jpg'
  },
  {
    id: '5',
    name: 'Modest Wear',
    image: '/images/categories/modest-wear.jpg'
  },
  {
    id: '6',
    name: 'Winter Western',
    image: '/images/categories/winter-western.jpg'
  },
  {
    id: '7',
    name: 'SS Season',
    image: '/images/categories/ss-season.jpg'
  },
  {
    id: '8',
    name: 'Men Unstitched',
    image: '/images/categories/men-unstitched.jpg'
  },
  {
    id: '9',
    name: 'Men Festive',
    image: '/images/categories/men-festive.jpg'
  },
  {
    id: '10',
    name: 'Men Luxury',
    image: '/images/categories/men-luxury.jpg'
  },
  {
    id: '11',
    name: 'Men Kurta Set',
    image: '/images/categories/men-kurta.jpg'
  },
  {
    id: '12',
    name: 'Western',
    image: '/images/categories/western.jpg'
  },
  {
    id: '13',
    name: 'Kids Fashion',
    image: '/images/categories/kids-fashion.jpg'
  },
  {
    id: '14',
    name: 'Ww Western',
    image: '/images/categories/ww-western.jpg'
  }
];

export const lawn2025Products: Product[] = [
  {
    id: '1',
    name: 'Maria B Voyage Lawn Series 25',
    price: 9500,
    discountPercentage: 45,
    image: '/images/products/maria-b-lawn.jpg',
    category: 'Lawn 2025'
  },
  {
    id: '2',
    name: 'Bin Saeed \'25',
    price: 7900,
    image: '/images/products/bin-saeed.jpg',
    category: 'Lawn 2025'
  },
  {
    id: '3',
    name: 'Rang Rasiya Collection Luxury Festive Vol-5',
    price: 8500,
    image: '/images/products/rang-rasiya.jpg',
    category: 'Lawn 2025'
  },
  {
    id: '4',
    name: 'AFZ Zay Brisk Print Eid Year 2025',
    price: 6200,
    image: '/images/products/afz-zay.jpg',
    category: 'Lawn 2025'
  }
];

export const luxuryPicks: Product[] = [
  {
    id: '5',
    name: 'Hoorain Official',
    price: 12500,
    discountPercentage: 60,
    image: '/images/products/hoorain.jpg',
    category: 'Luxury',
    items: 213
  },
  {
    id: '6',
    name: 'Emaan',
    price: 15000,
    discountPercentage: 40,
    image: '/images/products/emaan.jpg',
    category: 'Luxury',
    items: 150
  },
  {
    id: '7',
    name: 'Agha Noor',
    price: 11000,
    discountPercentage: 40,
    image: '/images/products/agha-noor.jpg',
    category: 'Luxury',
    items: 140
  },
  {
    id: '8',
    name: 'Faiza Saqlain Bridals',
    price: 25000,
    discountPercentage: 75,
    image: '/images/products/faiza-saqlain.jpg',
    category: 'Luxury',
    items: 240
  },
  {
    id: '9',
    name: 'Laal Clothing',
    price: 18000,
    discountPercentage: 75,
    image: '/images/products/laal-clothing.jpg',
    category: 'Luxury',
    items: 95
  },
  {
    id: '10',
    name: 'Saad Shehri',
    price: 14500,
    discountPercentage: 20,
    image: '/images/products/saad-shehri.jpg',
    category: 'Luxury',
    items: 52
  },
  {
    id: '11',
    name: 'Rang e Naqsh',
    price: 13000,
    discountPercentage: 50,
    image: '/images/products/rang-e-naqsh.jpg',
    category: 'Luxury',
    items: 110
  },
  {
    id: '12',
    name: 'Diwa Couture',
    price: 16000,
    discountPercentage: 20,
    image: '/images/products/diwa-couture.jpg',
    category: 'Luxury',
    items: 75
  }
];

export const mainBanner: Banner = {
  id: '1',
  title: "MOTHER'S DAY",
  subtitle: "#KidsKidsMomFirst",
  description: "SALE UP TO 85% OFF",
  image: '/images/banners/mothers-day.jpg',
  buttonText: 'SHOP NOW',
  buttonLink: '/shop'
};

export const promoOffer = {
  title: "UNLOCK AN EXTRA 20% OFF",
  description: "USE PROMO CODE & SAVE UPTO 20% OFF",
  image: '/images/banners/promo-offer.jpg',
  buttonText: 'SHOP NOW',
  buttonLink: '/shop'
};