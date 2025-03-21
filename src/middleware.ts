import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  // console.log('🔥 Middleware сработал!');
  const lang = req.cookies.get('harmonie_lang')?.value || 'uk'; // Язык из cookies или 'en' по умолчанию

  // Если cookie нет, создаём его
  if (!req.cookies.has('harmonie_lang')) {
    const res = NextResponse.next();
    res.cookies.set('harmonie_lang', lang, {
      path: '/',
      maxAge: 60 * 60 * 24 * 365, // Год хранения
    });
    return res;
  }
  return NextResponse.next();
}

export const config = {
  matcher: '/', // Работает для всех страниц?
};

// export const config = { matcher: '/:path*' }; // вообще для всех
