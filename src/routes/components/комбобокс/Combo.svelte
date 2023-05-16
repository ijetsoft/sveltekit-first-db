<script lang="ts">
	import {onMount} from 'svelte';
	// import { faTimes } from "@fortawesome/free-solid-svg-icons/faTimes";
	// https://freefrontend.com/css-select-boxes/
	// https://codepen.io/5t3ph/pen/MWyyYNz
	export let options = [{ind:0,val:'item1'}, {ind:1,val:'item2'}, {ind:2,val:'item3'}, {ind:3,val:'item4'},];
	//export let options = ['item1', 'item2', 'item3', 'item4'];
	export let style = '';
	export let multiple = false;
	export let height = '34px';
	export let width = "250px;"
	
	let mode = typeof(options[0])=="string" ? 0 : 1
	if (multiple) height = '100px';
	//onMount(() => alert(typeof(options[0])));
	
	
	//let selElement = document.querySelector("select")
	// function onMount() {
	// 	// selElement = document.querySelector("select")
	// 	// if (selElement) {
	// 	// 	selElement.style.width = "300px";
	// 	// 	if (multiple) {selElement.style.height = "100px";}
	// 	// }
	// 	// if (style!=='') {
	// 	// 	let sSheet = document.styleSheets[0];
	// 	// 	sSheet.insertRule('Combo { '+style+' }', sSheet.cssRules.length);
	// 	// }
	//  	//alert(typeof(options))
	//  }
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
		let sSheet = document.styleSheets[0];
		if (sSheet.insertRule) {
     		sSheet.insertRule('p {background-color: LemonChiffon}', sSheet.cssRules.length);
		}
		
		let myPlace: any = document.querySelector(".placeHold") ;
		onMount(() => {
		 	myPlace= document.querySelector(".placeHold"); 
			myPlace.innerHTML = addHTML();
			alert(options[0].val)
			alert(myPlace.innerHTML)
		});
		 function addHTML() {
			let ret = '<select';
			ret += ' style ="width:'+width+';"'
			ret += '>'
			let sN = '';
			for (let index = 0; index < options.length; index++) {
				sN = index.toString()
				ret += '<option value='+sN+'> '+options[index].val+'</option>';
				
			}
      	 	return ret+'</select>'
    	 }  
	</script>
	
	<p class='placeHold'>****</p>
	{@debug myPlace}
	<select style="width: {width}; height:{height};" on:change={onChange} {multiple}>
		
		{#each options as option, i}
			{#if mode === 0} 	
				<option value={i}> {option}</option>
			{/if}
			{#if mode === 1} 	
				<option value={option.ind}> * {option.val}</option>
			{/if}
		{/each}
		
	</select>
	<dialog>
		{@debug style, width}
		<span>You can see me</span>
	</dialog>
	<style>
select {
	padding: 5px 100px 5px 5px; 
		/* 100px required to make sure image displays */
	font-size: 16px;
	border: 1px solid #19247c;
	height: 34px;
	width: 250px;
	border-radius: 10px;
	-webkit-appearance: none;
	-moz-appearance: none;
	/* appearance: none; */
	appearance: button;
	color: var(--color);
	/* background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" height="100" width="100"><path d="M97.625 25.3l-4.813-4.89c-1.668-1.606-3.616-2.41-5.84-2.41-2.27 0-4.194.804-5.777 2.41L50 52.087 18.806 20.412C17.223 18.805 15.298 18 13.03 18c-2.225 0-4.172.804-5.84 2.41l-4.75 4.89C.813 26.95 0 28.927 0 31.23c0 2.346.814 4.301 2.439 5.865l41.784 42.428C45.764 81.174 47.689 82 50 82c2.268 0 4.215-.826 5.84-2.476l41.784-42.428c1.584-1.608 2.376-3.563 2.376-5.865 0-2.26-.792-4.236-2.375-5.932z"/></svg>') 96% / 15% no-repeat #9393ff; */
/* background: url("./icon.png") 96% / 15% no-repeat #9393ff; */
}

</style>