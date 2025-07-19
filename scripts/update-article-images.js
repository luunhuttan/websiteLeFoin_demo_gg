const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Danh sách hình ảnh đa dạng từ thư mục public/images
const diverseImages = [
  '/images/1751360257771-Cam_banner_Le_Foin_logo.png',
  '/images/1751702925959-DSC_6440.JPG',
  '/images/1751358606630-camcam.jpg',
  '/images/1751357595794-camcam.jpg',
  '/images/1751348531145-romrom.jpg',
  '/images/handcream background bình hoa.jpg',
  '/images/handcream background cam sành đã add logo.png',
  '/images/handcream background cam sành.png',
  '/images/handcream background làm việc.jpg',
  '/images/handcream Cam Cam đã add logo chính hãng. Trắng trơn.png',
  '/images/handcream Cam Cam.png',
  '/images/handcream nước.png',
  '/images/handcream_camcam background ấm áp.jpg',
  '/images/handcream_camcam background chill.jpg',
  '/images/handcream_camcam background đọc sách.jpg',
  '/images/orange_farm background ấm áp.jpg',
  '/images/orange_farm background thơ mộng.jpg',
  '/images/orange_farm trên kệ.jpg',
  '/images/ảnh handcream cam cam.jpg'
];

async function updateArticleImages() {
  try {
    console.log('Updating articles with diverse images...');
    
    // Lấy tất cả bài viết
    const articles = await prisma.article.findMany({
      orderBy: { createdAt: 'desc' }
    });
    
    console.log(`Found ${articles.length} articles to update`);
    
    // Cập nhật từng bài viết với hình ảnh khác nhau
    for (let i = 0; i < articles.length; i++) {
      const article = articles[i];
      const imageIndex = i % diverseImages.length;
      const selectedImage = diverseImages[imageIndex];
      
      await prisma.article.update({
        where: { id: article.id },
        data: { image: selectedImage }
      });
      
      console.log(`Updated article ${article.id} (${article.title}) with image: ${selectedImage}`);
    }
    
    console.log('✅ All articles updated successfully!');
    
  } catch (error) {
    console.error('Error updating articles:', error);
  } finally {
    await prisma.$disconnect();
  }
}

updateArticleImages(); 