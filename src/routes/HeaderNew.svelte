<script>
	import { page } from '$app/stores';
	import logo from '$lib/images/svelte-logo.svg';
	import github from '$lib/images/github.svg';
	import netlify from '$lib/images/netlify-logo.png';
	import supabase from '$lib/images/supabase-logo.png';
</script>

<header>

	<!-- <nav> -->
		<ul>
			<li aria-current={$page.url.pathname === '/' ? 'page' : undefined}>
				<a href="/">  ● Home&nbsp;</a>
			</li>
			<li aria-current={$page.url.pathname === '/about' ? 'page' : undefined}>
				<a href="/about">  ● About&nbsp;</a>
			</li>
			<li aria-current={$page.url.pathname.startsWith('/components') ? 'page' : undefined}>
				<a href="/components">  ● Компоненты&nbsp;</a>
			</li>
			<li aria-current={$page.url.pathname.startsWith('/db') ? 'page' : undefined}>
				<a href="/db">  ● БД&nbsp;</a>
			</li>

		</ul>
	<!-- </nav>

	</nav>

	<div class="corner"></div> -->
</header>

<style>
	header {
		display: flex;
		justify-content: space-between;

overflow: hidden;
  
  position: fixed;
  bottom: 0;
  width: 100%;
	}

	.corner {
		width: 3em;
		height: 3em;
	}

	

	nav {
		display: flex;
		justify-content: center;
		--background: rgba(255, 255, 255, 0.7);
	}

	svg {
		width: 2em;
		height: 3em;
		display: block;
	}

	path {
		fill: var(--background);
	}

	 ul {
		position: relative;
		padding: 0;
		margin: 0;
		height: 1.5em;
		display: flex;
		justify-content: center;
		align-items: center;
		list-style: none;
		background: lightgray;		 
		/* background: var(--background); */
		background-size: contain;
		width: 100%;
	}

	li {
		position: relative;
		height: 100%;
		font-size: 2em;
		padding: 15px 10px 0px 10px;
	}
/*
	li[aria-current='page']::before {
		--size: 6px;
		content: '';
		width: 0;
		height: 0;
		position: absolute;
		top: 0;
		left: calc(50% - var(--size));
		border: var(--size) solid transparent;
		border-top: var(--size) solid var(--color-theme-1);
		font-size: 2em;
	}*/

	nav a {
		display: flex;
		height: 100%;
		align-items: center;
		padding: 0 0.5rem;
		color: var(--color-text);
		font-weight: 700;
		font-size: 0.7em;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		text-decoration: none;
		transition: color 0.2s linear;
	}

	a:hover {
		color: var(--color-theme-1);
	} 
@media screen and (min-width: 601px) {
      li {
    font-size: 1em;
  }
}

@media screen and (max-width: 600px) {
  li {
    font-size: 2em;
  }
}
</style>
