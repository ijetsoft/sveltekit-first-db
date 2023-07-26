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
export async function GetLastKey() {
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
</script>
