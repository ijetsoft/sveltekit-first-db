<script  lang="ts">
  import {onMount} from 'svelte';
  import Navigator from './../navigator/+page.svelte';
  export let headerFlds = ['Company', 'Contact', 'Country'];
  export let dscFlds : any
  export let tblRows : any
  export let width = '400px'
   export let Rows = [
     {Company:'Alfreds Futterkiste', Contact:'Maria Anders', Country:'Germany'},
     {Company:'Centro comercial Moctezuma', Contact:'Francisco Changs', Country:'Mexico'},
     {Company:'Ernst Handele', Contact:'Roland Mendels', Country:'Austria'},
     {Company:'Island Trading', Contact:'Helen Bennett', Country:'UK'},
     {Company:'Laughing Bacchus Winecellars', Contact:'Yoshi Tannamuri', Country:'Canada'},
     {Company:'Magazzini Alimentari Riuniti', Contact:'Giovanni Rovelli', Country:'Italy'}
   ]
   const triangle = `<i class="fa-solid fa-caret-right"></i>`
  let currRow = 1;
  let nameFlds = Object.keys(Rows[0])
  function handleMessage(event: any) {
    if (event.target.tagName === "TD") {
      let tBody = event.target.parentNode.parentNode ;
      tBody.children[currRow-1].children[0].innerHTML = ""
      currRow = event.target.parentNode.rowIndex
      tBody.children[currRow-1].children[0].innerHTML = triangle
      // alert("tBody "+tBody.children[currRow-1].children[0].innerHTML);
      // alert("Row # "+currRow);
    }
    

      
	}
  function sayHeader(parm: string){
    return   parm
    //return  '<th>{@html parm}</th>'
  }
  function sayCell(parmRow: any, parmDSCCol: any){
    let ret = parmRow[parmDSCCol.fld]
    // if (parmDSCCol.fld[0] == '_') {
    //     let vocFld = parmDSCCol.fld.slice(1); 
    //     let vocVal = parmRow[vocFld]
    //     ret += '<td>'+getVocab(vocFld, voc, vocVal)+'</td>';
    //   }
    //   else {
    //     if (parmDSCCol.type == 'memo') {ret += '<button class="mini">...</button>'}
    //   }
    return  ret
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
  function getVocab(parmName: string, parmVoc: any, parmVal: any) {
    let a =  parmVoc.find((item:any) => item.name == parmName);
    let vocQry = a.qry.data
    let nameKey = Object.entries(vocQry[0])[0][0]
    let nameVal = Object.entries(vocQry[0])[1][0]
    let vocabRecs = vocQry.find((itemV:any) => itemV[nameKey] === parmVal);
    let retVal = ''; if (vocabRecs) retVal = vocabRecs[nameVal]
    return retVal
  }
  onMount(() => {

}  )
</script>
<!-- <svelte:window  on:click={handleMessage}/> -->
<div><Navigator></Navigator>
  
<table on:click={handleMessage} style="max-width: {width};">
    <tr>
      {#if dscFlds} 
      <th></th>
      {#each dscFlds.col as fld, i}
        {#if !(fld.type == 'key' || fld.type == 'image')} 
          <th> {@html sayHeader(fld.header)} </th>
        {/if} 
        
      {/each}
      {:else if headerFlds} 
        {#each headerFlds as fld, i}
          <th>{fld}</th>
        {/each}

      {/if} 
    </tr>
    <tbody>
      {#if tblRows} 
        {#each tblRows.data as row, i}
          <tr>
          <td>{#if i===0} <i class="fa-solid fa-caret-right"></i>{/if}</td>
            {#each dscFlds.col as colFld, i}
              <!-- {@debug colFld}  -->
              {#if !(colFld.type == 'key' || colFld.type == 'image')} 
              {@html '<td '+getStyle(colFld)+'>'+ sayCell(row,colFld)+'</td>'}
                
                <!-- <td>{row[colFld.fld]}</td>                 -->
              {/if}
            {/each}

            <!-- {#each nameFlds as fld, i}
              <td>{row[fld]}</td>
            {/each} -->
            </tr>
          {/each}
        {:else if Rows} 
          {#each Rows as row, i}
            <tr>
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
  /**/
 
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

tr:nth-child(even) {
  background-color: #dddddd;
}
tr:hover { background-color: rgb(202, 101, 101); color: white}
/**/
th {
  position: sticky;
  top: 0;
  vertical-align: bottom;
  text-align: center;
}
tbody {
  white-space: nowrap;
}
</style>