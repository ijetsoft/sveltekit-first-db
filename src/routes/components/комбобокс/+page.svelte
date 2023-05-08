<script lang="ts">
	import Combo from './Combo.svelte'
	let name = 'world'
	let items = ['Сезон 1','Сезон 2','Сезон 3','Сезон 4']
	function onChangeMain() {
		// alert('Main: '+event.target.value);
	}
	let dialog : any
	function handleMessage(event: any) {
		dialog = document.querySelector("dialog") ;
		// alert(event.detail.text+'='+event.detail.index);
		
		if (dialog) {
			dialog.innerText =event.detail.index+". "+event.detail.text
			dialog.showModal()
		}
	}
</script>
<br><br><br><br>
<dialog>
	{@debug dialog}
	<span>You can see me</span>
</dialog>
<Combo options={items} on:message={handleMessage}></Combo>
<style>
	

	@media (min-width: 640px) {
		
	}
</style>