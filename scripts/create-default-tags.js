const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const defaultTags = [
  'Sản phẩm',
  'Câu chuyện',
  'Sống xanh',
];

async function main() {
  for (const name of defaultTags) {
    await prisma.tag.upsert({
      where: { name },
      update: {},
      create: { name },
    });
    console.log(`Đã tạo hoặc đã tồn tại tag: ${name}`);
  }
  await prisma.$disconnect();
}

main().catch(e => {
  console.error(e);
  prisma.$disconnect();
  process.exit(1);
}); 