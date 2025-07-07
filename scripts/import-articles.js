const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const tagsPool = [
  'Làm đẹp', 'Chăm sóc da', 'Review', 'Thiên nhiên', 'Sức khỏe', 'Ưu đãi', 'Hướng dẫn', 'Mẹo hay', 'Sản phẩm mới', 'Chính hãng'
];

const longContent = `
Le Foin là thương hiệu mỹ phẩm thiên nhiên nổi bật với các sản phẩm an toàn cho làn da Việt. Chúng tôi cam kết mang đến chất lượng vượt trội, nguồn gốc rõ ràng và dịch vụ tận tâm.\n\nBài viết này sẽ phân tích chi tiết về các thành phần tự nhiên trong sản phẩm, lợi ích khi sử dụng lâu dài và những phản hồi tích cực từ khách hàng.\n\n1. Thành phần thiên nhiên\n2. Quy trình sản xuất hiện đại\n3. Cam kết chất lượng\n4. Ưu đãi hấp dẫn\n5. Hướng dẫn sử dụng hiệu quả\n\nHãy cùng khám phá lý do vì sao Le Foin được hàng ngàn khách hàng tin dùng!\n\n... (bài viết dài mẫu) ...`;

const shortContent = `
Le Foin - Mỹ phẩm thiên nhiên an toàn, chất lượng cho làn da Việt. Đặt hàng ngay tại Shopee để nhận ưu đãi!\n\n... (bài viết ngắn mẫu) ...`;

async function main() {
  for (let i = 1; i <= 10; i++) {
    const isLong = i <= 5;
    const titleVi = isLong ? `Bài báo dài mẫu số ${i}` : `Bài báo ngắn mẫu số ${i-5}`;
    const titleEn = isLong ? `Sample Long Article ${i}` : `Sample Short Article ${i-5}`;
    const contentVi = isLong ? longContent : shortContent;
    const contentEn = isLong ? longContent : shortContent;
    const image = 'https://lefoin.vn/images/og-lefoin.jpg';
    // Random 2-3 tags
    const shuffled = tagsPool.sort(() => 0.5 - Math.random());
    const tags = shuffled.slice(0, Math.floor(Math.random() * 2) + 2);

    // Tạo bài viết
    const article = await prisma.article.create({
      data: {
        title: titleVi,
        content: contentVi,
        title_vi: titleVi,
        title_en: titleEn,
        content_vi: contentVi,
        content_en: contentEn,
        image,
        authorId: 1,
      },
    });

    // Gán tag
    for (const tagName of tags) {
      let tag = await prisma.tag.findUnique({ where: { name: tagName } });
      if (!tag) {
        tag = await prisma.tag.create({ data: { name: tagName } });
      }
      await prisma.articletag.create({
        data: {
          articleId: article.id,
          tagId: tag.id,
        },
      });
    }
    console.log(`Đã tạo bài viết mẫu: ${titleVi}`);
  }
  await prisma.$disconnect();
}

main().catch(e => { console.error(e); process.exit(1); }); 