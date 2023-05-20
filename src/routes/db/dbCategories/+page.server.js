import { supabase } from "$lib/supabaseClient.js";

  export async function load() {
    let { data } : any = {};
    let x = await supabase.from("Category").select();
    let y = await supabase.from("Product").select();
     data  = {x, y};
    //const { data } = await supabase.from('select "Id" AS _Key, "CategoryName" AS _Value from "Category" as CategoryId').select();
    return {
      categories: data1 ?? [],
      CategoryID: data ?? [],

    };
  }
