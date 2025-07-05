const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function checkUsers() {
  try {
    // Lấy tất cả users
    const allUsers = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        role: true,
        firstName: true,
        lastName: true,
        createdAt: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    console.log('=== TỔNG QUAN USERS ===');
    console.log(`Tổng số users: ${allUsers.length}`);
    
    // Phân loại theo role
    const adminUsers = allUsers.filter(user => user.role === 'admin');
    const regularUsers = allUsers.filter(user => user.role === 'user');
    const otherRoles = allUsers.filter(user => user.role !== 'admin' && user.role !== 'user');

    console.log(`\n=== PHÂN LOẠI THEO ROLE ===`);
    console.log(`Admin users: ${adminUsers.length}`);
    console.log(`Regular users: ${regularUsers.length}`);
    console.log(`Other roles: ${otherRoles.length}`);

    // Hiển thị chi tiết admin users
    if (adminUsers.length > 0) {
      console.log('\n=== ADMIN USERS ===');
      adminUsers.forEach(user => {
        console.log(`ID: ${user.id} | Email: ${user.email} | Name: ${user.firstName || ''} ${user.lastName || ''} | Created: ${user.createdAt}`);
      });
    }

    // Hiển thị chi tiết regular users
    if (regularUsers.length > 0) {
      console.log('\n=== REGULAR USERS ===');
      regularUsers.forEach(user => {
        console.log(`ID: ${user.id} | Email: ${user.email} | Name: ${user.firstName || ''} ${user.lastName || ''} | Created: ${user.createdAt}`);
      });
    }

    // Hiển thị users với role khác
    if (otherRoles.length > 0) {
      console.log('\n=== OTHER ROLES ===');
      otherRoles.forEach(user => {
        console.log(`ID: ${user.id} | Email: ${user.email} | Role: ${user.role} | Name: ${user.firstName || ''} ${user.lastName || ''} | Created: ${user.createdAt}`);
      });
    }

    // Thống kê theo thời gian
    const now = new Date();
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    const recentUsers = allUsers.filter(user => new Date(user.createdAt) > oneWeekAgo);
    const monthlyUsers = allUsers.filter(user => new Date(user.createdAt) > oneMonthAgo);

    console.log('\n=== THỐNG KÊ THEO THỜI GIAN ===');
    console.log(`Users tạo trong 7 ngày qua: ${recentUsers.length}`);
    console.log(`Users tạo trong 30 ngày qua: ${monthlyUsers.length}`);

  } catch (error) {
    console.error('Error checking users:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkUsers(); 