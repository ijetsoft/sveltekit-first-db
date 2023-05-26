import { supabase } from "$lib/supabaseClient.js";

  export async function load() {
    let data : any = {}
    let product = await supabase.from("Product").select();
    let category = await supabase.from("Category").select("Id, CategoryName");
    let suppliers = await supabase.from("Supplier").select("Id, CompanyName");    
    let voc = [{name:'CategoryId', qry:category}, {name:'SupplierId', qry:suppliers}]
    data = {product, voc}
    //data = {category, product, voc}
    return {
      db: data ?? [],
    };
  }
