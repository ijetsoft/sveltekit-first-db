import { supabase } from "$lib/supabaseClient.js";

  export async function load() {
    let data : any = {}
    let Product = await supabase.from("Product").select();
    let category = await supabase.from("Category").select("Id, CategoryName");
    let suppliers = await supabase.from("Supplier").select("Id, CompanyName");    
    let _Key = await supabase.from("Product").select("Id").order('Id', { ascending: false }) .limit(1);
    let lastKey : any = _Key.data[0]['Id']
    let voc = [{name:'CategoryId', qry:category}, 
               {name:'SupplierId', qry:suppliers}]
    
    data = {Product, voc, lastKey}
    
    return {
      db: data ?? [],
    };
  }
  /* async function GetLastKey() {
    let data = await supabase
      .from('Product')
      .select('Id')
      .order('Id', { ascending: false })
      .limit(1);
      lastKey = data[0]['Id']
      return data[0]['Id']
   return data
 } */
