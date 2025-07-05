const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const productsData = [
  {
    name: 'Sáng da, giảm viêm nang lông Cam Sả Body Lotion',
    description: 'Sữa dưỡng thể Lightening thẩm thấu nhanh, chiết xuất từ cam sả tự nhiên',
    price: 235000,
    image: '/mua-hang/body_lotion.png',
    category: 'Body Care',
    inStock: true,
  },
  {
    name: 'Gel rửa mặt tạo bọt SẠCH sâu SÁNG tự nhiên Face Wash',
    description: 'PureDetox OrangeFarm CamCam Facewash - Làm sạch sâu và sáng da',
    price: 115000,
    image: '/mua-hang/sua_rua_mat.png',
    category: 'Face Care',
    inStock: true,
  },
  {
    name: 'Kem dưỡng da tay Handcream Orange Farm',
    description: 'Dưỡng ẩm và bảo vệ da tay với chiết xuất cam tự nhiên',
    price: 115000,
    image: '/mua-hang/kem_duong_da_tay.png',
    category: 'Hand Care',
    inStock: true,
  },
  {
    name: 'Gel tắm giảm viêm nang lông Body Care Wash',
    description: 'Gel tắm tự nhiên giúp giảm viêm nang lông và làm sạch da',
    price: 175000,
    image: '/images/body-care-wash.jpg',
    category: 'Body Care',
    inStock: true,
  },
  {
    name: 'Túi Refill: Gel tắm nâng tông da, giảm viêm nang lông',
    description: 'Túi refill tiết kiệm cho gel tắm nâng tông da',
    price: 350000,
    image: '/images/refill-gel-tam.jpg',
    category: 'Body Care',
    inStock: true,
  },
  {
    name: 'ToeCream Kem dưỡng da chân FunToeLemongrass',
    description: 'Kem dưỡng da chân với hương sả tự nhiên',
    price: 315000,
    image: '/images/toecream-funtoe.jpg',
    category: 'Foot Care',
    inStock: true,
  },
];

async function importProducts() {
  try {
    console.log('Bắt đầu import sản phẩm...');

    // Clear existing products
    await prisma.product.deleteMany({});
    console.log('Đã xóa sản phẩm cũ');

    // Import new products
    for (const product of productsData) {
      await prisma.product.create({
        data: {
          name: product.name,
          description: product.description,
          price: product.price,
          image: product.image,
          category: product.category,
          inStock: product.inStock,
          updatedAt: new Date(),
        },
      });
      console.log(`Đã thêm sản phẩm: ${product.name}`);
    }

    console.log('Import sản phẩm hoàn thành!');
  } catch (error) {
    console.error('Lỗi khi import sản phẩm:', error);
  } finally {
    await prisma.$disconnect();
  }
}

importProducts(); 