<script  lang="ts">
	import Dialog from './Dialog.svelte';
	let dialog: any;
  </script>
   
  <div>
	<button on:click={() => dialog.showModal()}>Open Dialog</button>
  </div>
   {@debug dialog}
  <Dialog title="Test Dialog" bind:dialog bkgHeaderColor = 'maroon'>
	My dialog content is very, very long.<br>
	It will not wrap by default.
  </Dialog>
  