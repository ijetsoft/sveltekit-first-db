<script  lang="ts">
import { Jumper } from 'svelte-loading-spinners';
import {date2str, GetLastKey, Count, DeleteDBRecord, 
      getVocabTextValue, GetRangeRecordDB} from './helper.svelte';
    import { supabase } from "$lib/supabaseClient.js";
    import {onMount, createEventDispatcher} from 'svelte';
    import Dialog from './../dialog/Dialog2.svelte'
    import {setContext} from 'svelte';

    export let Width = '100%;'
    export let Height = '470px;'
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
    let thisDS: any; if (dscFlds) thisDS = tblRows[dscFlds.name].data
    let thisVoc = {}; if (dscFlds) thisVoc =  tblRows.voc
    let dialog: any;
    let modeUpdate = 'UPDATE'
    let mapDBTable = new Map()
    let keyActiveRecord = 0
    let RetTable = 0
    let countRecordDBTable = 0
    let _styleTD : CSSStyleDeclaration
    let visible = true;

    //$: ModifyRecord(RetTable)
    $: ModifyReсord(mapDBTable.size)//, mapDBTable.size 
// -------------------------------------------------------------    
const  dispatch = createEventDispatcher();
/* function sendEvent() {
    	dispatch('MapReady', {}); 
      
  	} */
function onMapReady(event:any) {
    mapDBTable = event.detail
    //alert('mapDBTable: '+JSON.stringify(Array.from(mapDBTable.entries())))
    //alert('mapDBTable: '+JSON.stringify(mapDBTable))
    //alert('mapDBTable: '+JSON.stringify(Array.from(mapDBTable.entries())))
    //alert('onMapReady mapDBTable='+JSON.stringify([...mapDBTable]))
    //console.log('onMapReady mapDBTable='+JSON.stringify([...mapDBTable]))
    if (modeUpdate === 'INSERT') {
      AddNewRowTable()
      // добавить новую запись newRecord в thisDS
      thisDS.push(newRecord)
      setMarkRow(-1)
    }
    if (modeUpdate === 'UPDATE') {
      // откорректировать текущую запись в thisDS
      UpdateDSRecord()
    }
    ModifyReсord()
}
onMount(() => {
    setMarkRow(1)
    _styleTD = getComputedStyle(tBody.children[0].children[0])
    Count(nameTable)
    .then(result =>{
      countRecordDBTable = result
      let elements = document.getElementsByClassName('pagebutton');
          for (let index = 0; index < elements.length; index++) {
            let element = elements[index];
            if (countRecordDBTable <= 1000) {
              //element.style.display = "none"
            } else element.style.display = "block"//element.style.visibility = "visible";
          }
          visible = false
    })
    /* let myLoader: any  = document.getElementsByClassName('loader')
    myLoader.style.visibility ="hidden" */
    
    /* document.getElementsByClassName("loader").style.display = "none";
    myLoader.style.display = 'none' */
    // .style.visibility='visible'
   /*  let x = ''; Count('Order')
    .then(result => {
    x = result;
    alert('onMount '+x)}       
    })
*/
})
// -------------------------------------------------------------    
function AddNewRowTable(){
  // let row = document.createElement(tagName[, options]);
  //tBody.appendChild(row);
//var row = table.insertRow(0);
//alert('69. '+tBody.childElementCount)
let _Row = tBody.children[0]
  let row =  tTable.insertRow(tBody.children[0])

  //alert('71. '+JSON.stringify(row))
  //console.log('71. '+JSON.stringify([...row]))
  row =  tBody.children[0]
  // временно
  for (let index = 0; index < row.children.length; index++) {
    row.children[index].innerText = ''
  }
  
 /*  let tHead = tTable.children[1], nameFld = ''
  for (let index = 0; index < tHead.children.length; index++) {
    const el = tHead.children[index];
    if (el.dataset['fld']) {
      nameFld = el.dataset['fld']
      if (mapDBTable.has(nameFld)) {row.children[index].innerText = mapDBTable.get(nameFld)}
    } */
    //el.innerText = ''
    /* if (thisCol[index].fld) {
      if (mapDBTable.has(thisCol[index].fld))  {
        el.innerText = mapDBTable.get(thisCol[index].fld)
      }
    }
     */
  // }
  //alert('90. '+tBody.childElementCount)
  let tempRow = tBody.lastChild
  tempRow.after(row)
 // tBody.appendChild(row);
  //alert('92. '+tBody.childElementCount)
  currRow = tBody.children.length
  tTable.scrollTop = tTable.scrollHeight;
  
  //setMarkRow(currRow+1)
}
function ColumnByNameFld(pamName: string) {
  for (let index = 0; index < thisCol.length; index++) {
    const el = thisCol[index];
    if (el.fld === pamName) return index+1
  }
  return 0
}
function UpdateDSRecord(){
  /* alert('121 Rexord='+JSON.stringify(thisDS[currRow-1]))
  alert('122 mapDBTable='+JSON.stringify([...mapDBTable])) */
  let _thisFld: any
  mapDBTable.forEach((value, key, map) => {
    _thisFld = dscFlds.col.filter(el => (el.fld == key))[0]
    // alert('126 _thisFld='+JSON.stringify(_thisFld))
    switch (_thisFld.type) {
      case 'string':
        thisDS[currRow-1][key] = value
        break;
      case 'number':
        thisDS[currRow-1][key] = value.parseInt
        break;
      case 'bool':
        thisDS[currRow-1][key] = value
        if (value === 'true')  thisDS[currRow-1][key] = 1
        if (value === 'false')  thisDS[currRow-1][key] = 0        
        break;
      case 'date':
        thisDS[currRow-1][key] = date2str(value, 'yyyy-MM-dd')
        break;
      default:
        break;
    }
    //alert('121 Rexord='+JSON.stringify(thisDS[currRow-1]))
  })
}
function UpdateTableRow(){
  if (mapDBTable.size === 0) return
  let ind = -1
 // if (modeUpdate === 'INSERT') {alert(tBody.children.length)}
  let _row = tBody.children[currRow-1]
  mapDBTable.forEach((value, key, map) => {
    //alert(`${key}: ${value}`); // огурец: 500 и так далее
    ind = ColumnByNameFld(key)
    if (ind > 0) {
      let subEl = _row.children[ind]
      switch (thisCol[ind-1].type) {
        case 'bool':
          break;
      
        default:
          break;
      }
      if (thisCol[ind-1].type === 'bool'){
        let val = value === 'false'||0 ? '<i class="fa-regular fa-square"></i>' : '<i class="fa-regular fa-square-check"></i>'
          subEl.innerHTML = val
      } else if (thisCol[ind-1].type === 'date'){
          let x = new Date(value);
          subEl.innerText = date2str(x, 'dd.MM.yy')
          
          console.log('171: Update Table Row: '+subEl.innerText+' from '+value)
          //alert('171 = '+subEl.innerText)
         /*  let y = document.querySelector("table")
          alert('172: UpdateTableRow: '+JSON.stringify(y))        */   
          //console.log('172: UpdateTableRow: '+JSON.stringify(tBody.children[currRow-1].children[ind]))          
      } else subEl.textContent = value
      //tblRows[key] = value
    }
    let x = tBody.children[currRow-1].chidren
   // alert('map UpdateTableRow: '+JSON.stringify(x)) 
     
  });

 /*  for (let entry of mapDBTable) { // то же самое, что и reci-peMap.entries()
    alert(entry); // огурец,500 (и так далее)
  }

  for (let index = 0; index < mapDBTable.size; index++) {
    const element = mapDBTable[index];
    
  } */
  // запись DataSet
  /* {#if tblRows}
    {#each thisDS as row, j}
  tBody.children[currRow-1] */
}
function ModifyReсord(){
  //console.log('ModifyReсord size='+mapDBTable.size)
  UpdateTableRow(); return
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
    
    //console.log(_row)
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
         ret = getVocabTextValue(thisVoc, vocFld, vocVal);
         //ret = getVocab(vocFld, vocVal);
    }
    else {
        switch (parmDSCCol.type) {
          case 'date':
            ret = date2str(ret, 'dd.MM.yy')
            //alert('244: '+parmRow[parmDSCCol.fld]+' - '+ret)            
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
    if (el.parentNode.tagName === 'TH'){
      clickSort(el)
    } else {
      dialog.children[0].innerHTML = el.dataset.value
      dialog.showModal() 
    }
  } else if (el.tagName === "TH") {

    //alert('th '+el.dataset['fld'])
  } else {
    let ind = event.target.parentNode.rowIndex
    setMarkRow(ind)
  }
}
function clickSort(el:any) {
  let ind = el.parentNode.cellIndex
  if (el.childElementCount > 0) el.removeChild(el.lastChild);

      if (el.getAttribute("data-dir") == "desc") {
        //alert(el.id+' '+el.innerHTML)
        //el.innerText.slice(0, -1);
        //sortData(response.pokedata, e.target.id, "desc");
        el.setAttribute("data-dir", "asc");
        el.innerHTML += '<i class="fa-solid fa-caret-up"></i>'
      } else {
        //sortData(response.pokedata, e.target.id, "asc");
        //alert(el.id+' '+el.innerHTML)
        //el.innerText.slice(0, -1);
        el.innerHTML += '<i class="fa-solid fa-caret-down"></i>'
        el.setAttribute("data-dir", "desc");
      }
      sortGridDoIt(ind, el.getAttribute("data-dir")) 
      
      return ''
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
function myPrevPage() {
  // число записей > 1000?
}
function myPrev() { setMarkRow(currRow-1); }
function myNext() { setMarkRow(currRow+1); } 
function myNextPage() {
  // число записей > 1000?
  //alert('Next Page')
  visible = true
  GetRangeRecordDB(nameTable, nameKeyTable, 1000)
  .then(result => {
    CreateTableRowFromRange(result)
    setMarkRow(-1)
    visible = false
  })
}
function thisView() {
    thisRecord = thisDS[currRow-1]
    keyActiveRecord = thisRecord[nameKeyTable]
    modeUpdate = 'UPDATE'
    mapDBTable.clear
    mapDBTable = mapDBTable
    dialog.showModal()
}
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
    CreateRecordForDialog(dscFlds)
    thisRecord = newRecord 
    
    //const dialog = document.querySelector("dialog")
    //parmUpdate
    if (dialog) dialog.showModal() 
    
}
async function deleteRecord() {
  let mustDelete = confirm("Подтвердите удаление");
	if (!mustDelete) return
  thisRecord = thisDS[currRow-1]
  keyActiveRecord = thisRecord[nameKeyTable]
  DeleteDBRecord(nameTable, nameKeyTable, keyActiveRecord)
  let x = tBody.children[currRow-1]
  tBody.removeChild(x)
  myPrev()
  
}
function CreateRecordForDialog(parmDSC: any){
  let myObject = thisRecord
  //alert('InsertDBRecord: '+JSON.stringify(thisRecord))
  //let keys = Object.keys(myObject);
  let keys = [], it = {};
  
  newRecord[nameKeyTable] = keyActiveRecord
  for(var key in myObject){
    if (key !== nameKeyTable) newRecord[key] = ''
    it =  parmDSC.col.find((item:any) => item.fld == key);
    if (it) {
      switch (it.type) {
        case 'string':
          newRecord[key] = '?'
          break;
        case 'number': newRecord[key] = 0; break;
        case 'bool': newRecord[key] = 0; break;
        default:
          break;
      }
    }
  }
  //alert('330 newRecord : '+JSON.stringify(newRecord))
}
function CreateTableRowFromRange(parmDSRange: any){
 
  
  for (let index = 0; index < parmDSRange.length; index++) {
    let record = parmDSRange[index];
    //currRow = 1000 +index
    console.log( currRow, record['Id'] )
    let TR: HTMLTableRowElement = document.createElement('tr');
    for(var key in record){
      let TD: HTMLTableCellElement = document.createElement('td');
      let val = record[key], it : any, voc : any
      if (key == nameKeyTable) {TD.innerText =1000 +index; appendTD(TR, TD); continue}
      it =  thisCol.find((item:any) => item.fld == key);
      if (it) {TD.innerText = sayCell(record, it); appendTD(TR, TD);}
    }
    tBody.append(TR)
  }
  tTable.scrollTop = tTable.scrollHeight;
  setMarkRow(-1)
 /*  }
  let record = parmDSRange[0] */
  /* for(var key in record){
    let TD: HTMLTableCellElement = document.createElement('td');
    //TD.style.cssText = 'color:red; background-color:yellow';
    let val = record[key], it : any, voc : any
    if (key == nameKeyTable) {TD.innerText =''; appendTD(TR, TD); continue}
    it =  thisCol.find((item:any) => item.fld == key);
    if (typeof it === 'undefined') it =  thisCol.find((item:any) => item.fld == '_'+key)
    if (it) {
      switch (it.type) {
        case 'string': TD.innerText = sayCell(record, it); break;
        case 'number': 
          TD.innerText = sayCell(record, it);
          TD.style.textAlign = 'right';
          break;
        case 'date': TD.style.textAlign = 'center';
          TD.innerText = sayCell(record, it); break;
        case 'bool': TD.innerText = sayCell(record, it); break;
        default: TD.innerText = sayCell(record, it); break;
      }
    }
  //console.log(key+'='+record[key])
  
  appendTD(TR, TD)
  }
  tBody.append(TR)
} */


  //  node.append(...nodes or strings) 
}
function appendTD(parmTR: HTMLTableRowElement, parmTD: HTMLTableCellElement) {
 
  parmTD.style.border = _styleTD.border;
  parmTD.style.padding = _styleTD.padding;
  parmTR.append(parmTD);
}

function sortGridDoIt(colNum:number, sortMode:string) {
  let type = thisCol[colNum-1].type
  let rowsArray = Array.from(tBody.rows);
  let compare
    switch (type) {
      case 'number':
        compare = function(rowA:any, rowB:any) {
          if (sortMode=== 'asc') return rowB.cells[colNum].innerText - rowA.cells[colNum].innerText
             else return rowA.cells[colNum].innerText - rowB.cells[colNum].innerText
        }
        break;
      case 'string':
        compare = function(rowA:any, rowB:any) {
          if (sortMode=== 'asc') return rowB.cells[colNum].innerHTML > rowA.cells[colNum].innerHTML ? 1 : -1;
          else return rowA.cells[colNum].innerHTML > rowB.cells[colNum].innerHTML ? 1 : -1;
        }
        break;
      case 'bool':
        compare = function(rowA:any, rowB:any) {
          if (sortMode=== 'asc') return rowB.cells[colNum].innerHTML > rowA.cells[colNum].innerHTML ? 1 : -1;
          else return rowA.cells[colNum].innerHTML > rowB.cells[colNum].innerHTML ? 1 : -1;          
        }
        break;
      case 'date':
        compare = function(rowA:any, rowB:any) {
          let cell1 = rowA.cells[colNum].innerHTML
          let cell2 = rowB.cells[colNum].innerHTML
          let year1 = +cell1.substr(6,4), year2 = +cell2.substr(6,4)
          let month1 = +cell1.substr(4,2), month2 = +cell2.substr(4,2)
          let day1 = +cell1.substr(0,2), day2 = +cell2.substr(0,2)
          if (year1 == year2) {
            if (month1 == month2) {
              if (sortMode=== 'desc') return day1 >= day2 ? 1 : -1;
              else return day2 >= day1 ? 1 : -1;
            } else {
              if (sortMode=== 'desc') return month1 > month2 ? 1 : -1;
              else return month2 > month1 ? 1 : -1;
            }
          } else {
            if (sortMode=== 'desc') return year1 > year2 ? 1 : -1;
            else return year2 > year1 ? 1 : -1;
          }
        } 
        break;
    }
  
  rowsArray.sort(compare);
  tBody.append(...rowsArray); 
}

</script>
  {@debug thisDS}  

<!--                Dialog -->
<dialog>
      <p>Greetings, one and all!</p>
      <form method="dialog">
        <button>OK</button>
      </form>
</dialog>
{#if visible}
<div class="loader">
  <Jumper size="60" color="#FF3E00" unit="px" duration="1s" />
</div>

{/if}
<!-- <div class="loader"></div> -->

<section id="parentbox">
  <button class="navibtn" title="первая запись" on:click={myFirst}>
    <i class="fa fa-step-backward fa-fw" ></i></button>
  <button class="navibtn pagebutton" title="предыдующая страница" 
    on:click={myPrevPage} style="display:none">
    <i class="fa-solid fa-backward"></i></button>
  <button class="navibtn" title="предыдущая запись" on:click={myPrev}>
    <i class="fa fa-chevron-left fa-fw"></i></button>
  <input class="navi_input" type="number" bind:value={currRow} />
  <button class="navibtn" title="следующая запись" on:click={myNext}>
    <i class="fa fa-chevron-right fa-fw" ></i></button>
  <button class="navibtn pagebutton" title="следующая страница" 
    on:click={myNextPage} style="display:none">
      <i class="fa-solid fa-forward"></i></button>
  <button class="navibtn" title="последняя запись" on:click={myLast}>
    <i class="fa fa-step-forward fa-fw"></i></button>
  <button class="navibtn" title="просмотреть запись" on:click={thisView}>
    <i class="fa fa-eye fa-fw"></i></button>
<button class="navibtn" title="добавить запись">
    <i class="far fa-plus-square" on:click={addNewRecord}></i>
</button>
<button class="navibtn" title="удалить запись">
  <i class="fa-solid fa-trash" on:click={deleteRecord}></i>
</button>
<div class="div_version" >версия 9.08 h</div>

<!-- <p class="boring-text" data-dir="asc">Here is some plain old boring text.</p> -->
</section>
<!--                 Table -->
<table bind:this={tTable} style ="max-width:{Width}; height:{Height}"
    on:click={onClick} 
>
<tr>
    <th> </th>
    {#if dscFlds} 
      {#each thisCol as fld, i}
          <th data-fld={fld.fld}><button class='th' id={fld.fld}>{@html sayHeader(fld.header)}</button>  </th>
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
          {:else if (colFld.type == 'date')}
            <td class='c'> {@html sayCell(row,colFld)} </td>   
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
  dsc={dscFlds} outerRecord={thisRecord} voc={thisVoc}
  modeUpdate={modeUpdate}
  bind:mapDialog={mapDBTable} 
  on:MapReady={onMapReady} 
  parmKey={keyActiveRecord}
  ></Dialog>
   <!-- bind:RetDialog={RetTable}  -->
<style>

  .loader {
  border: 16px solid #f3f3f3;
  border-radius: 50%;
  border-top: 16px solid #3498db;
  width: 120px;
  height: 120px;
  -webkit-animation: spin 2s linear infinite; /* Safari */
  animation: spin 2s linear infinite;
}
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.div_version {
  float: right;
}
.navi_input {
  float: left; 
  margin-top: 2px;
  max-width: 60px; 
  padding: 3px 4px;
  border-radius: 5px;
  color: maroon;
  background-color:lemonchiffon;
  border: 1px solid #777;
}
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
  .navi_input {height: 45px; font-size: 2em;}
} 
th button {
  background-color: maroon;color:white;
  border: none;
  cursor: pointer;
  display: block;
  font: inherit;
  height: 100%;
  margin: 0;
  min-width: max-content;
  padding: 0.5rem 1rem;
  position: relative;
  text-align: left;
  width: 100%;
}
/* th button::after {
  position: absolute;
  right: 0.5rem;
} */
th > button[data-dir="asc"]::after {
  /* content: url("data:image/svg+xml,%3Csvg xmlns='https://www.w3.org/2000/svg' width='8' height='8'%3E%3Cpolygon points='0, 0 8,0 4,8 8' fill='%23818688'/%3E%3C/svg%3E");
   content: '<i class="fa-solid fa-caret-up"></i>';*/
   color:white;
   background-color: blue;
   content: "v"
}
th > button[data-dir="desc"]::after {
 /* content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8'%3E%3Cpolygon points='4 0,8 8,0 8' fill='%23818688'/%3E%3C/svg%3E");*/
  color:white;
  background-color: red;
   content: "^"
}
.boring-text[data-dir="desc"]::after {
  content: " <- BORING";
  color: green;
}
.boring-text[data-dir="asc"]::after {
  content: " <- ASC";
  color: red;
}
</style>