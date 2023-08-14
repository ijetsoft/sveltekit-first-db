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

export async function GetRangeRecordDB(nameTable: string, parmStep: any, parmCurrStep: any) {
  let end = (parmCurrStep+1)*parmStep+1+parmStep;
  //alert('range: form '+((parmCurrStep+1)*parmStep+1)+' to ' + end)
  const { data, error } = await supabase
  .from(nameTable)
  .select()
  .range((parmCurrStep+1)*parmStep+1, end)
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
export function getSVG(parmName: string, parmColor: string, parmText: string='') {
 switch (parmName) {
  case 'pointer':
    return '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 256 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z"/></svg>'   
    break;
 
  default:
    break;
 }
 /* let txt = '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 256 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z"/></svg>'
 return txt //parser.parseFromString(txt, 'text/html');
 */
}
</script>
