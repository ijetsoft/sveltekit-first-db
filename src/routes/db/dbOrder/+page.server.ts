import { supabase } from "$lib/supabaseClient.js";

  export async function load() {
    let data : any = {}
    let order = await supabase.from("Order").select();
    let menager = await supabase.from("Employee").select("Id, LastName");
    //let suppliers = await supabase.from("Supplier").select("Id, CompanyName");    
    let voc = [{name:'EmployeeId', qry:menager}]
    data = {order, voc}
    return {
      db: data ?? [],
    };
  }