import { NextRequest } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return new Response(JSON.stringify({ error: 'No file uploaded' }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Kiểm tra loại file
    if (!file.type.startsWith('image/')) {
      return new Response(JSON.stringify({ error: 'Invalid file type. Only images are allowed.' }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Kiểm tra kích thước file (5MB)
    if (file.size > 5 * 1024 * 1024) {
      return new Response(JSON.stringify({ error: 'File too large. Maximum size is 5MB.' }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = Date.now() + '-' + file.name.replace(/[^a-zA-Z0-9.]/g, '_');
    const imagesDir = path.join(process.cwd(), 'public', 'images');
    const filePath = path.join(imagesDir, filename);
    
    // Đảm bảo thư mục tồn tại
    try {
      await mkdir(imagesDir, { recursive: true });
    } catch (error) {
      console.error('Error creating images directory:', error);
    }
    
    await writeFile(filePath, buffer);
    const url = '/images/' + filename;
    
    return new Response(JSON.stringify({ url }), { 
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Upload error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
} 