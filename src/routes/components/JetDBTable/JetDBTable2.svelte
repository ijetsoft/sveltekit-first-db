<script  lang="ts">
    import { supabase } from "$lib/supabaseClient.js";
    import {onMount, createEventDispatcher} from 'svelte';
    import Dialog from './../dialog/Dialog2.svelte'
    import {setContext} from 'svelte';

    export let Width = '100%;'
    export let Height = '450px;'
    export let dscFlds : any
    export let tblRows : any
    export let headerFlds : any; // для автономных таблиц
    
    const triangle = `<i class="fa-solid fa-caret-right"></i>`
    let currRow = 1;
    let tBody: any
    let tTable: any
    let nameTable = ''
    let nameKeyTable = ''
    let newRecord : any = {}
    let thisRecord = {}
    let thisCol = [{}]
        if (dscFlds) {
            nameTable = dscFlds.name
            nameKeyTable = dscFlds.col.filter(fld => (fld.type == 'key'))[0].fld
            thisCol = dscFlds.col.filter(fld => !(fld.type == 'key' || fld.type == 'image' || fld.ref));
        }
    let thisDS = ''; if (dscFlds) thisDS = tblRows[dscFlds.name].data
    let thisVoc = {}; if (dscFlds) thisVoc =  tblRows.voc
    let dialog: any;
    let modeUpdate = 'UPDATE'
    let mapDBTable = new Map()
    let keyActiveRecord = 0
    let RetTable = 0
    //$: ModifyRecord(RetTable)
    $: ModifyReсord(mapDBTable)//, mapDBTable.size 
// -------------------------------------------------------------    
const  dispatch = createEventDispatcher();
function onMapReady(event:any) {
    mapDBTable = event.detail
    //alert('mapDBTable: '+JSON.stringify(Array.from(mapDBTable.entries())))
    //alert('mapDBTable: '+JSON.stringify(mapDBTable))
    if (modeUpdate === 'INSERT') {
      alert('mapDBTable: '+JSON.stringify(Array.from(mapDBTable.entries())))
    }
    ModifyReсord()
}
onMount(() => {
    setMarkRow(1)
})
// -------------------------------------------------------------    
function AddNewRowTable(){
  // let row = document.createElement(tagName[, options]);
  //tBody.appendChild(row);
//var row = table.insertRow(0);
}
function ModifyReсord(){
   if (mapDBTable.size > 0) {
    let _row = tBody.children[currRow-1]
    for (let index = 0; index < thisCol.length; index++) {
      const el = thisCol[index];
      let nameFld =  el.fld[0]==='_' ? el.fld.slice(1) : el.fld
      if (mapDBTable.has(nameFld)) {
        let subEl = _row.children[index+1].firstChild
        subEl.parentNode.innerText = mapDBTable.get(nameFld)
        if (el.fld[0]==='_') {
          let x = getVocab(nameFld, Number(mapDBTable.get(nameFld)))
          _row.children[index+1].firstChild.nodeValue = getVocab(nameFld, Number(mapDBTable.get(nameFld)))
          //alert(subEl.nodeValue)
          //alert(getVocab(nameFld, Number(mapDBTable.get(nameFld))))
        } else if (el.type === 'bool') {
          let ret = mapDBTable.get(nameFld) === 'false' ? '<i class="fa-regular fa-square"></i>' : '<i class="fa-regular fa-square-check"></i>'
          const parser = new DOMParser();
          const htmlDoc = parser.parseFromString(ret, 'text/html');
          _row.children[index+1].innerHTML = ret
        }
/*         alert(_row.children[index+1].firstChild.textContent)
        alert(' ModifyReсord['+(index+1)+']:' +el.fld+'='+mapDBTable.get(nameFld) )
 */        //alert(_row.children[1].firstChild.textContent)
      }
    }
    // thisCol
    
    console.log(_row)
    //alert('mapDBTable: '+JSON.stringify([...mapDBTable]))
    
    mapDBTable.clear()
    mapDBTable = mapDBTable
   }
}
function sayHeader(parm: string){
    return   parm
}
function sayCell(parmRow: any, parmDSCCol: any){
    let ret = parmRow[parmDSCCol.fld]
    if (parmDSCCol.fld[0] == '_') {
         let vocFld = parmDSCCol.fld.slice(1); 
         let vocVal = parmRow[vocFld]
         ret = getVocab(vocFld, vocVal);
    }
    else {
        switch (parmDSCCol.type) {
          case 'date':
            ret = date2str(ret, 'dd.MM.yy')
            break;
          case 'memo':
            ret = '<button class="mini" data-value="'+ret+'">...</button>'
            break;
          case 'bool':        
            ret = ret === '0' ? '<i class="fa-regular fa-square"></i>' : '<i class="fa-regular fa-square-check"></i>'
          default:
            break;
        }
    }
    return  ret
}
function date2str(parmDate: any, y:any) {
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
    return y.replace(/(y+)/g, function (v) {
        return x.getFullYear().toString().slice(-v.length)
    });
  }
function setMarkRow(parm: any) {
    if (parm === 0 || parm > tBody.childElementCount) return
    if (tTable && parm === -1) {
      parm = tBody.childElementCount
      tTable.scrollTop = tTable.scrollHeight;
    }
    if (tBody) {
       tBody.children[currRow-1].children[0].innerHTML = ""
       currRow = parm 
       tBody.children[currRow-1].children[0].innerHTML = triangle
       if (parm === 1) tTable.scrollTop = 0
    }
}
function onClick(event: any) {
  let el = event.target
  let p = el.parentNode.parentNode.parentNode.parentNode.parentNode
  let dialog = p.children[0]
  if (el.tagName === "BUTTON") {
    dialog.children[0].innerHTML = el.dataset.value
    dialog.showModal() 
  }
  else {
    let ind = event.target.parentNode.rowIndex
    setMarkRow(ind)
  }
}
function getVocab(parmName: string, parmVal: any) {
    let a =  thisVoc.find((item:any) => item.name == parmName);
    let vocQry = a.qry.data
    let nameKey = Object.entries(vocQry[0])[0][0]
    let nameVal = Object.entries(vocQry[0])[1][0]
    let vocabRecs = vocQry.find((itemV:any) => itemV[nameKey] === parmVal);
    let retVal = ''; if (vocabRecs) retVal = vocabRecs[nameVal]
    return retVal
}    
function myFirst() { setMarkRow(1); }
function myLast() { setMarkRow(-1); }
function myPrev() { setMarkRow(currRow-1); }
function myNext() { setMarkRow(currRow+1); } 
function thisView() {
    thisRecord = thisDS[currRow-1]
    keyActiveRecord = thisRecord[nameKeyTable]
    modeUpdate = 'UPDATE'
    mapDBTable.clear
    mapDBTable = mapDBTable
    dialog.showModal()}
async function addNewRecord() {
    const { data, error } = await supabase
        .from('Product')
        .select('Id')
        .order('Id', { ascending: false })
        .limit(1);
    keyActiveRecord = data[0]['Id']
    //alert(keyNewRedord)
    thisRecord = thisDS[currRow-1]
    modeUpdate = 'INSERT'
    FormNewRecord(dscFlds)
    thisRecord = newRecord
    
    //const dialog = document.querySelector("dialog")
    //parmUpdate
    if (dialog) dialog.showModal() 
    AddNewRowTable()
}

function FormNewRecord(parmDSC: any){
  let myObject = thisRecord
  //let keys = Object.keys(myObject);
  let keys = [], it = {};
  
  if (modeUpdate = 'INSERT') newRecord[nameKeyTable] = keyActiveRecord
  for(var key in myObject){
    if (key !== nameKeyTable) newRecord[key] = ''
    it =  parmDSC.col.find((item:any) => item.fld == key);
    if (it) {
      switch (it.type) {
        case 'string':
          newRecord[key] = 'XXX'
          break;
        case 'number':
          newRecord[key] = '0'
        default:
          break;
      }
    }
        
    //keys.push(key);
  }
      let ret = {}
      /* for (let index = 0; index < parmDSC.col.length; index++) {
        const el = parmDSC.col[index];
        newRecord[el.fld] = 'XXX'
      } */
      return ret 
    }
async function InsertDB() {
  const { data, error } = await supabase
    .from('Product')
    .insert([
     { 'ProductName': '????***' } //, 'Id': 9999
    ])
      
  if (error) throw new Error(error.message); 
  console.log(data)
  return data
}
async function GetRecordDB(parmKeyValue: any) {
   const { data, error } = await supabase
  .from(nameTable)
  .select()
  .eq(nameKeyTable, parmKeyValue)
  if (error) throw new Error(error.message); 
  console.log(data)
  return data
}
</script>
 {@debug nameTable, nameKeyTable, thisDS} 

<!--                Dialog -->
<dialog>
      <p>Greetings, one and all!</p>
      <form method="dialog">
        <button>OK</button>
      </form>
</dialog>
<!--                Navigate -->
<section id="parentbox">
  <button class="navibtn" title="первая запись" on:click={myFirst}>
    <i class="fa fa-step-backward fa-fw" ></i></button>
  <button class="navibtn" title="предыдущая запись" on:click={myPrev}>
    <i class="fa fa-chevron-left fa-fw"></i></button>
  <button class="navibtn" title="следующая запись" on:click={myNext}>
    <i class="fa fa-chevron-right fa-fw" ></i></button>
  <button class="navibtn" title="последняя запись" on:click={myLast}>
    <i class="fa fa-step-forward fa-fw"></i></button>
  <button class="navibtn" title="просмотреть запись" on:click={thisView}>
    <i class="fa fa-eye fa-fw"></i></button>
<button class="navibtn" title="добавить запись">
    <i class="far fa-plus-square" on:click={addNewRecord}></i>
</button>
<p>Work</p>
</section>
<!--                Table -->
<table bind:this={tTable} style ="max-width:{Width}; height:{Height}"
    on:click={onClick} 
>
<tr>
    <th> </th>
    {#if dscFlds} 
      {#each thisCol as fld, i}
          <th> {@html sayHeader(fld.header)} </th>
      {/each}
    {:else if headerFlds} 
      {#each headerFlds as fld, i}
        <th>{fld}</th>
      {/each}
    {/if} 
</tr>
<tbody bind:this={tBody}>
  {#if tblRows}
    {#each thisDS as row, j}
        <tr>
            <td></td>
            {#each thisCol as colFld, i}
                {#if (colFld.type == 'number')}
                    <td class='r'> {@html sayCell(row,colFld)} </td>
                {:else if (colFld.type == 'bool')}
                    <td class='c'> {@html sayCell(row,colFld)} </td>                
                {:else}  
                    <td> {@html sayCell(row,colFld)} </td>
                {/if}
            {/each}
        </tr>
    {/each}
  {/if}
</tbody>


</table>
<Dialog 
  bind:dialog bkgHeaderColor = 'maroon' 
  dsc={dscFlds} DS={thisRecord} voc={thisVoc}
  modeUpdate={modeUpdate}
  bind:mapDialog={mapDBTable} 
  on:MapReady={onMapReady} 
  parmKey={keyActiveRecord}
  ></Dialog>
   <!-- bind:RetDialog={RetTable}  -->
<style>
.navibtn {
  background-color: FireBrick;
  border: none;
  color: Gold;
  
  cursor: pointer;
  padding: 3px 4px;
  border-radius: 5px;
  float: left;
  margin: 2px;
}
tr:nth-child(even) {
  background-color: #dddddd;
}
tr:hover { background-color: rgb(202, 101, 101); color: white}
.r {text-align: right}
.l {text-align: left}
.c {text-align: center}
dialog {
  z-index: 10;
  margin-top: 10px;
  background: lemonchiffon;
  border: none;
  border-radius: 1rem;
}
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  /*
  max-width: 400px; 
  height: 240px; */
  margin: 0 ;/*auto;*/
  display: block;
  overflow-x: auto;
  border-spacing: 0;
  margin-top: 2px;
}
td, th {
  border: 1px solid #777;
  text-align: left;
  padding: 8px;
}
th {
    background-color:maroon;color:white;
  position: sticky;
  top: 0;
  vertical-align: center;
  text-align: center;
}
tbody {
  white-space: nowrap;
}
@media screen and (min-width: 601px) {
.navibtn {
      width: 30px; 
      height: 30px; 
      font-size: 1em;  
  }
  table { font-size: 1em; }
}
@media screen and (max-width: 600px) {
	.navibtn {
    width: 50px; 
    height: 50px; 
    font-size: 2em;  
  } 
  table { font-size: 2em; }
} 

</style>