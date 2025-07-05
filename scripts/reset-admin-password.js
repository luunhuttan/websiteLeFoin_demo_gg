const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function resetAdminPassword() {
  const hash = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.update({
    where: { email: 'admin@lefoin.com' },
    data: { password: hash }
  });
  console.log('Admin password reset!');
  await prisma.$disconnect();
}

resetAdminPassword(); 