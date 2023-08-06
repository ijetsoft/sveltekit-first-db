import { supabase } from "$lib/supabaseClient.js";

  export async function load() {
    let { data } : any = {}
    let Employee = await supabase.from("Employee").select();
    let reportsTo = await supabase.from("Employee").select("Id, LastName");
    let voc = [{name:'ReportsTo', qry:reportsTo}]
    data = {Employee, voc}
        return {
      db: data ?? [],
    };
  }
