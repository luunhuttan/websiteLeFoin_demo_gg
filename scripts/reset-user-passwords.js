const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function resetUserPasswords() {
  try {
    // Lấy tất cả users
    const allUsers = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        role: true,
        firstName: true,
        lastName: true
      }
    });

    console.log('=== RESET PASSWORD CHO TẤT CẢ USERS ===\n');

    for (const user of allUsers) {
      console.log(`\n--- User: ${user.email} (${user.role}) ---`);
      console.log(`ID: ${user.id}`);
      console.log(`Name: ${user.firstName || ''} ${user.lastName || ''}`);
      
      // Tạo password mới dựa trên role
      let newPassword;
      if (user.role === 'admin') {
        newPassword = 'admin123';
      } else {
        // Tạo password cho user thường: user + ID
        newPassword = `user${user.id}123`;
      }
      
      // Hash password mới
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      
      // Cập nhật password trong database
      await prisma.user.update({
        where: { id: user.id },
        data: { password: hashedPassword }
      });
      
      console.log(`✅ Password reset thành công: "${newPassword}"`);
      console.log('---');
    }

    // Hiển thị tổng kết
    console.log('\n=== TỔNG KẾT PASSWORD MỚI ===');
    for (const user of allUsers) {
      if (user.role === 'admin') {
        console.log(`Admin (${user.email}): admin123`);
      } else {
        console.log(`User (${user.email}): user${user.id}123`);
      }
    }

    console.log('\n=== THỐNG KÊ ===');
    console.log(`Tổng số users đã reset: ${allUsers.length}`);
    console.log(`Admin users: ${allUsers.filter(u => u.role === 'admin').length}`);
    console.log(`Regular users: ${allUsers.filter(u => u.role === 'user').length}`);

  } catch (error) {
    console.error('Error resetting passwords:', error);
  } finally {
    await prisma.$disconnect();
  }
}

resetUserPasswords(); 