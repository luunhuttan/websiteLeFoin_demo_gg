const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

// Danh sách password phổ biến để test
const commonPasswords = [
  'admin123',
  'password',
  '123456',
  'qwerty',
  'password123',
  'admin',
  'user123',
  'test123',
  '123456789',
  'abc123',
  'password1',
  'admin@123',
  'user@123',
  'test@123',
  '12345678',
  'qwerty123',
  'password@123',
  'admin@2024',
  'user@2024',
  'test@2024',
  // Thêm các password mới sau khi reset
  'user2123',
  'user3123'
];

async function checkPasswords() {
  try {
    // Lấy tất cả users
    const allUsers = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        password: true,
        role: true,
        firstName: true,
        lastName: true
      }
    });

    console.log('=== KIỂM TRA PASSWORD CỦA TẤT CẢ USERS ===\n');

    for (const user of allUsers) {
      console.log(`\n--- User: ${user.email} (${user.role}) ---`);
      console.log(`ID: ${user.id}`);
      console.log(`Name: ${user.firstName || ''} ${user.lastName || ''}`);
      
      let foundPassword = false;
      
      // Test với các password phổ biến
      for (const testPassword of commonPasswords) {
        try {
          const isValid = await bcrypt.compare(testPassword, user.password);
          if (isValid) {
            console.log(`✅ Password found: "${testPassword}"`);
            foundPassword = true;
            break;
          }
        } catch (error) {
          console.log(`❌ Error testing password "${testPassword}":`, error.message);
        }
      }
      
      if (!foundPassword) {
        console.log(`❌ Password not found in common passwords list`);
        console.log(`   Password hash: ${user.password.substring(0, 20)}...`);
      }
      
      console.log('---');
    }

    // Thống kê
    console.log('\n=== THỐNG KÊ ===');
    console.log(`Tổng số users: ${allUsers.length}`);
    console.log(`Admin users: ${allUsers.filter(u => u.role === 'admin').length}`);
    console.log(`Regular users: ${allUsers.filter(u => u.role === 'user').length}`);
    console.log(`Số password phổ biến đã test: ${commonPasswords.length}`);

  } catch (error) {
    console.error('Error checking passwords:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkPasswords(); 