const { SUPABASE_URL, SUPABASE_ANON_KEY } = require('@/app/share/config');
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = SUPABASE_URL;
const supabaseAnonKey = SUPABASE_ANON_KEY;

module.exports.supabase = createClient(supabaseUrl, supabaseAnonKey);
