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
export function getVocabTextValue(parmVoc:any, parmFldName: string, parmFldVal: any) {
  let a =  parmVoc.find((item:any) => item.name == parmFldName);
   let vocQry = a.qry.data
   let nameKey = Object.entries(vocQry[0])[0][0]
   let nameVal = Object.entries(vocQry[0])[1][0]
   let vocabRecs = vocQry.find((itemV:any) => itemV[nameKey] === parmFldVal);
   let options:any = []
   let retVal = ''; 
       vocQry.forEach(el => {
           if (el[nameKey]===parmFldVal) retVal = el[nameVal]
       });
       //console.log(options)
       //retVal = vocabRecs[nameVal]
      return retVal
}
export async function GetLastKey(parmTableName: string, parmKeyName: string) {
      const { data, error } = await supabase
        .from(parmTableName)
        .select(parmKeyName)
        .order(parmKeyName, { ascending: false })
        .limit(1);
        let newKey = data[0][parmKeyName]
        
     return newKey
  }
export async function Count(parmTableName: string) {
  const { count, error } = await supabase
  .from(parmTableName)
  .select('*', { count: 'exact', head: true })
  return count
}
export async function GetRecordDB(nameTable: string, nameKeyTable: string, parmKeyValue: any) {
   const { data, error } = await supabase
  .from(nameTable)
  .select()
  .eq(nameKeyTable, parmKeyValue)
  if (error) throw new Error(error.message); 
  //console.log(data)
  return data
}

export async function GetRangeRecordDB(nameTable: string, nameKeyTable: string, parmStep: any) {
  const { data, error } = await supabase
  .from(nameTable)
  .select()
  .range(parmStep, parmStep+1000)
  if (error) throw new Error(error.message); 
  //console.log(data)
  return data
}

export async function UpdateDBRecord(
  nameTable: string, nameKeyTable: string, 
  parmKeyValue: any, parmMap: any) {
    //alert('UpdateDBRecord: '+JSON.stringify([...parmMap]))
    let parm: any = {}
    parmMap.forEach((value, key, map) => {
      parm[key] = value
      //alert(`${key}: ${value}`); 
    });
  const { data, error } = await supabase
    .from(nameTable)
    .update(parm)
    .eq(nameKeyTable, parmKeyValue)
    .select()
    return data
}

export async function DeleteDBRecord(
  nameTable: string, nameKeyTable: string, 
  parmKeyValue: any) {
   const { error } = await supabase
    .from(nameTable)
    .delete()
    .eq(nameKeyTable, parmKeyValue)
}
export async function InsertDBRecord(
  nameTable: string, nameKeyTable: string, 
  parmKeyValue: any, parmMap: any) 
  {
    let parm: any = {}
    parm[nameKeyTable] = parmKeyValue
    parmMap.forEach((value, key, map) => {
      parm[key] = value
      //alert(`${key}: ${value}`); 
    });

 /*    let arr = [nameKeyTable, parmKeyValue]
    arr = [...parmMap].map(([name, value]) => ({ name, value })); */
    //alert('InsertDBRecord: '+JSON.stringify(parm))
    //alert('InsertDBRecord: '+JSON.stringify([...parmMap]))
          
    const { data, error } = await supabase
     .from(nameTable)
     .insert(parm)
     .select()
/*      .insert([
       { 'ProductName': '???? ***' , 'Id': parmKeyValue}
     ])
 */     
     if (error) throw new Error(error.message); 
     console.log(data)
     return data
   }
</script>
