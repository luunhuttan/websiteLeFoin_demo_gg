const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function checkArticles() {
  try {
    console.log('Checking articles in database...');
    
    const articles = await prisma.article.findMany({
      include: {
        user: true,
        articletag: true
      },
      orderBy: { createdAt: 'desc' }
    });
    
    console.log(`Found ${articles.length} articles:`);
    
    articles.forEach((article, index) => {
      console.log(`\n${index + 1}. Article ID: ${article.id}`);
      console.log(`   Title: ${article.title}`);
      console.log(`   Content: ${article.content.substring(0, 100)}...`);
      console.log(`   Created: ${article.createdAt}`);
      console.log(`   Author: ${article.author ? article.author.email : 'No author'}`);
    });
    
    // Check users
    const users = await prisma.user.findMany();
    console.log(`\nFound ${users.length} users:`);
    users.forEach(user => {
      console.log(`- ID: ${user.id}, Email: ${user.email}, Role: ${user.role}`);
    });
    
  } catch (error) {
    console.error('Error checking articles:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkArticles(); 