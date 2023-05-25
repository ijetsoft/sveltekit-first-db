<script  lang="ts">
  import Navigator from './../navigator/+page.svelte';
  export let headerFlds = ['Company', 'Contact', 'Country'];
  export let dscFlds : any
  export let tblRows : any
   export let Rows = [
     {Company:'Alfreds Futterkiste', Contact:'Maria Anders', Country:'Germany'},
     {Company:'Centro comercial Moctezuma', Contact:'Francisco Changs', Country:'Mexico'},
     {Company:'Ernst Handele', Contact:'Roland Mendels', Country:'Austria'},
     {Company:'Island Trading', Contact:'Helen Bennett', Country:'UK'},
     {Company:'Laughing Bacchus Winecellars', Contact:'Yoshi Tannamuri', Country:'Canada'},
     {Company:'Magazzini Alimentari Riuniti', Contact:'Giovanni Rovelli', Country:'Italy'}
   ]
  let nameFlds = Object.keys(Rows[0])
  function handleMessage(event: any) {
      alert(event.target.tagName);
	}
  function sayHeader(parm: string){
    return   parm
    //return  '<th>{@html parm}</th>'
  }
  function sayCell(parm: string){
    return   parm
    //return  '<th>{@html parm}</th>'
  }
</script>
<!-- <svelte:window  on:click={handleMessage}/> -->
<div><Navigator></Navigator>
  
<table on:click={handleMessage}>
    <tr>
      {#if dscFlds} 
      <th></th>
      {#each dscFlds.col as fld, i}
        <th> {@html sayHeader(fld.header)} </th>
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
              <td>{row[colFld.fld]}</td>
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
  max-width: 400px;
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