<script>
	export let options = ['item1', 'item2', 'item3', 'item4'];
	//export let displayText = a => a.text;
	let name = 'world';
	export let defaultOnChange = onChange
	function onChange() {
		// console.log(event.target.value);
}
</script>

<select class="seazon" on:change={defaultOnChange}>
	{#each options as option, i}
		<option value={i}>{option}</option>
	{/each}
     
  </select>
<style>
select {
padding: 5px 100px 5px 5px; 
	/* 100px required to make sure image displays */
font-size: 16px;
border: 1px solid #19247c;
height: 34px;
border-radius: 10px;
-webkit-appearance: none;
-moz-appearance: none;
appearance: none;
background: url("./icon.png") 96% / 15% no-repeat #9393ff;
}
</style>