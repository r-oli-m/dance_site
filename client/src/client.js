import { createClient } from '@supabase/supabase-js'

const URL = 'https://kurejkqumpseqlhtbkdz.supabase.co';
const API_KEY = meta.env.VITE_SUPABASE_KEY;
export const supabase = createClient(URL, API_KEY);
