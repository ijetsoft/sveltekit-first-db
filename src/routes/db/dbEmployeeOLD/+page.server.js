import { supabase } from "$lib/supabaseClient";

  export async function load() {
    const { data } = await supabase.from("Employee").select();
    return {
      Employees: data ?? [],
    };
  }
