<script  lang="ts">
    //import dialogPolyfill from 'dialog-polyfill';
	import Checkbox from './../checkbox/Checkbox.svelte';
	import Combo from './../combobox/Combo.svelte';
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
   export let voc: any = null
   const thisCSS = ' style="background-color:lemonchiffon;color:maroon;"'
   let _bool = true
  
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
  function sayCell(parmFld: any, parmRow: any){
    let val = parmRow[parmFld.fld]
	let _text = 'text', _required = 'required', ret =''
	let _val =' value="'+val+'"'
	switch (parmFld.type) {
		case 'bool':
			if (val === '1') _val = ' checked'; 
			if (val === '1') _val = 'checked' 
			else _val = '' 
			ret = '<Checkbox name="'+parmFld.fld+'" id="'+parmFld.fld+'" '+_val+' --bkgHeaderColor="maroon"></Checkbox>'
			console.log(ret)
			return ret
			_text = 'checkbox'
			/* ret = '<input type="checkbox" name="'+parmFld.fld+'" id="'+parmFld.fld+'"'+
				_val + thisCSS+'><br>'	
				 */
			
			break;
			case 'string':
			case 'number':
			if (parmFld.fld[0] == '_') {
				let vocFld = parmFld.fld.slice(1); 
         		let vocVal = parmRow[vocFld]
				let val = getVocab(vocFld, vocVal);
// console.log(vocFld+"="+vocVal+', '+val)
			}
				break;
		default:
	}
	ret = '<input type="'+_text+'" name="'+parmFld.fld+'" id="'+parmFld.fld+'"'+
				_val + thisCSS+'><br>'	
	
				
				return ret
    
  }
  function getVocab(parmName: string, parmVal: any) {
    let a =  voc.find((item:any) => item.name == parmName);
    let vocQry = a.qry.data
    let nameKey = Object.entries(vocQry[0])[0][0]
    let nameVal = Object.entries(vocQry[0])[1][0]
    let vocabRecs = vocQry.find((itemV:any) => itemV[nameKey] === parmVal);
	let options:any = []
    let retVal = ''; if (vocabRecs) {
		vocQry.forEach(el => {
			options.push({ind:el[nameKey],val:el[nameVal]});
			retVal += el[nameKey]+":"+el[nameVal]+', '
		});
		//console.log(options)
		//retVal = vocabRecs[nameVal]
	}

    return options
  }
  function checkBool(parmFld: any, parmRow: any){
	let val = parmRow[parmFld.fld]
	console.log(parmRow[parmFld.fld])
	if (parmRow[parmFld.fld] === "1") {
		_bool = true }
	else {
		_bool = false
	}
	return ''
  }
	let thisCol = [], el = ''
	// очистить заголовок
    if (dsc) {
		thisCol = dsc.col.filter(fld => !(fld.type == 'key' || fld.type == 'image' || fld.ref));
		for (let index = 0; index < thisCol.length; index++) {
			el = thisCol[index].header;
			el = el.split('-<br>').join('');
			el = el.split('<br>').join(' ');
			el = el.split('- ').join('');
			thisCol[index].header= el
		}
	};
// body = "<Checkbox text='OneTwoThree' checked={true} --bkgHeaderColor='maroon'></Checkbox>"
	function handleMessage(event: any) {}
</script>

<!-- {@debug title} -->
  
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
		<!-- <Checkbox text='OneTwoThree' checked={true} --bkgHeaderColor='maroon'></Checkbox>      -->
        {@html body}
        {#if dsc}
			{#each dsc.col as fld}
				{#if !(fld.type == 'key' || fld.type == 'image' || fld.ref)}  
					<label> {fld.header}</label><br>
					{#if fld.fld[0] == '_'}
						<!-- <Combo  width = 200px /><br> -->
						<Combo options={getVocab(fld.fld.slice(1), DS[fld.fld.slice(1)])} 
						selected={DS[fld.fld.slice(1)]}
						on:message={handleMessage}  /><br> 
					{:else if fld.type == 'bool'}
						<!-- {#if DS[fld.fld] === '1'} 
						<Checkbox checked text='' --bkgHeaderColor='maroon'></Checkbox>
						{:else} -->
						{checkBool(fld, DS)}
						<Checkbox text="" checked={_bool} --bkgHeaderColor='maroon'></Checkbox>
						<!-- {/if} -->
					
					<!-- <input type="checkbox" name="+{fld.fld}+" id="+{fld.fld}+ 
						"checked	><br>	-->
					{:else }
					{@html sayCell(fld, DS)}
						<!-- <input type="text" name="+{fld.fld}+" id="+{fld.fld}+
						" required value="{sayCell(DS, fld)}"><br>			   -->
					{/if}   
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
@media screen and (min-width: 601px) {
	dialog, header {
    font-size: 1em;
  }
}

@media screen and (max-width: 600px) {
	header {font-size: 2em;}
	dialog, header {
    font-size: 2em;
	width: 450px;
  }
}
</style>

  
  