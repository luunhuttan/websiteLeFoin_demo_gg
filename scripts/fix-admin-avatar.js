const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function fixAdminAvatar() {
  try {
    console.log('Checking admin users...');
    
    // Tìm tất cả admin users
    const adminUsers = await prisma.user.findMany({
      where: { role: 'admin' }
    });
    
    console.log(`Found ${adminUsers.length} admin users:`);
    
    for (const user of adminUsers) {
      console.log(`- ID: ${user.id}, Email: ${user.email}, Avatar: ${user.avatar || 'None'}`);
      
      // Nếu admin không có avatar, tạo một avatar mặc định
      if (!user.avatar) {
        await prisma.user.update({
          where: { id: user.id },
          data: { 
            avatar: `/images/1751360257771-Cam_banner_Le_Foin_logo.png`
          }
        });
        console.log(`  ✅ Updated avatar for admin ${user.email}`);
      }
    }
    
    // Kiểm tra tất cả users có avatar null
    const usersWithoutAvatar = await prisma.user.findMany({
      where: { avatar: null }
    });
    
    console.log(`\nFound ${usersWithoutAvatar.length} users without avatar:`);
    
    for (const user of usersWithoutAvatar) {
      console.log(`- ID: ${user.id}, Email: ${user.email}, Role: ${user.role}`);
      
      // Tạo avatar mặc định cho tất cả users không có avatar
      await prisma.user.update({
        where: { id: user.id },
        data: { 
          avatar: `/images/1751360257771-Cam_banner_Le_Foin_logo.png`
        }
      });
      console.log(`  ✅ Updated avatar for user ${user.email}`);
    }
    
    console.log('\n✅ All avatar issues fixed!');
    
  } catch (error) {
    console.error('Error fixing admin avatar:', error);
  } finally {
    await prisma.$disconnect();
  }
}

fixAdminAvatar(); 