import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get('content-type') || '';
    let reportData = null;

    if (contentType.includes('application/csp-report') || contentType.includes('application/json')) {
      reportData = await request.json();
    } else {
      const text = await request.text();
      try {
        reportData = JSON.parse(text);
      } catch {
        reportData = { raw: text };
      }
    }

    const cspReport = reportData['csp-report'] || reportData;

    console.warn('⚠️ CSP Violation Telemetry Received:', {
      documentURI: cspReport['document-uri'],
      blockedURI: cspReport['blocked-uri'],
      violatedDirective: cspReport['violated-directive'] || cspReport['effective-directive'],
      originalPolicy: cspReport['original-policy'],
    });

    return NextResponse.json({ status: 'received' }, { status: 200 });
  } catch (error: any) {
    console.error('Failed to process CSP report:', error);
    return NextResponse.json({ error: 'Invalid report' }, { status: 400 });
  }
}
