const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function createAdminUser() {
  try {
    // Kiểm tra xem đã có admin chưa
    const existingAdmin = await prisma.user.findFirst({
      where: { role: 'admin' }
    });

    if (existingAdmin) {
      console.log('Admin user already exists:', existingAdmin.email);
      return;
    }

    // Tạo password hash
    const hashedPassword = await bcrypt.hash('admin123', 10);

    // Tạo user admin
    const adminUser = await prisma.user.create({
      data: {
        email: 'admin@lefoin.com',
        password: hashedPassword,
        role: 'admin',
        firstName: 'Admin',
        lastName: 'LeFoin',
        updatedAt: new Date(),
      }
    });

    console.log('Admin user created successfully:');
    console.log('Email:', adminUser.email);
    console.log('Password: admin123');
    console.log('Role:', adminUser.role);

  } catch (error) {
    console.error('Error creating admin user:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createAdminUser(); 