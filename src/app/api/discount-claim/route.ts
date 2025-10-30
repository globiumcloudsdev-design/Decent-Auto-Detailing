import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'claimedIps.json');

export async function GET(request: NextRequest) {
  try {
    // Get client IP - handle multiple headers for different hosting providers
    const forwarded = request.headers.get('x-forwarded-for');
    const realIp = request.headers.get('x-real-ip');
    const vercelForwarded = request.headers.get('x-vercel-forwarded-for');
    const clientIp = forwarded?.split(',')[0] || realIp || vercelForwarded || 'unknown';

    // Read claimed IPs from file
    let claimedIps: string[] = [];
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf8');
      claimedIps = JSON.parse(data);
    }

    // Check if IP has claimed
    const hasClaimed = claimedIps.includes(clientIp);

    return NextResponse.json({ claimed: hasClaimed });
  } catch (error) {
    console.error('Error checking discount:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP - handle multiple headers for different hosting providers
    const forwarded = request.headers.get('x-forwarded-for');
    const realIp = request.headers.get('x-real-ip');
    const vercelForwarded = request.headers.get('x-vercel-forwarded-for');
    const clientIp = forwarded?.split(',')[0] || realIp || vercelForwarded || 'unknown';

    // Read claimed IPs from file
    let claimedIps: string[] = [];
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf8');
      claimedIps = JSON.parse(data);
    }

    // Add IP if not already claimed
    if (!claimedIps.includes(clientIp)) {
      claimedIps.push(clientIp);
      fs.writeFileSync(filePath, JSON.stringify(claimedIps, null, 2));
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error claiming discount:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
