<script lang="ts">
    import { debug } from 'svelte/internal';

	
	import Combo from './Combo.svelte'
	let name = 'world'
	let _width = "250px;"
	//let items = ['Сезон 1','Сезон 2','Сезон 3','Сезон 4']
	let items = [{ind:10,val:'item1'}, {ind:11,val:'item2'}, {ind:12,val:'item3'}, {ind:13,val:'item4'},];
	
	function onChangeMain() {
		// alert('Main: '+event.target.value);
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
</script>

<!-- <dialog>
	
	
	<span>You can see me</span>
</dialog> -->
<table>
	<tr>
		<td>
			<Combo  on:message={handleMessage}  
			options={items} 
			width = {_width} />
		<!-- multiple --color="red" -->
		<!-- <Combo options={['one','two']} on:message={handleMessage}/> -->
		</td>
		<td></td>
	</tr>
</table>

<p>Примеры использования:</p>
<p>1. {'<'}Combo{'>'}</p>
<p>2. {'<'}Combo options={'{'}{'['}"'one','two','three'"{'}'}{']'}{'>'} </p>
<p>3. let items = "['Сезон 1','Сезон 2','Сезон 3','Сезон 4']"<br>
	{'<'}Combo options={'{'}items{'}'}}{'>'} </p>
<p>4. let items = [{'{'}ind:10,val:'item1'{'}'},{'{'}ind:20,val:'item2'{'}'},{'}'}]<br>
		{'<'}Combo options={'{'}items{'}'}}{'>'} </p>
<style>
	

	@media (min-width: 640px) {
		
	}
</style>