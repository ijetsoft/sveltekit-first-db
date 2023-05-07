<script>
	import Combo from './components/Combo.svelte'
	let name = 'world'
	let items = ['Сезон 1','Сезон 2','Сезон 3','Сезон 4']
	function onChangeMain(event) {
		alert('Main: '+event.target.value);
}
</script>

<main>
	<h1>Hello {name} from JetSoft!</h1>
	<p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>
</main>
<Combo options={items} defaultOnChange={onChangeMain}></Combo>
<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>