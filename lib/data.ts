export type Category={id:string;name:string;icon:string;accent:string;note:string};
export type Product={id:string;slug:string;name:string;category:string;price:number;oldPrice?:number;rating:number;reviews:number;description:string;ingredients:string[];image:string;badge?:string;calories:number;spicy?:boolean;popular?:boolean;accent?:string};

export const runtime = 'edge';
export const site={
  "id": "deh-dastarkhwan",
  "name": "Deh Dastarkhwan",
  "short": "DD",
  "tag": "Desi Fire. Village Soul.",
  "email": "saajiddaniyan23@gmail.com",
  "phone": "+92 344 56447895",
  "location": "District Sanghar, Deh 22 Jamrao",
  "map": "District Sanghar Deh 22 Jamrao Sindh Pakistan",
  "accent": "#b73b24",
  "accent2": "#e2a33a",
  "bg": "#f7f0e5",
  "ink": "#211b16",
  "variant": "rustic"
};
export const categories=[
  {
    "id": "bbq",
    "name": "BBQ Platters",
    "icon": "✦",
    "accent": "#e2a33a",
    "note": "Freshly prepared"
  },
  {
    "id": "handi",
    "name": "Handi",
    "icon": "◈",
    "accent": "#e2a33a",
    "note": "Freshly prepared"
  },
  {
    "id": "tandoor",
    "name": "Tandoor",
    "icon": "◆",
    "accent": "#e2a33a",
    "note": "Freshly prepared"
  },
  {
    "id": "sides",
    "name": "Sides",
    "icon": "●",
    "accent": "#e2a33a",
    "note": "Freshly prepared"
  },
  {
    "id": "drinks",
    "name": "Drinks",
    "icon": "☼",
    "accent": "#e2a33a",
    "note": "Freshly prepared"
  },
  {
    "id": "mithai",
    "name": "Mithai",
    "icon": "◇",
    "accent": "#e2a33a",
    "note": "Freshly prepared"
  }
];
export const products=[
  {
    "id": "jamrao-bbq-platter",
    "slug": "jamrao-bbq-platter",
    "name": "Jamrao BBQ Platter",
    "category": "bbq",
    "price": 2199,
    "rating": 4.9,
    "reviews": 110,
    "description": "Smoky chicken tikka, seekh kebab, charred naan and fresh chutneys for the whole table.",
    "ingredients": [
      "Fresh ingredients",
      "House seasoning",
      "Chef preparation"
    ],
    "image": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1200&q=88",
    "badge": "SIGNATURE",
    "calories": 350,
    "popular": true,
    "accent": "#b73b24"
  },
  {
    "id": "desi-chicken-karahi",
    "slug": "desi-chicken-karahi",
    "name": "Desi Chicken Karahi",
    "category": "handi",
    "price": 1799,
    "rating": 4.8,
    "reviews": 147,
    "description": "Tender chicken cooked in tomato, green chilli and house spices, finished with fresh coriander.",
    "ingredients": [
      "Fresh ingredients",
      "House seasoning",
      "Chef preparation"
    ],
    "image": "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1200&q=88",
    "badge": "HOUSE FAV",
    "calories": 440,
    "popular": true,
    "accent": "#b73b24"
  },
  {
    "id": "charcoal-seekh-kebab",
    "slug": "charcoal-seekh-kebab",
    "name": "Charcoal Seekh Kebab",
    "category": "bbq",
    "price": 899,
    "rating": 4.8,
    "reviews": 184,
    "description": "Juicy beef seekh kebabs grilled over charcoal and served with mint raita.",
    "ingredients": [
      "Fresh ingredients",
      "House seasoning",
      "Chef preparation"
    ],
    "image": "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=88",
    "badge": "HOT",
    "calories": 530,
    "popular": true,
    "accent": "#b73b24"
  },
  {
    "id": "tandoori-naan-basket",
    "slug": "tandoori-naan-basket",
    "name": "Tandoori Naan Basket",
    "category": "tandoor",
    "price": 399,
    "rating": 4.7,
    "reviews": 221,
    "description": "Freshly baked naan brushed with desi ghee and served straight from the tandoor.",
    "ingredients": [
      "Fresh ingredients",
      "House seasoning",
      "Chef preparation"
    ],
    "image": "https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?auto=format&fit=crop&w=1200&q=88",
    "badge": null,
    "calories": 620,
    "popular": true,
    "accent": "#b73b24"
  },
  {
    "id": "mint-raita",
    "slug": "mint-raita",
    "name": "Mint Raita",
    "category": "sides",
    "price": 249,
    "rating": 4.6,
    "reviews": 258,
    "description": "Cool yogurt, mint and cucumber with a light roasted cumin finish.",
    "ingredients": [
      "Fresh ingredients",
      "House seasoning",
      "Chef preparation"
    ],
    "image": "https://images.unsplash.com/photo-1628088062854-d1870b4553da?auto=format&fit=crop&w=1200&q=88",
    "badge": null,
    "calories": 710,
    "popular": false,
    "accent": "#b73b24"
  },
  {
    "id": "mango-lassi",
    "slug": "mango-lassi",
    "name": "Mango Lassi",
    "category": "drinks",
    "price": 349,
    "rating": 4.9,
    "reviews": 295,
    "description": "Thick chilled mango lassi made with creamy yogurt and ripe mango.",
    "ingredients": [
      "Fresh ingredients",
      "House seasoning",
      "Chef preparation"
    ],
    "image": "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=1200&q=88",
    "badge": "COLD",
    "calories": 800,
    "popular": false,
    "accent": "#b73b24"
  },
  {
    "id": "gulab-jamun",
    "slug": "gulab-jamun",
    "name": "Gulab Jamun",
    "category": "mithai",
    "price": 299,
    "rating": 4.8,
    "reviews": 332,
    "description": "Soft warm gulab jamun with cardamom syrup for a classic sweet finish.",
    "ingredients": [
      "Fresh ingredients",
      "House seasoning",
      "Chef preparation"
    ],
    "image": "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1200&q=88",
    "badge": "SWEET",
    "calories": 890,
    "popular": false,
    "accent": "#b73b24"
  }
];
export const offers=[
  {
    "code": "JAMRAO20",
    "title": "20% OFF",
    "sub": "On family platters this weekend",
    "label": "TODAY"
  },
  {
    "code": "NAANFREE",
    "title": "FREE NAAN",
    "sub": "With orders above Rs. 2,000",
    "label": "TODAY"
  },
  {
    "code": "LASSI150",
    "title": "Rs. 150 OFF",
    "sub": "On your first online order",
    "label": "TODAY"
  }
];
export function findProduct(slug:string){return products.find(p=>p.slug===slug)}
