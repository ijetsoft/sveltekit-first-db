<script context="module" lang="ts">
    import { supabase } from "$lib/supabaseClient.js";
	let current;
    export function date2str(parmDate: any, y:any) {
    let x = new Date(parmDate);
    let z: any = {
        M: x.getMonth() + 1,
        d: x.getDate(),
        h: x.getHours(),
        m: x.getMinutes(),
        s: x.getSeconds()
    };
    y = y.replace(/(M+|d+|h+|m+|s+)/g, function (v: any) {
        return ((v.length > 1 ? "0" : "") + z[v.slice(-1)]).slice(-2)
    });
    return y.replace(/(y+)/g, function (v:any) {
        return x.getFullYear().toString().slice(-v.length)
    });
  }
  export function getVocabTextValue(parmVoc:any, parmName: string, parmVal: any) {
  let a =  parmVoc.find((item:any) => item.name == parmName);
   let vocQry = a.qry.data
   let nameKey = Object.entries(vocQry[0])[0][0]
   let nameVal = Object.entries(vocQry[0])[1][0]
   let vocabRecs = vocQry.find((itemV:any) => itemV[nameKey] === parmVal);
   let options:any = []
   let retVal = ''; 
       vocQry.forEach(el => {
           if (el[nameKey]===parmVal) retVal = el[nameVal]
       });
       //console.log(options)
       //retVal = vocabRecs[nameVal]
      return retVal
 }
export async function GetLastKey(parmTableName: string, parmKeyName: string) {
      const { data, error } = await supabase
        .from('Product')
        .select('Id')
        .order('Id', { ascending: false })
        .limit(1);
        let newKey = data[0]['Id']
        
     return newKey
  }
export async function Count(parmName: string) {
  const { count, error } = await supabase
  .from(parmName)
  .select('*', { count: 'exact', head: true })
  return count
}
export async function InsertDBRecord() {
      const { data, error } = await supabase
     .from('Product')
     .insert([
       { 'ProductName': '????***' } //, 'Id': 9999
     ])
     
     if (error) throw new Error(error.message); 
     console.log(data)
     return data
   }
</script>
