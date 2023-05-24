<script  lang="ts">
export let headerFlds = ['Company', 'Contact', 'Country'];
export let Rows = [
  {Company:'Alfreds Futterkiste', Contact:'Maria Anders', Country:'Germany'},
  {Company:'Centro comercial Moctezuma', Contact:'Francisco Changs', Country:'Mexico'},
  {Company:'Ernst Handele', Contact:'Roland Mendels', Country:'Austria'},
  {Company:'Island Trading', Contact:'Helen Bennett', Country:'UK'},
  {Company:'Laughing Bacchus Winecellars', Contact:'Yoshi Tannamuri', Country:'Canada'},
  {Company:'Magazzini Alimentari Riuniti', Contact:'Giovanni Rovelli', Country:'Italy'}
]
function handleMessage(event: any) {
		alert(event.target.tagName);
	}
</script>
<!-- <svelte:window  on:click={handleMessage}/> -->
<div><button >
	Click to say hello
</button></div>
{@debug headerFlds}
<table on:click={handleMessage}>
    <tr>
    {#each headerFlds as fld, i}
        <th on:message={handleMessage}>{fld}</th>
		{/each}
    </tr>
    <tbody>
    {#each Rows as row, i}
      <tr>
      {#each headerFlds as fld, i}
        <td>{row[fld]}</td>
		  {/each}
      </tr>
		{/each}
    </tbody>
  </table>
<style>
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
  /**/
  max-width: 400px;
  height: 240px;
  margin: 0 auto;
  display: block;
  overflow-x: auto;
  border-spacing: 0;
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
}
tbody {
  white-space: nowrap;
}
</style>