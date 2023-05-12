<script lang="ts">
	  import {onMount} from 'svelte';
	//import {onMount} from 'svelte';
	// import { faTimes } from "@fortawesome/free-solid-svg-icons/faTimes";
	// https://freefrontend.com/css-select-boxes/
	// https://codepen.io/5t3ph/pen/MWyyYNz
	export let options = [{ind:0,val:'item1'}, {ind:1,val:'item2'}, {ind:2,val:'item3'}, {ind:3,val:'item4'},];
	//export let options = ['item1', 'item2', 'item3', 'item4'];
	export let width = '300px';
	export let multiple = false;
	let mode = typeof(options[0])=="string" ? 0 : 1
	//onMount(() => alert(typeof(options[0])));
	 onMount(() => {
	 	const selElement = document.querySelector("select")
	 	if (selElement) {
	 		selElement.style.width = width;
			if (multiple) {
				selElement.setAttribute('multiple', '');
				selElement.style.height = '100px'
			}			
	 	}

	 });
	// const selElement = document.querySelector("select")
	// if (selElement) {
	// 	//selElement.setAttribute("width", width);
	// 	selElement.style.width = '200px';
	// }

	//if (selElement) {selElement.setAttribute("multiple", "");}

	// function onMount() {
	// 	alert(typeof(options))
	// }
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	function onChange(event: { currentTarget: HTMLSelectElement }) {
		let x = event.currentTarget.selectedOptions[0].text
		let len = event.currentTarget.selectedOptions.length;
		let retArr : any[] = [{index: event.currentTarget.selectedOptions[0].value,
			text: event.currentTarget.selectedOptions[0].text}]
		if (len > 1) {
			for (let i = 1; i < len; i++) {
			retArr.push({index: event.currentTarget.selectedOptions[i].value,
			text: event.currentTarget.selectedOptions[i].text}); 
		}
		}
		
		//alert(event.currentTarget.value+' '+x)
		
		dispatch('message', retArr)
		//retArr.unshift(element);
		// retArr.push({index: event.currentTarget.value,
		// 	text: event.currentTarget.selectedOptions[0].text});
		// dispatch('message', {
		// 	[{index: event.currentTarget.value,
		// 	text: event.currentTarget.selectedOptions[0].text}]
		// });
	}
	function handleClick() {
		alert('clicked');
	}
</script>
<dialog>
	{@debug mode}
	<span>You can see me</span>
</dialog>

<select class="seazon" on:change={onChange} >
	<!-- <select style="height: 100px;" class="seazon" on:change={onChange} multiple></select> -->
	
	{#each options as option, i}
		{#if mode === 0} 	
			<option value={i}> {option}</option>
		{/if}
		{#if mode === 1} 	
		<!-- disabled -->
			<option  value={option.ind}> {option.val}</option>
		{/if}
	{/each}
     
  </select>
<style>
	
select {
	background-color: LemonChiffon;
	color: maroon;
	padding: 5px 100px 5px 5px; 
		/* 100px required to make sure image displays */
	font-size: 16px;
	border: 1px solid #19247c;
	height: 34px;
	border-radius: 10px;
	-webkit-appearance: none;
	-moz-appearance: none;
	appearance: none;
	/* background: url("./icon.png") 96% / 15% no-repeat #9393ff; */
}
</style>