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
	import cdci from '$lib/images/CD-CI.png';
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<!-- <section> -->
	<h1>
		<img src={DevOps} alt="DevOps" />
		<p><a href="https://en.wikipedia.org/wiki/DevOps">DevOps</a>-стек технологий: <i class="far fa-thumbs-up"></i></p>
		<ul style="font-size: larger; ">
			<li><div class="corner">
				<img src={node} alt="Node.js" />
				<a href="https://en.wikipedia.org/wiki/Node.js">Node.js</a>
			</li>					
			<li><div class="corner">
				<img src={typescript} alt="TypeScript" />
				<a href="https://en.wikipedia.org/wiki/TypeScript">TypeScript</a>
				</li>	
			<li><div class="corner">
				<a href="https://kit.svelte.dev">
				<img src={logo} alt="SvelteKit" title="SvelteKit"/></a>
				<a href="https://en.wikipedia.org/wiki/Svelte">Svelte/SvelteKit</a>
				</div></li>		
			<li><div class="corner">
				<a href="https://vitejs.dev/">
				<img src={vite} alt="Vite" /></a>
				<a href="https://en.wikipedia.org/wiki/Vite_(software)">vite</a>
				</div></li>												
			<li><div class="corner">
				<a href="https://github.com"  title="github">
				<img src={github} alt="GitHub" /></a>
				<a href="https://en.wikipedia.org/wiki/GitHub">GitHub</a>
			</div></li>																		
			<li><div class="corner">
				<a href="https://supabase.com/" title="supabase"> 
				<img src={supabase} alt="supabase" /> </a>
				<a href="https://en.wikipedia.org/wiki/Cloud_database">DBaaS <b>Supabase</b></a>
			</div></li>
			<li><div class="corner">
				<a href="https://www.netlify.com/" title="Netlify">
				<img src={netlify} alt="Netlify" /></a>
				<a href="https://en.wikipedia.org/wiki/Netlify">Netlify</a>
			<li><div class="corner">
				<img src={cdci} alt="CD-CI" />
					<a href="https://en.wikipedia.org/wiki/Continuous_integration">CD-CI</a>
				</div></li>												
									
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
	font-size: 2em;
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
