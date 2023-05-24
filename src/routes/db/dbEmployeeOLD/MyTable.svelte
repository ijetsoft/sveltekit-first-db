<script>
	// https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/Svelte_TypeScript
	export let options = ['item1', 'item2', 'item3', 'item4'];
	
	let name = 'world';
	
</script>
<table style="width: 30%; margin-top: 50px; ">
    <tr>
      {#each options as colfld }
         <th>{colfld}</th> 
      {/each}
	</tr>
</table>
<p style="margin-top: 50px; ">*****{options[0]}</p>

<style>
 table {  border-collapse: collapse; }
    /* th, td { border: solid 1px #777;  } */
    th { background-color:lightblue;}
    tr:nth-child(even) {
    background-color: #eee;
	}
</style>