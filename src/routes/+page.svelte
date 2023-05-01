<script>
	import Counter from './Counter.svelte';
	import welcome from '$lib/images/svelte-welcome.webp';
	import welcome_fallback from '$lib/images/svelte-welcome.png';
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<!-- <section> -->
	<h1>
		<span class="welcome">
			<picture>
				<source srcset={welcome} type="image/webp" />
				<img src={welcome_fallback} alt="Welcome" />
			</picture>
		</span>
		<table>
			<tr>
				<td width="50%" style="top: 0%;"><p>DevOps-стек<br>технологий: </p></td>
				<td align="left" style="border-left: 1px;">
					<ul style="font-size: larger;">
						<li>Node.js</li>					
						<li>Svelte/SvelteKit</li>		
						<li>vite</li>												
						<li>GitHub</li>																		
						<li>DBaaS <b>Supabase</b></li>																		
						<li>Netlify</li>						
					</ul>
				</td>
				<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
				<td align="left">
					Пример компонента:
				<br/>
				<Counter /></td>
			</tr>
		</table>
		
	</h1>
<!-- </section> -->

	


<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}
	

	h1 {
		width: 100%;
	}

	.welcome {
		display: block;
		position: relative;
		width: 100%;
		height: 0;
		padding: 0 0 calc(100% * 495 / 2048) 0;
	}

	.welcome img {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		display: block;
	}
</style>
