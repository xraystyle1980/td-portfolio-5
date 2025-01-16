import { NextResponse } from 'next/server';
import { readFileSync } from 'fs';
import { join } from 'path';

export async function GET() {
  try {
    // Read the PNG favicon
    const filePath = join(process.cwd(), 'public', 'favicon-32x32.png');
    const fileBuffer = readFileSync(filePath);

    // Return it with proper headers
    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (e) {
    return new NextResponse(null, { status: 404 });
  }
} 