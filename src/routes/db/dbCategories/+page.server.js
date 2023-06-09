import { supabase } from "$lib/supabaseClient.js";

  export async function load() {
    const { data } = await supabase.from("Category").select();
    return {
      categories: data ?? [],
    };
  }
