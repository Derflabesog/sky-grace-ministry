const SUPABASE_URL = "https://mkdngtbrwuwleacezude.supabase.co";

const SUPABASE_ANON_KEY = "sb_publishable_gNDowcDvO1Y4KUS4iaw4eA_VLES7dEC";

const supabaseClient = supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
);