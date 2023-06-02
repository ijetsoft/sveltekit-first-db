<script  lang="ts">
    //import dialogPolyfill from 'dialog-polyfill';
	import {createEventDispatcher, onMount} from 'svelte';
   
	export let canClose = true;                                
	export let className = '';                                 
	export let dialog: any = null;    
	export let header: any = null                               
	export let icon: any = undefined;                               
	export let title: any = '***';     
   export let body = ''  

   export let bkgHeaderColor = '';   
   export let dsc: any = null
   export let DS: any = null
  
	const  dispatch = createEventDispatcher();
   
	$: classNames = 'dialog' + (className ? ' ' + className : '');
   
	//onMount(() => dialogPolyfill.registerDialog(dialog));      
    
	function close() {
	  dispatch('close');                                       
  	  dialog.close();
	}
    let stylish=''
    onMount(() => {
		header.style.backgroundColor = bkgHeaderColor
		//if (dsc) body = dsc.col.length+' *'
		//header.setAttribute('background-color', 'maroon');
	});
	function sayCell(parmRow: any, parmDSCCol: any){
    let ret = parmRow[parmDSCCol.fld]
    if (parmDSCCol.fld[0] == '_') {
         let vocFld = parmDSCCol.fld.slice(1); 
         let vocVal = parmRow[vocFld]
         //ret = getVocab(vocFld, vocVal);
       }
       else {
        switch (parmDSCCol.type) {
          case 'date':
            //ret = date2str(ret, 'dd.MM.yy')
            break;
          case 'memo':
            ret = '<button class="mini" data-value="'+ret+'">...</button>'
            break;
          case 'bool':        
            ret = ret === '0' ? '<i class="fa-regular fa-square"></i>' : '<i class="fa-regular fa-square-check"></i>'
          default:
            break;
        }
         //if (parmDSCCol.type == 'memo') {ret += '<button class="mini">...</button>'}
    }
    return  ret
  }
	let thisCol = {}
    if (dsc) thisCol = dsc.col.filter(fld => !(fld.type == 'key' || fld.type == 'image' || fld.ref));
  </script>
   <div style={stylish}>
	
</div>
{@debug title}
  <dialog bind:this={dialog} class={classNames}>               
  	<header bind:this={header}>
	  {#if icon}{icon}{/if}
	  <div class="title">{title}</div>
	  {#if canClose}
		<button class="close-btn" on:click={close}>
		  &#x2716;                                             
  		</button>
	  {/if}
	</header>
	<main>      
        {@html body}
           {#if dsc}
			{#each dsc.col as fld}
				{#if !(fld.type == 'key' || fld.type == 'image' || fld.ref)}  
			 		<label> {fld.header}</label><br>
				 	<input type="text" name="+{fld.fld}+" id="+{fld.fld}+
					" required value="{sayCell(DS, fld)}"><br>			 
				{/if}  
			{/each}
		   {/if}                                  
  	  <slot />                                                 
  
	</main>
  </dialog>
  
  <style>
	.body {
	  /* padding: 10px; */
	}
   
	.close-btn {
	  background-color: transparent;
	  border: none;
	  color: white;
	  cursor: pointer;
	  font-size: 18px;
	  outline: none;
	  margin: 0;
	  padding: 0;
	}
   
	dialog {
	  /* position: fixed; */
	  top:  90%;/*center;50%;*/
	  transform: translate(0, -50%);
	  border-radius: 5px;
   
	  border: none;
	  box-shadow: 0 0 10px darkgray;
	  padding: 0;
	  width: 400px;
	}
   
	header {
	  display: flex;
	  justify-content: space-between;
	  align-items: center;
   
	  background-color: cornflowerblue;
	  box-sizing: border-box;
	  color: white;
	  font-weight: bold;
	  padding: 10px;
	  width: 100%;
	}
   
	main {
	  padding: 10px;
	}
   
	.title {
	  flex-grow: 1;
	  font-size: 18px;
	  margin-right: 10px;
	}
   
	dialog::backdrop,
	:global(dialog + .backdrop) {                            
	  background: rgba(0, 0, 0, 0.4);                        

	}
	input {
		background-color:lemonchiffon;color:maroon;
	}
  </style>
  
  