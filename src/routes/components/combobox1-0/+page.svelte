<script lang="ts">
    import { debug } from 'svelte/internal';
	import Context from "./Context.svelte"
	
	import Combo from './Combox1-0.svelte'
	import Combox2 from './Combox2.svelte'
	let _width = "450px;"
	//let items = ['Сезон 1','Сезон 2','Сезон 3','Сезон 4']
	let items = [{ind:10,val:'item1'}, {ind:11,val:'item2'}, {ind:12,val:'item3'}, {ind:13,val:'item4'},];
	function onChangeCombo2(name: string, value:any) {
		alert('Main.Combo2: '+name+' = '+value);
	}
	function onChangeMain(event:any) {
		alert('Main: '+event.target.value);
	}
	let dialog : any
	function handleMessage(event: any) {
		/* dialog = document.querySelector("dialog") ;
		// alert(event.detail.text+'='+event.detail.index);
		
		if (dialog) {
			dialog.innerText = ''
			let len = event.detail.length
			for (let index = 0; index < len; index++) {
				dialog.innerText += event.detail[index].index+". "+event.detail[index].text+'\n';
				
			}
			//dialog.innerText =event.detail[0].index+". "+event.detail[0].text
			dialog.showModal()
		} */
	}
	function onClick(event: any) {	
		let b = document.body
		let el = document.querySelectorAll("Combox2");
		// alert(event.detail.text+'='+event.detail.index);
		if (el) alert('FIND')
	}
</script>
{@debug _width}
<!-- <dialog>
	
	
	<span>You can see me</span>
</dialog> -->
<Context>
<button on:click={onClick}> GO </button>
	<Combox2 on:input
	onChange = {onChangeCombo2}
		label="Cities"
		name="myNameField"
		placeholder="Type to search..."
		options={[
    	{ text: "Istanbul", value: "istanbul" },
    	{ text: "London", value: "london" },
			{ text: "Paris", value: "paris" },
			{ text: "Seoul", value: "seoul", disabled: true },
			{ text: "Fukuoka", value: "fukuoka" },
			{ text: "Kuala Lumpur", value: "kuala-lumpur" },
			{ text: "Amman", value: "amman" },
  	]}
	/>
</Context>
<p>====</p>
<table>
	<tr>
		<td>
			<Combo  on:message={handleMessage}  
			options={ items} 
			onChange = {onChangeMain}
			width = {_width} /> 
		<!-- multiple --color="red" -->
		<!-- <Combo options={['one','two']} on:message={handleMessage}/> -->
		</td>
		<td></td>
	</tr>
</table>

