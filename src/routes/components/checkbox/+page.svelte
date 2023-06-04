<script  lang="ts">
	import Checkbox from './Checkbox.svelte';
	let styles = {
		'note-bg-color': '#f4ed2a',
		'note-color': '#FF5555',
		'bg': '#AAAAAA',
	};
  $: cssVarStyles = Object.entries(styles)
		.map(([key, value]) => `--${key}:${value}`)
		.join(';');
  </script>
   
   <h1>Custom Checkboxes</h1>
   <Checkbox text="One" checked={true} --bkgHeaderColor={styles['note-color']}></Checkbox>
   <Checkbox text="Two" --bkgHeaderColor='maroon'></Checkbox>

   <label>
		<input style="padding:0" type="color" bind:value={styles['note-color']} /> 
		Выбор цвета фона для значения "checked"
	</label>
  
  <div id="top" style="{cssVarStyles}">
    <h1 class="note" style="font-weight:600">Some text!</h1>
  </div>

  <style>
#top {
		background-color: var(--bg, lightgray);
		height: 100%;
	}
	
	.note {
		color: var(--note-color, tomato);
		background-color: var(--note-bg-color, lightgray);
	}

	.yellow-theme {
		--note-color: black;
		--note-bg-color: khaki;
	}

	.purple-note-text {
		--note-color: rebeccapurple;
   } 
  </style>
  