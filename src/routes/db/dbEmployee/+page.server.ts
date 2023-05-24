import { supabase } from "$lib/supabaseClient.js";

  export async function load() {
    let { data } : any = {}
    let employee = await supabase.from("Employee").select();
    let reportsTo = await supabase.from("Employee").select("Id, LastName");
    let voc = [{name:'ReportsTo', qry:reportsTo}]
    data = {employee, voc}
        return {
      db: data ?? [],
    };
  }
