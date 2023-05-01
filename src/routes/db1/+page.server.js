import { supabase } from "$lib/supabaseClient.js";

  export async function load() {
    const { data } = await supabase.from("countries").select();
    return {
      countries: data ?? [],
    };
  }
