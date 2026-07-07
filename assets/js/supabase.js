const SUPABASE_URL = "https://YOUR-PROJECT-ID.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_YOUR_KEY_HERE";

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);