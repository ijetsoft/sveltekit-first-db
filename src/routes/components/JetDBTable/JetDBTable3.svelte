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
  let visible = true;
  let step = 1000
  let currStep = -1
  let _styleTD : CSSStyleDeclaration

  let lenCol = dscFlds.col.length
  let thisCol = [{}]
    if (dscFlds) {
       nameTable = dscFlds.name
       nameKeyTable = dscFlds.col.filter(fld => (fld.type == 'key'))[0].fld
       thisCol = dscFlds.col.filter(fld => !(fld.type == 'key' || fld.type == 'image' || fld.ref));
    }
  let thisDS: any; if (dscFlds) thisDS = tblRows[dscFlds.name].data
  let thisVoc = {}; if (dscFlds) thisVoc =  tblRows.voc


  // события
  /* let sec = 20;
    setTimeout(() => {
      console.log(sec+" second passed!");
      visible = false;
      }, 1000*sec);  */
    onMount(() => {
      setMarkRow(1)
      _styleTD = getComputedStyle(tBody.children[0].children[0])
      visible = false
    })
  window.addEventListener('resize', (e) => {
  //alert('Resize: '+window.innerHeight+' '+window.innerWidth);
  });
  function onClick(event: any) {
    let el = event.target
    if (el.tagName === "path") {return}
    let p = el.parentNode.parentNode.parentNode.parentNode.parentNode
    let dialog = p.children[0]
    if (el.tagName === "BUTTON") {
      if (el.parentNode.tagName === 'TH'){
        clickSort(el)
      }
      } else {
        let ind = event.target.parentNode.rowIndex
        setMarkRow(ind)
        alert('onClick setMarkRow')
    }
    

  }
  // функции
  function setMarkRow(parm: number){
    alert('67:'+currRow)
    if (parm === 0 || parm > tBody.childElementCount) return
    if (tTable && parm === -1) {
      parm = tBody.childElementCount
      tTable.scrollTop = tTable.scrollHeight;
    }
    if (tBody) {
      tBody.children[currRow-1].children[0].innerHTML = ""
      currRow = parm 
      let temp =  tBody.children[currRow-1]
      let temp1 = temp.children[0]
      tBody.children[currRow-1].children[0].innerHTML = getSVG('pointer','','')//triangle
      if (parm === 1) {tTable.scrollTop = 0}
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
     visible = false
   }
   tTable.scrollTop = tTable.scrollHeight;
   setMarkRow(-1)
  }
  function clickSort(el:any) {
    // el.innerHTML += '<i class="fa-solid fa-caret-up"></i>'
    if (el.childElementCount > 0) el.removeChild(el.lastChild);
    if (el.getAttribute("data-dir") == "desc") {
      el.setAttribute("data-dir", "asc");
      el.innerHTML += getSVG('Up', 'White')
    } else {
      el.setAttribute("data-dir", "desc");
      el.innerHTML += getSVG('Down', 'White')
    }
    
  }
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
</script>
<!-- <h1>{nameTable}</h1>
<h2>{nameTable}</h2>
<h3>{nameTable}</h3> -->
{#if visible}
<!-- <RingLoader size="100" color="#FF3E00" unit="px" duration="1s"
 class= "spin_loader"
 style="float: left; index:999; align-content='center'; top=60px" />  -->
{/if}

<div id="my-grid-wrapper" style="overflow-x:auto; overflow-y: auto; width:{Width}; height:{Height}">
  {#if visible}
  <div class="loader"  style="align-content='center'; top:60px" ></div>
  <!-- <RingLoader size="100" color="#FF3E00" unit="px" duration="1s"
  class= "loader"
    style="float: left; index:999; align-content='center'; top=60px" />   -->
  {/if}
<table bind:this={tTable} on:click={onClick} style ="float: left;">
  <thead>
  <tr >
    <th  colspan="{sayPanelHeader()}" align="left">
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
  <div class="div_version" >версия 21.08 h</div>
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
  .spin_loader {
    border: 16px solid #f3f3f3;
    border-radius: 50%;
    border-top: 16px solid #3498db;
    width: 120px;
    height: 120px;
    -webkit-animation: spin 2s linear infinite; /* Safari */
    animation: spin 2s linear infinite;
    z-index: 999;
    float: left; 
    position: fixed;
    color:black
  }
.loader {
  border: 16px solid #f3f3f3;
  border-radius: 50%;
  border-top: 16px solid FireBrick;
  width: 120px;
  height: 120px;
  -webkit-animation: spin 2s linear infinite; /* Safari */
  animation: spin 2s linear infinite;
  /*display: none*/
  z-index: 999;
  float: left; 
  position: fixed;
  
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>