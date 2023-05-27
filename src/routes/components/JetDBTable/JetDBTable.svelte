<script  lang="ts">
  import {onMount} from 'svelte';
  import Navigator from './../navigator/+page.svelte';
    import { debug } from 'svelte/internal';
    export let dscFlds : any
  export let tblRows : any
  export let Width = '400px;'

  export let headerFlds : any;// = ['nameCol1', 'nameCol2', 'nameCol3'];
  export let Rows : any = []
  let nameFlds : any; if (Rows.length > 0) nameFlds = Object.keys(Rows[0])
  
    let thisDS = ''; if (dscFlds) thisDS = tblRows[dscFlds.name].data
  let thisVoc = {}; if (dscFlds) thisVoc =  tblRows.voc
  const triangle = `<i class="fa-solid fa-caret-right"></i>`
  let currRow = 1;
  function setMarkRow(parm: any) {
    // let tBody = event.target.parentNode.parentNode ;
       tBody.children[currRow-1].children[0].innerHTML = ""
       currRow = parm //event.target.parentNode.rowIndex
       tBody.children[currRow-1].children[0].innerHTML = triangle
  }
function handleMessage(event: any) {
  let ind = event.target.parentNode.rowIndex
  setMarkRow(ind)
	//alert(event.target.tagName);
	}
  function sayHeader(parm: string){
    return   parm
    //return  '<th>{@html parm}</th>'
  }
  function sayCell(parmRow: any, parmDSCCol: any){
    let ret = parmRow[parmDSCCol.fld]
    if (parmDSCCol.fld[0] == '_') {
         let vocFld = parmDSCCol.fld.slice(1); 
         let vocVal = parmRow[vocFld]
         ret = getVocab(vocFld, vocVal);
       }
       else {
         if (parmDSCCol.type == 'memo') {ret += '<button class="mini">...</button>'}
    }
    return  ret
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
  function getStyle(parmDSCCol: any){
    switch (parmDSCCol.type) {
      case 'number':
        return  'style = "text-align: right"'
        break;
      case 'bool':
      case 'date':
      return  'style = "text-align: center"'
      default:
        break;
    }
    return ''
  }
  let tBody: any
  onMount(() => {
    setMarkRow(1)
    //{@debug tbody}
      //  let myPlace: any = document.querySelector(".placeHold") ;
      //  myPlace.innerHTML = formView(dscProducts, db.product, db.voc);
    } )
  let thisCol = {}
  if (dscFlds) thisCol = dscFlds.col.filter(fld => !(fld.type == 'key' || fld.type == 'image' || fld.ref));
</script>
<!-- <svelte:window  on:click={handleMessage}/> -->
<div><Navigator></Navigator>
 
<table on:click={handleMessage} style ="max-width:{Width}">
    <tr>
      <th> </th>
      {#if dscFlds} 
        {#each thisCol as fld, i}
        <!-- {#each dscFlds.col as fld, i} -->
          <!-- {#if !(fld.type == 'key' || fld.type == 'image' || fld.ref)}  -->
            <th> {@html sayHeader(fld.header)} </th>
          <!-- {/if}  -->
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
            <!-- {#each dscFlds.col as colFld, i} -->
             
            <!-- {#if !(colFld.type == 'key' || colFld.type == 'image')|| !(colFld.ref==='')} -->
             <!-- {@debug colFld}  -->
              {@html '<td '+getStyle(colFld)+'>'+ sayCell(row,colFld)+'</td>'}
                
                <!-- <td>{row[colFld.fld]}</td>                 -->
              <!-- {/if} -->
            {/each}

            <!-- {#each nameFlds as fld, i}
              <td>{row[fld]}</td>
            {/each} -->
            </tr>
          {/each}
        {:else if Rows} 
          {#each Rows as row, i}
            <tr>
            <td></td>
            {#each nameFlds as fld, i}
              <td>{row[fld]}</td>
            {/each} 
            </tr>
          {/each}  
        {/if} 
        </tbody>
    
    
    
  </table>
</div>
<style>
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
  /*
  max-width: 400px; */
  height: 240px;
  margin: 0 ;/*auto;*/
  display: block;
  overflow-x: auto;
  border-spacing: 0;
  margin-top: 2px;
}
th { background-color:maroon;color:white;}
td, th {
  border: 1px solid #777;
  text-align: left;
  padding: 8px;
}
tr:hover { background-color: rgb(202, 101, 101); color: white}
tr:nth-child(even) {
  background-color: #dddddd;
}

/**/
th {
  position: sticky;
  top: 0;
  vertical-align: bottom;
}
tbody {
  white-space: nowrap;
}
</style>