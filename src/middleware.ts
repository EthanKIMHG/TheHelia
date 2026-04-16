import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { SITE_URL } from '@/lib/site'

const LEGACY_HOSTS = new Set(['the-helia.vercel.app'])

export function middleware(request: NextRequest): NextResponse {
  const requestHost = request.headers.get('host')?.split(':')[0]

  if (requestHost && LEGACY_HOSTS.has(requestHost)) {
    const redirectUrl = new URL(
      `${request.nextUrl.pathname}${request.nextUrl.search}`,
      SITE_URL
    )

    return NextResponse.redirect(redirectUrl, 308)
  }

  return NextResponse.next()
}
