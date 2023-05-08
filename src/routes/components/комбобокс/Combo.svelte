<script lang="ts">
	// https://freefrontend.com/css-select-boxes/
	// https://codepen.io/5t3ph/pen/MWyyYNz
	export let options = ['item1', 'item2', 'item3', 'item4'];
	//export let displayText = a => a.text;
	let name = 'world';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	function onChange(event: { currentTarget: HTMLSelectElement }) {
		let x = event.currentTarget.selectedOptions[0].text
		//alert(event.currentTarget.value+' '+x)
		dispatch('message', {
			index: event.currentTarget.value,
			text: event.currentTarget.selectedOptions[0].text
		});
	}
	function handleClick() {
		alert('clicked');
	}
</script>
<dialog>
	<span>You can see me</span>
</dialog>
  
<select class="seazon" on:change={onChange}>
	<!-- <select class="seazon" on:change={handleClick}>	 -->
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