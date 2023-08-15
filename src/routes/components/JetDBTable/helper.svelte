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
export function getSVG(parmName: string, parmColor: string='yellow', parmText: string='') {
 let pattern = '<button class="navibtn" title="'+parmText+'" on:click={myFirst}>'
 switch (parmName) {
  case 'pointer':
    return '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 256 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z"/></svg>'   
    break;
  case 'FirstRecord':
    return '<svg class="my_svg" fill="'+parmColor+'" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M267.5 440.6c9.5 7.9 22.8 9.7 34.1 4.4s18.4-16.6 18.4-29V96c0-12.4-7.2-23.7-18.4-29s-24.5-3.6-34.1 4.4l-192 160L64 241V96c0-17.7-14.3-32-32-32S0 78.3 0 96V416c0 17.7 14.3 32 32 32s32-14.3 32-32V271l11.5 9.6 192 160z"/></svg>'   
    break;
  case 'PrevPage':
    return '<svg class="my_svg" fill="'+parmColor+'" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160zm352-160l-160 160c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L301.3 256 438.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0z"/></svg>'
  case 'PrevRecord':
    return '<svg class="my_svg" fill="'+parmColor+'" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg>'
  case 'NextRecord':
    return '<svg class="my_svg" fill="'+parmColor+'" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>'
  case 'NextPage':
    return '<svg class="my_svg" fill="'+parmColor+'" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M470.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 256 265.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160zm-352 160l160-160c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L210.7 256 73.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0z"/></svg>'
  case 'LastRecord':
    return '<svg class="my_svg" fill="'+parmColor+'" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M470.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 256 265.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160zm-352 160l160-160c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L210.7 256 73.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0z"/></svg>'

    /*
    <button class="navibtn" title="первая запись" on:click={myFirst}>
    <i class="fa fa-step-backward fa-fw" ></i></button>
    <button id="button" title="Hello World!" class="navibtn" onClick="onClick(1)">
  <svg class="my_svg" fill="yellow" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M267.5 440.6c9.5 7.9 22.8 9.7 34.1 4.4s18.4-16.6 18.4-29V96c0-12.4-7.2-23.7-18.4-29s-24.5-3.6-34.1 4.4l-192 160L64 241V96c0-17.7-14.3-32-32-32S0 78.3 0 96V416c0 17.7 14.3 32 32 32s32-14.3 32-32V271l11.5 9.6 192 160z"/></svg>
</button>
    */
    break;
  default:
    break;
 }
 
}

</script>
