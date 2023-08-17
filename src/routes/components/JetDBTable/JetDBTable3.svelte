<script  lang="ts">
  import { Jumper, RingLoader } from 'svelte-loading-spinners';
  import {date2str, GetLastKey, Count, DeleteDBRecord, 
        getVocabTextValue, GetRangeRecordDB, getSVG} from './helper.svelte';
  import { supabase } from "$lib/supabaseClient.js";
  import {onMount, createEventDispatcher} from 'svelte';

  export let headerFlds : any; // для автономных таблиц
  export let dscFlds : any
  export let tblRows : any
  export let Width = '100%;'
  export let Height = '470px;'

  let nameTable = ''
  let nameKeyTable = ''
  let currRow = 1;
  let tBody: any

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
  alert('Resize: '+window.innerHeight+' '+window.innerWidth);
});
  function sayPanelHeader(){ return dscFlds.col.length}
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
function myFirst() { }
function myPrevPage() {}
function myPrev() {}
function myNext() {}
function myNextPage() {}
function myLast() {}
function thisView() {}
function addRecord() {}
function deleteRecord() {}
</script>
<!-- <h1>{nameTable}</h1>
<h2>{nameTable}</h2>
<h3>{nameTable}</h3> -->
<div id="my-grid-wrapper" style="overflow-x:auto; overflow-y: auto; width:{Width}; height:{Height}">
<table >
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
      on:click={myNextPage} style="display:none">
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
  <div class="div_version" >версия 17.08 w</div>
    </th>  
  </tr>
 
  <tr>
      <th> </th>
      {#if dscFlds} 
        {#each thisCol as fld, i}
            <th data-fld={fld.fld} text-align= "center">{@html sayHeader(fld.header)}  </th>
            <!-- <th data-fld={fld.fld}><button id={fld.fld}>{@html sayHeader(fld.header)}</button>  </th>             -->
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
</style>