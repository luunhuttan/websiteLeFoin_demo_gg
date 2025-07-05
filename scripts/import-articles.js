const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const articlesData = [
  {
    titleVi: 'Handcream Cam Cam - Dưỡng ẩm tự nhiên',
    titleEn: 'Handcream Cam Cam - Natural Moisturizer',
    excerptVi: 'Khám phá sản phẩm dưỡng ẩm chiết xuất cam tự nhiên, an toàn cho mọi loại da.',
    excerptEn: 'Discover the natural orange extract moisturizer, safe for all skin types.',
    image: '/images/handcream Cam Cam.png',
    categoryVi: 'Sản phẩm',
    categoryEn: 'Products',
  },
  {
    titleVi: 'Orange Farm - Trang trại cam sạch',
    titleEn: 'Orange Farm - Clean Orange Farm',
    excerptVi: 'Câu chuyện về trang trại cam hữu cơ và hành trình mang đến trái cam sạch cho mọi nhà.',
    excerptEn: 'The story of the organic orange farm and the journey to bring clean oranges to every home.',
    image: '/images/orange_farm background thơ mộng.jpg',
    categoryVi: 'Câu chuyện',
    categoryEn: 'Stories',
  },
  {
    titleVi: 'Làm việc hiệu quả với hương cam',
    titleEn: 'Work Effectively with Orange Scent',
    excerptVi: 'Hương cam giúp tinh thần sảng khoái, tăng hiệu suất làm việc mỗi ngày.',
    excerptEn: 'Orange scent refreshes your mind and boosts daily work performance.',
    image: '/images/handcream background làm việc.jpg',
    categoryVi: 'Sống xanh',
    categoryEn: 'Green Living',
  },
  {
    titleVi: 'Dầu olive và sức khỏe',
    titleEn: 'Olive Oil and Health',
    excerptVi: 'Khám phá lợi ích tuyệt vời của dầu olive nguyên chất cho sức khỏe và sắc đẹp.',
    excerptEn: 'Discover the amazing benefits of pure olive oil for health and beauty.',
    image: '/images/handcream nước.png',
    categoryVi: 'Sản phẩm',
    categoryEn: 'Products',
  },
  {
    titleVi: 'Rơm rạ trong nông nghiệp hữu cơ',
    titleEn: 'Straw in Organic Agriculture',
    excerptVi: 'Vai trò của rơm rạ trong canh tác bền vững và bảo vệ môi trường.',
    excerptEn: 'The role of straw in sustainable farming and environmental protection.',
    image: '/images/orange_farm trên kệ.jpg',
    categoryVi: 'Câu chuyện',
    categoryEn: 'Stories',
  },
  {
    titleVi: 'Tinh chất cam sành dưỡng da',
    titleEn: 'Orange Essence for Skin Care',
    excerptVi: 'Tinh chất cam sành giúp dưỡng sáng da, chống oxy hóa tự nhiên.',
    excerptEn: 'Orange essence helps brighten skin and provides natural antioxidants.',
    image: '/images/handcream background cam sành.png',
    categoryVi: 'Sản phẩm',
    categoryEn: 'Products',
  },
  {
    titleVi: 'Sống xanh cùng Le Foin',
    titleEn: 'Green Living with Le Foin',
    excerptVi: 'Những thói quen nhỏ giúp bạn sống xanh, bảo vệ môi trường mỗi ngày.',
    excerptEn: 'Small habits to help you live green and protect the environment every day.',
    image: '/images/handcream_camcam background chill.jpg',
    categoryVi: 'Sống xanh',
    categoryEn: 'Green Living',
  },
];

async function importArticles() {
  try {
    const admin = await prisma.user.findFirst({ where: { email: 'admin@lefoin.com' } });
    if (!admin) {
      console.error('Admin user not found!');
      process.exit(1);
    }
    for (const art of articlesData) {
      // Gộp title, excerpt, category thành 1 chuỗi JSON để lưu vào content
      const content = JSON.stringify({
        vi: { excerpt: art.excerptVi, category: art.categoryVi, image: art.image },
        en: { excerpt: art.excerptEn, category: art.categoryEn, image: art.image }
      });
      await prisma.article.create({
        data: {
          title: art.titleVi + ' / ' + art.titleEn,
          content,
          authorId: admin.id,
        }
      });
      console.log('Imported:', art.titleVi);
    }
    console.log('All articles imported!');
  } catch (e) {
    console.error('Error importing articles:', e);
  } finally {
    await prisma.$disconnect();
  }
}

importArticles(); 