<script  lang="ts">
  import { Jumper, RingLoader } from 'svelte-loading-spinners';
  import {date2str, GetLastKey, Count, DeleteDBRecord, 
        getVocabTextValue, GetRangeRecordDB, getSVG, appendTD} from './helper.svelte';
  import { supabase } from "$lib/supabaseClient.js";
  import {onMount, createEventDispatcher} from 'svelte';

  export let headerFlds : any; // для автономных таблиц
  export let dscFlds : any
  export let tblRows : any
  export let Width = '100%;'
  export let Height = '470px;'

  let nameTable = ''
  let nameKeyTable = ''
  let currRow: number = 1;
  let tBody: any
  let tTable: any
  let _styleTD : CSSStyleDeclaration
  let visible = true;
  let step = 1000
  let currStep = -1

  let lenCol = dscFlds.col.length
  let thisCol = [{}]
    if (dscFlds) {
       nameTable = dscFlds.name
       nameKeyTable = dscFlds.col.filter(fld => (fld.type == 'key'))[0].fld
       thisCol = dscFlds.col.filter(fld => !(fld.type == 'key' || fld.type == 'image' || fld.ref));
    }
  let thisDS: any; if (dscFlds) thisDS = tblRows[dscFlds.name].data
  let thisVoc = {}; if (dscFlds) thisVoc =  tblRows.voc
  //
  window.addEventListener('resize', (e) => {
  //alert('Resize: '+window.innerHeight+' '+window.innerWidth);
});
onMount(() => {
      setMarkRow(1)
})
  function sayPanelHeader(){ return dscFlds.col.length}
  function sayHeader(parm: string){  return   parm  }
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
function myFirst() {setMarkRow(1) }
function myPrevPage() {}
function myPrev() {setMarkRow(currRow-1)}
function myNext() {setMarkRow(currRow+1)}
function myNextPage() {
  visible = true
  currStep +=1
  GetRangeRecordDB(nameTable, step, currStep)
    .then(result => {
      CreateTableRowFromRange(result)
      setMarkRow(-1)
      visible = false
  })
}
function myLast() {setMarkRow(-1)}
function thisView() {}
function addRecord() {}
function deleteRecord() {}
function setMarkRow(parm: any) {
  if (parm === 0 || parm > tBody.childElementCount) return
  if (tTable && parm === -1) {
    parm = tBody.childElementCount
    tTable.scrollTop = tTable.scrollHeight;
  }
      if (tBody) {
         tBody.children[currRow-1].children[0].innerHTML = ""
         currRow = parm 
         tBody.children[currRow-1].children[0].innerHTML = getSVG('pointer','','')//triangle
         if (parm === 1) tTable.scrollTop = 0
      }
  }
  function CreateTableRowFromRange(parmDSRange: any){
   
   visible = true
   for (let index = 0; index < parmDSRange.length; index++) {
     let record = parmDSRange[index];
     //currRow = 1000 +index
     console.log( currRow, record['Id'] )
     let TR: HTMLTableRowElement = document.createElement('tr');
     for(var key in record){
       let TD: HTMLTableCellElement = document.createElement('td');
       let val = record[key], it : any, voc : any
       if (key == nameKeyTable) {TD.innerText =record[key]; appendTD(TR, TD, _styleTD); continue}
       it =  thisCol.find((item:any) => item.fld == key);
       if (it) {TD.innerText = sayCell(record, it); appendTD(TR, TD, _styleTD);}
     }
     tBody.append(TR)
     visible = true
   }
   tTable.scrollTop = tTable.scrollHeight;
   setMarkRow(-1)
 
   //  node.append(...nodes or strings) 
 }
 function onClick(event: any) {
    let el = event.target
    let p = el.parentNode
    p = el.parentNode.parentNode
    p = el.parentNode.parentNode.parentNode
    p = el.parentNode.parentNode.parentNode.parentNode
    if (el.localName === 'svg') return;
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
      let ind = event.target.parentNode.rowIndex-1
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
<!-- <h1>{nameTable}</h1>
<h2>{nameTable}</h2>
<h3>{nameTable}</h3> -->
{#if visible}
<!-- <RingLoader size="100" color="#FF3E00" unit="px" duration="1s"
 class= "spin_loader"
 style="float: left; index:999; align-content='center'; top=60px" />  -->
{/if}
<div class="navbar">
  <button class="navibtn" title="первая запись" on:click={myFirst}>
    {@html getSVG('FirstRecord', 'Gold')}</button>
    <button class="navibtn pagebutton" title="предыдующая страница" 
    on:click={myPrevPage} style="display:none">
    {@html getSVG('PrevPage', 'Gold')}</button>
  <button class="navibtn" title="предыдущая запись" on:click={myPrev}>
    {@html getSVG('PrevRecord', 'Gold')}</button>
    <!-- <i class="fa fa-chevron-left fa-fw"></i></button> -->
  <input class="navi_input" type="number" bind:value={currRow}/>

  <button class="navibtn" title="следующая запись" on:click={myNext}>
    {@html getSVG('NextRecord', 'Gold')}</button>
    <!-- <i class="fa fa-chevron-right fa-fw" ></i> -->
  <button class="navibtn pagebutton" title="следующая страница" 
    on:click={myNextPage} >
    {@html getSVG('NextPage', 'Gold')}</button>
  <button class="navibtn" title="последняя запись" on:click={myLast}>
    <i class="fa fa-step-forward fa-fw"></i></button>
  <button class="navibtn" title="просмотреть запись" on:click={thisView}>
    {@html getSVG('ViewRecord', 'Gold')}</button>
    <!-- <i class="fa fa-eye fa-fw"></i></button> -->
  <button class="navibtn" title="добавить запись">
    {@html getSVG('AddRecord', 'Gold')}</button>
    <!-- <i class="far fa-plus-square" on:click={addNewRecord}></i> 
    </button>-->
  <button class="navibtn" title="удалить запись" on:click={deleteRecord}>
    {@html getSVG('DeleteRecord', 'Gold')}</button>
  <div class="div_version" >версия 24.08 h</div>
</div>
<div bind:this={tTable} id="my-grid-wrapper" style="overflow-x:auto; overflow-y: auto; width:{Width}; height:{Height}">
  
  <table  style ="width:{Width}; height:{Height}; float: left;"
on:click={onClick} >
  <thead>
  <tr >
    <th  colspan="{sayPanelHeader()}" align="left">
    
    </th>  
  </tr>
 
  <tr>
      <th> </th>
      {#if dscFlds} 
        {#each thisCol as fld, i}
             <!-- <th data-fld={fld.fld} text-align= "center">{@html sayHeader(fld.header)}  </th>-->
           <th data-fld={fld.fld}><button id={fld.fld}>{@html sayHeader(fld.header)}</button>  </th>             
        {/each}
      {:else if headerFlds} 
        {#each headerFlds as fld, i}
          <th>{fld}</th>
        {/each}
      {/if} 
  </tr>
  </thead>
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
</div>

<style>
table {
  margin-top: 20px;
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;
  border: 1px solid #ddd;
}
thead {
    position: sticky;
    top: 0;
}
td {
    border: 1px solid #777;
    text-align: left;
    padding: 8px;
  }
th {
    border: 1px solid white;
    background-color:maroon;color:white;
    position: sticky;
    top: 0;
    vertical-align: center;
    font-weight: normal;
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
tr:nth-child(even) {
    background-color: #dddddd;
  }
tr:hover { background-color: rgb(202, 101, 101); color: white}
.navibtn {
    float: left;
    background-color: FireBrick;
    border: none;
    color: Gold;
    
    cursor: pointer;
    padding: 3px 4px;
    border-radius: 5px;
  
    margin: 2px;
  }
  @media screen and (min-width: 641px) {
  .navibtn {
        width: 30px; 
        height: 30px; 
        font-size: 1em;  
    }
    table { font-size: 1em; }
  }
  @media screen and (max-width: 640px) {
    .my_svg {
      width: 40px; 
      height: 40px; }
    .navibtn {
      width: 50px; 
      height: 50px; 
      font-size: 2em;  
    }  
    table { font-size: 2em; }
    .navi_input {height: 45px; font-size: 2em;}
    .loader {height: 470px; }
  } 
  .navbar {
    overflow: hidden;
    /* height: 20px; */
    position: fixed;
    top: 0;
    width: 100%;
}
</style>