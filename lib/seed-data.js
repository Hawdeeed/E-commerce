// This script can be used to seed your Supabase database with initial data
// Run this script with Node.js after setting up your Supabase credentials

const supabase = require('./supabase').supabase;



// Sample categories
const categories = [
  {
    name: 'Luxury Picks',
    description: 'Premium clothing for special occasions',
    image_url: '/images/categories/luxury.jpg'
  },
  {
    name: 'Lawn 2025',
    description: 'Latest lawn collection for 2025',
    image_url: '/images/categories/lawn.jpg'
  },
  {
    name: 'Casual Wear',
    description: 'Comfortable everyday clothing',
    image_url: '/images/categories/casual.jpg'
  }
];

// Sample products
const products = [
  {
    name: 'Embroidered Lawn Suit',
    description: 'Beautiful embroidered lawn suit with chiffon dupatta',
    price: 7500,
    sale_price: 6000,
    in_stock: true,
    featured: true,
    image_url: '/images/products/embroidered-lawn.jpg'
  },
  {
    name: 'Digital Print Shirt',
    description: 'Vibrant digital printed shirt with solid pants',
    price: 5500,
    sale_price: null,
    in_stock: true,
    featured: true,
    image_url: '/images/products/digital-print.jpg'
  },
  {
    name: 'Luxury Formal Dress',
    description: 'Elegant formal dress with intricate embroidery',
    price: 15000,
    sale_price: 12000,
    in_stock: true,
    featured: true,
    image_url: '/images/products/luxury-formal.jpg'
  },
  {
    name: 'Casual Cotton Suit',
    description: 'Comfortable cotton suit for everyday wear',
    price: 4500,
    sale_price: null,
    in_stock: true,
    featured: false,
    image_url: '/images/products/casual-cotton.jpg'
  },
  {
    name: 'Embellished Chiffon Dress',
    description: 'Beautiful chiffon dress with hand embellishments',
    price: 9500,
    sale_price: 8000,
    in_stock: true,
    featured: true,
    image_url: '/images/products/embellished-chiffon.jpg'
  }
];

// Sample product variants
const createProductVariants = (productId) => {
  return [
    {
      product_id: productId,
      name: 'Unstitched',
      sku: `${productId}-UNST`,
      size: 'Unstitched',
      in_stock: true
    },
    {
      product_id: productId,
      name: 'Small',
      sku: `${productId}-S`,
      size: 'Small',
      in_stock: true
    },
    {
      product_id: productId,
      name: 'Medium',
      sku: `${productId}-M`,
      size: 'Medium',
      in_stock: true
    },
    {
      product_id: productId,
      name: 'Large',
      sku: `${productId}-L`,
      size: 'Large',
      in_stock: true
    }
  ];
};

// Sample product images
const createProductImages = (productId, imageUrl) => {
  return [
    {
      product_id: productId,
      url: imageUrl,
      alt_text: 'Product image',
      is_primary: true
    },
    {
      product_id: productId,
      url: imageUrl.replace('.jpg', '-2.jpg'),
      alt_text: 'Product image 2',
      is_primary: false
    },
    {
      product_id: productId,
      url: imageUrl.replace('.jpg', '-3.jpg'),
      alt_text: 'Product image 3',
      is_primary: false
    }
  ];
};

async function seedDatabase() {
  console.log('Starting database seeding...');

  try {
    // Insert categories
    console.log('Inserting categories...');
    const { data: categoriesData, error: categoriesError } = await supabase
      .from('categories')
      .insert(categories)
      .select();

    if (categoriesError) {
      throw categoriesError;
    }

    console.log(`Inserted ${categoriesData.length} categories`);

    // Assign category IDs to products
    const productsWithCategories = products.map((product, index) => {
      // Distribute products across categories
      const categoryId = categoriesData[index % categoriesData.length].id;
      return { ...product, category_id: categoryId };
    });

    // Insert products
    console.log('Inserting products...');
    const { data: productsData, error: productsError } = await supabase
      .from('products')
      .insert(productsWithCategories)
      .select();

    if (productsError) {
      throw productsError;
    }

    console.log(`Inserted ${productsData.length} products`);

    // Insert product variants
    console.log('Inserting product variants...');
    const allVariants = productsData.flatMap(product => createProductVariants(product.id));
    
    const { data: variantsData, error: variantsError } = await supabase
      .from('product_variants')
      .insert(allVariants);

    if (variantsError) {
      throw variantsError;
    }

    console.log(`Inserted ${allVariants.length} product variants`);

    // Insert product images
    console.log('Inserting product images...');
    const allImages = productsData.flatMap(product => 
      createProductImages(product.id, product.image_url)
    );
    
    const { data: imagesData, error: imagesError } = await supabase
      .from('product_images')
      .insert(allImages);

    if (imagesError) {
      throw imagesError;
    }

    console.log(`Inserted ${allImages.length} product images`);

    console.log('Database seeding completed successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
}

// Run the seeding function
seedDatabase();
