<script lang="ts">
    import { debug } from 'svelte/internal';

	
	import ComboboxAria from './ComboboxAria.svelte'
	
	let _width = "250px;"
	//let items = ['Сезон 1','Сезон 2','Сезон 3','Сезон 4']
	let items = [{ind:10,val:'item1'}, {ind:11,val:'item2'}, {ind:12,val:'item3'}, {ind:13,val:'item4'},];
	
	function onChangeMain() {
		// alert('Main: '+event.target.value);
	}
	let dialog : any
	function handleMessage(event: any) {
		/*if (dialog) {
			dialog.innerText = ''
			let len = event.detail.length
			for (let index = 0; index < len; index++) {
				dialog.innerText += event.detail[index].index+". "+event.detail[index].text+'\n';
				
			}
			//dialog.innerText =event.detail[0].index+". "+event.detail[0].text
			dialog.showModal()
		} */
	}
</script>

<!-- <dialog>
	
	
	<span>You can see me</span>
</dialog> -->
<table>
	<tr>
		<td>
			<ComboboxAria  on:message={handleMessage}  
			options={items} 
			width = {_width} />
		<!-- multiple --color="red" -->
		<!-- <Combo options={['one','two']} on:message={handleMessage}/> -->
		</td>
		<td></td>
	</tr>
</table>

<style>
</style>