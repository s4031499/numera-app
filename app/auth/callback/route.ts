import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      // Kiểm tra user đã có profile chưa
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('name')
          .eq('id', user.id)
          .single();

        // Có profile → vào dashboard; chưa có → nhập thông tin
        const redirectPath =
          profile?.name ? '/dashboard' : '/input';
        return NextResponse.redirect(`${origin}${redirectPath}`);
      }
    }
  }

  // Lỗi → về welcome
  return NextResponse.redirect(`${origin}/welcome`);
}
