'use server';
import { createClient } from '@/lib/supabase/server';
import type { UserProfile } from '@/types/numerology';

export async function actionSaveProfile(profile: UserProfile): Promise<boolean> {
  const supabase = await createClient();
  const { data: { user }, error: authErr } = await supabase.auth.getUser();

  if (authErr || !user) {
    console.error('[action:saveProfile] auth failed:', authErr?.message ?? 'no user');
    return false;
  }

  const { error } = await supabase
    .from('profiles')
    .upsert({
      id: user.id,
      name: profile.name,
      day: profile.day,
      month: profile.month,
      year: profile.year,
      updated_at: new Date().toISOString(),
    });

  if (error) {
    console.error('[action:saveProfile]', error.message, error.details);
    return false;
  }

  return true;
}
