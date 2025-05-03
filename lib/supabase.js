const { createClient } = require('@supabase/supabase-js');

// These environment variables need to be set in your .env.local file
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://fajfnlsdmmakzbginjav.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZhamZubHNkbW1ha3piZ2luamF2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYyOTcxODIsImV4cCI6MjA2MTg3MzE4Mn0.tUo4nSOHfsRqHM4ObfpvY3jTSljaO1ct5xccHzmqlf0';

// Create a single supabase client for interacting with your database
module.exports.supabase = createClient(supabaseUrl, supabaseAnonKey);
