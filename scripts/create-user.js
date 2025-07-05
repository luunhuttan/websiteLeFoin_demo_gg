const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function createTestUser() {
  try {
    // Kiểm tra xem đã có user test chưa
    const existingUser = await prisma.user.findFirst({
      where: { email: 'user@lefoin.com' }
    });

    if (existingUser) {
      console.log('Test user already exists:', existingUser.email);
      return;
    }

    // Tạo password hash
    const hashedPassword = await bcrypt.hash('user123', 10);

    // Tạo user test
    const testUser = await prisma.user.create({
      data: {
        email: 'user@lefoin.com',
        password: hashedPassword,
        role: 'user',
        firstName: 'Test',
        lastName: 'User'
      }
    });

    console.log('Test user created successfully:');
    console.log('Email:', testUser.email);
    console.log('Password: user123');
    console.log('Role:', testUser.role);

  } catch (error) {
    console.error('Error creating test user:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createTestUser(); 