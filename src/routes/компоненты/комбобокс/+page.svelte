<script>
	import Combo from './components/Combo.svelte'
	let name = 'world'
	let items = ['Сезон 1','Сезон 2','Сезон 3','Сезон 4']
	function onChangeMain() {
		// alert('Main: '+event.target.value);
}
</script>
<br><br><br><br>
<Combo options={items} defaultOnChange={onChangeMain}></Combo>
<style>
	

	@media (min-width: 640px) {
		
	}
</style>