import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const data = await req.formData();
  const file = data.get('file') as File;
  if (!file) return new Response(JSON.stringify({ error: 'No file uploaded' }), { status: 400 });

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Lấy thông tin Cloudinary từ biến môi trường
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    return new Response(JSON.stringify({ error: 'Cloudinary config missing' }), { status: 500 });
  }

  // Tạo form data để gửi lên Cloudinary
  const formData = new FormData();
  formData.append('file', new Blob([buffer]));
  formData.append('upload_preset', 'ml_default'); // Bạn có thể tạo upload preset riêng nếu muốn

  // Gửi request lên Cloudinary
  const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
  try {
    const res = await fetch(uploadUrl, {
      method: 'POST',
      body: formData,
    });
    const result = await res.json();
    if (result.secure_url) {
      return new Response(JSON.stringify({ url: result.secure_url }), { status: 200 });
    } else {
      // Log lỗi chi tiết ra console và trả về cho client
      console.error('Cloudinary upload error:', result);
      return new Response(JSON.stringify({ error: result.error?.message || 'Upload failed', detail: result }), { status: 500 });
    }
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Upload failed' }), { status: 500 });
  }
} 