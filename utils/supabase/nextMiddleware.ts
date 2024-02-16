import { NextRequest, NextResponse } from 'next/server';
import { createMiddlewareSupabaseClient } from '@supabase/auth-helpers-nextjs';

export async function middleware(req: NextRequest) {
    const supabase = createMiddlewareSupabaseClient({ req, res: NextResponse.next() });
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
        // Redirect to login if no session exists
        const redirectUrl = req.nextUrl.clone();
        redirectUrl.pathname = '/login';
        return NextResponse.redirect(redirectUrl);
    }

    // Continue to the requested route if a session exists
    return NextResponse.next();
}

export const config = {
    matcher: ['/protected/*'],
};