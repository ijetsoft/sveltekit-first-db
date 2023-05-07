import { supabase } from "$lib/supabaseClient.js";

  export async function load() {
    const { data } = await supabase.from("Employee").select();
    return {
      Employees: data ?? [],
    };
  }
