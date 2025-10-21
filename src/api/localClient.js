// localClient.js
// Standalone in-memory product catalog + local recommender.
const sampleProducts = [
  {
    id: 'p1',
    name: 'UltraBook Pro 14',
    description: 'Lightweight laptop with powerful CPU and great battery life.',
    price: 999,
    category: 'laptops',
    image_url: '',
    brand: 'TechBrand',
    specifications: { processor: 'Intel i7', ram: '16GB', storage: '512GB SSD' },
    rating: 4.6,
    stock: 12,
  },
  {
    id: 'p2',
    name: 'GameMaster X',
    description: 'High performance laptop for gaming and content creation.',
    price: 1499,
    category: 'laptops',
    image_url: '',
    brand: 'GameTech',
    specifications: { processor: 'AMD Ryzen 9', ram: '32GB', storage: '1TB SSD' },
    rating: 4.8,
    stock: 5,
  },
  {
    id: 'p3',
    name: 'Pocket Phone S',
    description: 'Compact smartphone with excellent camera.',
    price: 699,
    category: 'smartphones',
    image_url: '',
    brand: 'PhoneCo',
    specifications: { camera: '64MP', battery: '4000mAh' },
    rating: 4.4,
    stock: 20,
  },
  {
    id: 'p4',
    name: 'Studio Headphones',
    description: 'Audio gear with studio-quality sound.',
    price: 199,
    category: 'audio',
    image_url: '',
    brand: 'SoundLab',
    specifications: {},
    rating: 4.3,
    stock: 30,
  },
];

export async function listProducts() {
  await new Promise((r) => setTimeout(r, 120));
  return sampleProducts;
}

export async function invokeLLM({ prompt }) {
  // Local deterministic recommender based on keywords in the prompt.
  await new Promise((r) => setTimeout(r, 220));
  const lower = (prompt || '').toLowerCase();
  const recommended = [];
  if (lower.includes('video') || lower.includes('editing') || lower.includes('content')) {
    recommended.push('p2', 'p1');
  } else if (lower.includes('camera') || lower.includes('photo')) {
    recommended.push('p3');
  } else if (lower.includes('audio') || lower.includes('headphone')) {
    recommended.push('p4');
  } else if (lower.includes('smartphone') || lower.includes('phone') || lower.includes('mobile')) {
    recommended.push('p3');
  } else {
    recommended.push('p2', 'p1', 'p3');
  }

  return {
    recommended_product_ids: recommended,
    explanation:
      'Based on your description, these products match the requested features and budget. They offer a good balance of performance and value.',
    top_picks: recommended.slice(0, 3).map((id) => {
      const p = sampleProducts.find((x) => x.id === id);
      return p ? `${p.name} — ${p.brand}: ${p.description}` : id;
    }),
  };
}

export default {
  listProducts,
  invokeLLM,
  sampleProducts,
};
