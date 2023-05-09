<script>
	import Counter from './Counter.svelte';
	import welcome from '$lib/images/svelte-welcome.webp';
	import welcome_fallback from '$lib/images/svelte-welcome.png';
	import DevOps from '$lib/images/DevOpsLoop.webp';
	import logo from '$lib/images/svelte-logo.svg';
	import github from '$lib/images/github.svg';
	import netlify from '$lib/images/netlify-logo.png';
	import supabase from '$lib/images/supabase-logo.png';
	import vite from '$lib/images/Vitejs-logo.svg.png';
	import typescript from '$lib/images/TypeScript_round.png';
	import node from '$lib/images/node.jpg';
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<!-- <section> -->
	<h1>
		<img src={DevOps} alt="DevOps" />
		<p>DevOps-стек технологий: </p>
		<ul style="font-size: larger; ">
			<li><div class="corner"><img src={node} alt="TypeScript" />Node.js</li>					
			<li><div class="corner"><img src={typescript} alt="TypeScript" />TypeScript</li>	
			<li><div class="corner"><img src={logo} alt="Svelte" />Svelte/SvelteKit</div></li>		
			<li><div class="corner"><img src={vite} alt="Vite" />vite</li>												
			<li><div class="corner"><img src={github} alt="GitHub" />GitHub</li>																		
			<li><div class="corner"><img src={supabase} alt="Supabase" />DBaaS <b>Supabase</b></li>																		
			<li><div class="corner"><img src={netlify} alt="Netlify" />Netlify</li>						
		</ul>
		<span class="welcome">
			<picture>
				<source srcset={welcome} type="image/webp" />
				<img src={welcome_fallback} alt="Welcome" />
			</picture>
		</span>
	</h1>
<!-- </section> -->

	


<style>
	.corner img {
		width: 1em;
		height: 1em;
		object-fit: contain;
	}
	ul { 
	display: inline-block; 
	text-align: left; 
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
