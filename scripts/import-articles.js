const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const tagsPool = [
  'Làm đẹp', 'Chăm sóc da', 'Review', 'Thiên nhiên', 'Sức khỏe', 'Ưu đãi', 'Hướng dẫn', 'Mẹo hay', 'Sản phẩm mới', 'Chính hãng'
];

const articles = [
  // Bài dài
  {
    vi: {
      title: '5 bước chăm sóc da mặt cơ bản mỗi ngày',
      content: `<p><strong>Chăm sóc da mặt</strong> là thói quen không thể thiếu để giữ làn da khỏe mạnh, tươi sáng. Dưới đây là 5 bước cơ bản bạn nên thực hiện mỗi ngày:</p>
<ol>
<li><b>Làm sạch da</b>: Sử dụng sữa rửa mặt dịu nhẹ phù hợp với loại da để loại bỏ bụi bẩn, dầu thừa.</li>
<li><b>Tẩy tế bào chết</b>: 2-3 lần/tuần giúp da sáng mịn, hấp thu dưỡng chất tốt hơn.</li>
<li><b>Dưỡng ẩm</b>: Dùng kem dưỡng phù hợp để cấp ẩm, ngăn ngừa lão hóa.</li>
<li><b>Bảo vệ da</b>: Thoa kem chống nắng mỗi sáng, kể cả khi ở trong nhà.</li>
<li><b>Chế độ ăn uống, sinh hoạt lành mạnh</b>: Uống đủ nước, ăn nhiều rau xanh, ngủ đủ giấc.</li>
</ol>
<p>Kiên trì thực hiện, bạn sẽ thấy làn da cải thiện rõ rệt chỉ sau 1 tháng!</p>`
    },
    en: {
      title: '5 Basic Daily Skincare Steps',
      content: `<p><strong>Skincare</strong> is an essential routine to keep your skin healthy and radiant. Here are 5 basic steps you should do every day:</p>
<ol>
<li><b>Cleansing</b>: Use a gentle cleanser suitable for your skin type to remove dirt and excess oil.</li>
<li><b>Exfoliating</b>: 2-3 times/week to brighten skin and enhance absorption of nutrients.</li>
<li><b>Moisturizing</b>: Apply a suitable moisturizer to hydrate and prevent aging.</li>
<li><b>Protection</b>: Apply sunscreen every morning, even when indoors.</li>
<li><b>Healthy lifestyle</b>: Drink enough water, eat plenty of vegetables, get enough sleep.</li>
</ol>
<p>Be persistent and you will see noticeable improvement after just one month!</p>`
    },
    tags: ['Chăm sóc da', 'Hướng dẫn']
  },
  {
    vi: {
      title: 'Review kem dưỡng da tay Le Foin Cam Cam',
      content: `<p><b>Kem dưỡng da tay Le Foin Cam Cam</b> là sản phẩm nổi bật với chiết xuất cam tự nhiên, giúp dưỡng ẩm và làm mềm da hiệu quả. Sau 2 tuần sử dụng, mình cảm nhận rõ da tay mềm mịn, mùi hương dễ chịu, không bết dính.</p>
<ul>
<li>Ưu điểm: Thành phần thiên nhiên, thấm nhanh, giá hợp lý.</li>
<li>Nhược điểm: Chai nhỏ, dùng nhanh hết.</li>
</ul>
<p><i>Đánh giá cá nhân: 9/10. Rất đáng thử cho mùa đông!</i></p>`
    },
    en: {
      title: 'Review Le Foin Orange Hand Cream',
      content: `<p><b>Le Foin Orange Hand Cream</b> stands out with natural orange extract, providing effective moisture and softness. After 2 weeks, my hands feel smoother, the scent is pleasant, and it's non-sticky.</p>
<ul>
<li>Pros: Natural ingredients, quick absorption, reasonable price.</li>
<li>Cons: Small bottle, runs out quickly.</li>
</ul>
<p><i>Personal rating: 9/10. Worth trying for winter!</i></p>`
    },
    tags: ['Review', 'Chính hãng']
  },
  {
    vi: {
      title: 'Lợi ích của mỹ phẩm thiên nhiên',
      content: `<p><b>Mỹ phẩm thiên nhiên</b> ngày càng được ưa chuộng nhờ an toàn, lành tính và thân thiện với môi trường. Sử dụng sản phẩm thiên nhiên giúp giảm nguy cơ kích ứng, bảo vệ làn da lâu dài.</p>
<p>Le Foin cam kết mang đến các sản phẩm nguồn gốc rõ ràng, không chứa hóa chất độc hại, phù hợp cho mọi loại da, kể cả da nhạy cảm.</p>`
    },
    en: {
      title: 'Benefits of Natural Cosmetics',
      content: `<p><b>Natural cosmetics</b> are increasingly popular for their safety, gentleness, and eco-friendliness. Using natural products reduces irritation risks and protects your skin in the long run.</p>
<p>Le Foin is committed to providing products with clear origins, free from harmful chemicals, suitable for all skin types, even sensitive skin.</p>`
    },
    tags: ['Thiên nhiên', 'Sức khỏe']
  },
  {
    vi: {
      title: 'Ưu đãi tháng 7: Mua 1 tặng 1 toàn bộ sản phẩm',
      content: `<p><b>Chương trình ưu đãi lớn nhất tháng 7</b> từ Le Foin: <span style="color:#e53e3e;font-weight:bold">Mua 1 tặng 1</span> toàn bộ sản phẩm! Cơ hội tuyệt vời để trải nghiệm mỹ phẩm thiên nhiên chính hãng với giá siêu tiết kiệm.</p>
<p>Chỉ áp dụng khi đặt hàng tại Shopee Le Foin. Số lượng có hạn!</p>`
    },
    en: {
      title: 'July Promotion: Buy 1 Get 1 Free All Products',
      content: `<p><b>Le Foin's biggest July promotion</b>: <span style="color:#e53e3e;font-weight:bold">Buy 1 Get 1 Free</span> on all products! Great chance to try authentic natural cosmetics at a super saving price.</p>
<p>Only available on Shopee Le Foin. Limited quantity!</p>`
    },
    tags: ['Ưu đãi', 'Sản phẩm mới']
  },
  {
    vi: {
      title: 'Cách chọn sữa rửa mặt phù hợp từng loại da',
      content: `<p><b>Sữa rửa mặt</b> là bước quan trọng giúp làm sạch sâu, ngăn ngừa mụn. Để chọn đúng sản phẩm, bạn cần xác định loại da của mình:</p>
<ul>
<li><b>Da dầu:</b> Chọn loại kiểm soát nhờn, không chứa dầu khoáng.</li>
<li><b>Da khô:</b> Ưu tiên thành phần dưỡng ẩm như glycerin, hyaluronic acid.</li>
<li><b>Da nhạy cảm:</b> Chọn sản phẩm dịu nhẹ, không hương liệu.</li>
</ul>
<p>Hãy đọc kỹ thành phần và thử sản phẩm trước khi sử dụng lâu dài.</p>`
    },
    en: {
      title: 'How to Choose the Right Face Wash for Your Skin Type',
      content: `<p><b>Face wash</b> is essential for deep cleansing and acne prevention. To choose the right product, identify your skin type:</p>
<ul>
<li><b>Oily skin:</b> Choose oil-control, mineral oil-free types.</li>
<li><b>Dry skin:</b> Prefer moisturizing ingredients like glycerin, hyaluronic acid.</li>
<li><b>Sensitive skin:</b> Go for gentle, fragrance-free products.</li>
</ul>
<p>Always read the ingredients and patch test before long-term use.</p>`
    },
    tags: ['Hướng dẫn', 'Làm đẹp']
  },
  // Bài ngắn
  {
    vi: {
      title: 'Bí quyết dưỡng ẩm mùa hè',
      content: 'Dưỡng ẩm đúng cách giúp da không bị khô, bong tróc dù thời tiết nắng nóng. Hãy chọn kem dưỡng nhẹ, thấm nhanh và uống đủ nước mỗi ngày.'
    },
    en: {
      title: 'Summer Moisturizing Tips',
      content: 'Proper moisturizing keeps your skin from drying out or flaking even in hot weather. Choose a light, fast-absorbing moisturizer and drink enough water daily.'
    },
    tags: ['Làm đẹp']
  },
  {
    vi: {
      title: 'Sử dụng kem chống nắng đúng cách',
      content: 'Thoa kem chống nắng 15-20 phút trước khi ra ngoài, bôi lại sau mỗi 2-3 giờ để bảo vệ da tối ưu.'
    },
    en: {
      title: 'How to Use Sunscreen Properly',
      content: 'Apply sunscreen 15-20 minutes before going out, and reapply every 2-3 hours for optimal protection.'
    },
    tags: ['Chăm sóc da', 'Mẹo hay']
  },
  {
    vi: {
      title: 'Tẩy tế bào chết định kỳ',
      content: 'Tẩy tế bào chết 2 lần/tuần giúp da sáng mịn, hấp thu dưỡng chất tốt hơn.'
    },
    en: {
      title: 'Regular Exfoliation',
      content: 'Exfoliate twice a week to brighten your skin and enhance nutrient absorption.'
    },
    tags: ['Hướng dẫn']
  },
  {
    vi: {
      title: 'Lợi ích của mặt nạ thiên nhiên',
      content: 'Mặt nạ từ thiên nhiên như mật ong, sữa chua, bột yến mạch giúp dưỡng da an toàn, tiết kiệm.'
    },
    en: {
      title: 'Benefits of Natural Face Masks',
      content: 'Natural masks like honey, yogurt, and oatmeal help nourish your skin safely and economically.'
    },
    tags: ['Thiên nhiên', 'Mẹo hay']
  },
  {
    vi: {
      title: 'Ưu đãi đặc biệt tháng này',
      content: 'Mua hàng tại Shopee Le Foin để nhận nhiều voucher giảm giá, freeship và quà tặng hấp dẫn.'
    },
    en: {
      title: 'Special Offers This Month',
      content: 'Shop at Shopee Le Foin to get many discount vouchers, free shipping, and attractive gifts.'
    },
    tags: ['Ưu đãi']
  },
];

async function main() {
  // Lấy admin user
  const admin = await prisma.user.findFirst({ where: { role: 'admin' } });
  if (!admin) {
    console.error('Không tìm thấy user admin!');
    process.exit(1);
  }
  for (const art of articles) {
    const article = await prisma.article.create({
      data: {
        title: art.vi.title,
        content: art.vi.content,
        title_vi: art.vi.title,
        title_en: art.en.title,
        content_vi: art.vi.content,
        content_en: art.en.content,
        image: 'https://lefoin.vn/images/og-lefoin.jpg',
        authorId: admin.id,
      },
    });
    for (const tagName of art.tags) {
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
    console.log(`Đã tạo bài viết mẫu: ${art.vi.title}`);
  }
  await prisma.$disconnect();
}

main().catch(e => { console.error(e); process.exit(1); }); 