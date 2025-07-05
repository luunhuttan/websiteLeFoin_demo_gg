const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const sampleReviews = [
  {
    productId: 1, // Body Lotion
    reviews: [
      {
        rating: 5,
        comment: 'Sản phẩm rất tốt! Mùi hương cam sả rất dễ chịu, da mình mềm mại hơn hẳn sau khi sử dụng.',
        userEmail: 'user1@example.com',
        firstName: 'Nguyễn',
        lastName: 'Thị Anh'
      },
      {
        rating: 4,
        comment: 'Chất lượng tốt, thẩm thấu nhanh. Mùi hương tự nhiên, không gây kích ứng da.',
        userEmail: 'user2@example.com',
        firstName: 'Trần',
        lastName: 'Văn Bình'
      },
      {
        rating: 5,
        comment: 'Đã dùng được 2 tháng, da sáng hơn và mịn màng hơn. Sẽ mua lại!',
        userEmail: 'user3@example.com',
        firstName: 'Lê',
        lastName: 'Minh Cường'
      }
    ]
  },
  {
    productId: 2, // Face Wash
    reviews: [
      {
        rating: 5,
        comment: 'Gel rửa mặt tạo bọt mịn, làm sạch sâu mà không gây khô da. Rất hài lòng!',
        userEmail: 'user4@example.com',
        firstName: 'Phạm',
        lastName: 'Thị Dung'
      },
      {
        rating: 4,
        comment: 'Sản phẩm tốt, giá cả hợp lý. Da mặt sạch và thoáng hơn sau khi rửa.',
        userEmail: 'user5@example.com',
        firstName: 'Hoàng',
        lastName: 'Văn Em'
      }
    ]
  },
  {
    productId: 3, // Hand Cream
    reviews: [
      {
        rating: 5,
        comment: 'Kem dưỡng da tay tuyệt vời! Thẩm thấu nhanh, không nhờn rít, mùi hương dễ chịu.',
        userEmail: 'user6@example.com',
        firstName: 'Vũ',
        lastName: 'Thị Phương'
      },
      {
        rating: 4,
        comment: 'Chất lượng tốt, dưỡng ẩm hiệu quả. Phù hợp cho da tay khô.',
        userEmail: 'user7@example.com',
        firstName: 'Đặng',
        lastName: 'Văn Giang'
      },
      {
        rating: 5,
        comment: 'Đã dùng nhiều loại hand cream nhưng đây là sản phẩm tốt nhất!',
        userEmail: 'user8@example.com',
        firstName: 'Bùi',
        lastName: 'Thị Hoa'
      }
    ]
  }
];

async function importSampleReviews() {
  try {
    console.log('Bắt đầu import đánh giá mẫu...');

    for (const productReview of sampleReviews) {
      console.log(`Đang thêm đánh giá cho sản phẩm ID: ${productReview.productId}`);
      
      for (const review of productReview.reviews) {
        // Tìm hoặc tạo user
        let user = await prisma.user.findUnique({
          where: { email: review.userEmail }
        });

        if (!user) {
          user = await prisma.user.create({
            data: {
              email: review.userEmail,
              password: '$2a$10$dummy.hash.for.sample.users',
              firstName: review.firstName,
              lastName: review.lastName,
              role: 'user'
            }
          });
          console.log(`Đã tạo user: ${review.userEmail}`);
        }

        // Tạo review
        await prisma.review.create({
          data: {
            userId: user.id,
            productId: productReview.productId,
            rating: review.rating,
            comment: review.comment,
            verified: true
          }
        });

        console.log(`Đã thêm đánh giá ${review.rating}⭐ cho sản phẩm ${productReview.productId}`);
      }
    }

    console.log('Import đánh giá mẫu hoàn thành!');
  } catch (error) {
    console.error('Lỗi khi import đánh giá:', error);
  } finally {
    await prisma.$disconnect();
  }
}

importSampleReviews(); 