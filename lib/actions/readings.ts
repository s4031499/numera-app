'use server';
import { createClient } from '@/lib/supabase/server';
import type { SavedReading, NumerologyNumbers, Relationship } from '@/types/numerology';

export async function actionSaveReading(
  name: string,
  day: number,
  month: number,
  year: number,
  relationship: Relationship,
  numbers: NumerologyNumbers,
): Promise<SavedReading | null> {
  const supabase = await createClient();
  const { data: { user }, error: authErr } = await supabase.auth.getUser();

  if (authErr || !user) {
    console.error('[action:saveReading] auth failed:', authErr?.message ?? 'no user');
    return null;
  }

  const { data, error } = await supabase
    .from('saved_readings')
    .insert({ user_id: user.id, name, day, month, year, relationship, numbers })
    .select()
    .single();

  if (error) {
    console.error('[action:saveReading] insert error:', error.message, error.details);
    return null;
  }

  return {
    id: data.id,
    name: data.name,
    day: data.day,
    month: data.month,
    year: data.year,
    relationship: data.relationship,
    numbers: data.numbers,
    savedAt: data.saved_at,
  };
}

export async function actionGetSavedReadings(): Promise<SavedReading[]> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const { data, error } = await supabase
    .from('saved_readings')
    .select('*')
    .order('saved_at', { ascending: false });

  if (error) {
    console.error('[action:getSavedReadings]', error.message);
    return [];
  }

  return (data ?? []).map(row => ({
    id: row.id,
    name: row.name,
    day: row.day,
    month: row.month,
    year: row.year,
    relationship: row.relationship,
    numbers: row.numbers,
    savedAt: row.saved_at,
  }));
}

export async function actionGetSavedReading(id: string): Promise<SavedReading | null> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data, error } = await supabase
    .from('saved_readings')
    .select('*')
    .eq('id', id)
    .eq('user_id', user.id)
    .single();

  if (error || !data) return null;

  return {
    id: data.id,
    name: data.name,
    day: data.day,
    month: data.month,
    year: data.year,
    relationship: data.relationship,
    numbers: data.numbers,
    savedAt: data.saved_at,
  };
}

export async function actionDeleteReading(id: string): Promise<void> {
  const supabase = await createClient();
  const { error } = await supabase.from('saved_readings').delete().eq('id', id);
  if (error) console.error('[action:deleteReading]', error.message);
}

export async function actionIsAlreadySaved(
  name: string,
  day: number,
  month: number,
  year: number,
): Promise<boolean> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return false;

  const { count, error } = await supabase
    .from('saved_readings')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', user.id)
    .eq('name', name)
    .eq('day', day)
    .eq('month', month)
    .eq('year', year);

  if (error) return false;
  return (count ?? 0) > 0;
}
