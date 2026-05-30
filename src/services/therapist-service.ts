import { supabase } from '@/lib/supabase';
import { Database } from '@/types/database';

export type Therapist = Database['public']['Tables']['therapists']['Row'];

export async function getTherapists(searchQuery?: string) {
  let query = supabase
    .from('therapists')
    .select('*')
    .order('full_name', { ascending: true });

  if (searchQuery) {
    // Search in full_name or specializations (array search)
    query = query.or(`full_name.ilike.%${searchQuery}%,specialization.cs.{${searchQuery}}`);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching therapists:', error);
    return [];
  }

  return data as Therapist[];
}
