<script  lang="ts">
  import {getVocabTextValue, GetLastKey, date2str,
    InsertDBRecord, GetRecordDB, UpdateDBRecord} from './../JetDBTable/helper.svelte';

  import {createEventDispatcher, onMount} from 'svelte';
  import { supabase } from "$lib/supabaseClient.js";
   import Checkbox from './../checkbox/Checkbox.svelte';
   import Combo from './../combobox1-0/Combox2.svelte';
    import { json } from '@sveltejs/kit';

  
   export let canClose = true;                                
   export let className  = '';                                 
   export let dialog: any = null;    
   export let header: any = null                               
   export let icon: any =  undefined;                               
   export let title: any = '***';     
   export let bkgColor = "LemonChiffon"
   export let color = "maroon"
   export let parmKey = 0
   
  export let body = ''  

  export let bkgHeaderColor = '';   
  export let dsc: any = null
  export let outerRecord: any = null
  export let voc: any = null
  export let dialogUpdatedKey = 0
  export let modeUpdate = ''
  export let mapDialog = new Map()
  let mapSQLUpdate = new Map()
  let nameTable: string =''
  let nameKeyTable: string = ''
  let resultRecordTable: any
  //export let RetDialog = 9999

  const thisCSS = ' style="background-color:'+bkgColor+';color:'+color+'; width: 320px;"'
  let _bool = true
  let _currVocabValue = ''
   
   const  dispatch = createEventDispatcher();
   function sendEvent() {
    	dispatch('MapReady', mapDialog); 
      mapDialog.clear()
    }

   $: classNames = 'dialog' + (className ? ' ' + className : '');
  
   //onMount(() => dialogPolyfill.registerDialog(dialog));      
   
  
   let stylish=''
   onMount(() => {
    // alert('onMount: '+parmKey+' DS '+JSON.stringify(DS))
    nameTable =dsc.name
    nameKeyTable = dsc.col.filter(fld => (fld.type == 'key'))[0].fld
    mapDialog.clear()
    //AddMap('Id', parmKey)
       header.style.backgroundColor = bkgHeaderColor
       
       //if (dsc) body = dsc.col.length+' *'
       //header.setAttribute('background-color', 'maroon');
   });
   
 function sayCell(parmFld: any, parmRow: any){
   let val = parmRow[parmFld.fld]
   let _text = 'text', _required = 'required', ret =''
   let _val =' value="'+val+'"'
   switch (parmFld.type) {
       case 'date':
           _text = 'date'
           ret = '<input type="date" name="'+parmFld.fld+'" id="'+parmFld.fld+'" '+
           ' value="'+_val+'"></input>'
           //<input type="date" id="start" name="trip-start" value="2018-07-22" min="2018-01-01" max="2018-12-31" />
           console.log(ret)
           return ret
           break
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
               let val = formOptionsFromVocab(vocFld, vocVal);
// console.log(vocFld+"="+vocVal+', '+val)
           }
               break;
       default:
   }
   ret = '<input type="'+_text+'" name="'+parmFld.fld+'" id="'+parmFld.fld+'"'+
               _val + thisCSS+'><br>'	
   
               
               return ret
   
 }
 function formOptionsFromVocab(parmName: string, parmVal: any) {
   let a =  voc.find((item:any) => item.name == parmName);
   let vocQry = a.qry.data
   let nameKey = Object.entries(vocQry[0])[0][0]
   let nameVal = Object.entries(vocQry[0])[1][0]
   let vocabRecs = vocQry.find((itemV:any) => itemV[nameKey] === parmVal);
   let options:any = []
   let retVal = ''; //if (vocabRecs) {
       vocQry.forEach(el => {
           options.push({value:el[nameKey],text:el[nameVal]});
           retVal += el[nameKey]+":"+el[nameVal]+', '
           if (el[nameKey]===parmVal) _currVocabValue = el[nameVal]
       });
       //console.log(options)
       //retVal = vocabRecs[nameVal]
   //}

   return options
 }
 function currVocabValue(parmName: string, parmVal: any) {
  let a =  voc.find((item:any) => item.name == parmName);
   let vocQry = a.qry.data
   let nameKey = Object.entries(vocQry[0])[0][0]
   let nameVal = Object.entries(vocQry[0])[1][0]
   let vocabRecs = vocQry.find((itemV:any) => itemV[nameKey] === parmVal);
   let options:any = []
   let retVal = ''; 
       vocQry.forEach(el => {
           if (el[nameKey]===parmVal) retVal = el[nameVal]
       });
       //console.log(options)
       //retVal = vocabRecs[nameVal]
      return retVal
 }
 function checkBool(parmFld: any, parmRow: any){
   let val = parmRow[parmFld.fld]
    if (parmRow[parmFld.fld] === "1") {
       _bool = true }
   else {
       _bool = false
   }
   return ''
 }
   let thisCol = [], el = ''
   
   // очистить заголовок от <br>
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
   function sayValCell(parmFld: any, parmRow: any){
    if (modeUpdate === 'UPDATE') {
      if (parmFld.type === 'date'){
       /*  alert('170: '+parmFld.fld+'='+parmRow[parmFld.fld])
        alert('171: '+date2str(parmRow[parmFld.fld], 'dd.MM.yy')) */
        //alert('170: '+Date.parse(parmRow[parmFld.fld]))        
      }
      return parmRow[parmFld.fld]
    }
    let val: any;
    switch (parmFld.type) {
      case 'string':
        val = ''; break;
      case 'number':
        val = '0'; break;
    }
    return val
   }
   
   function onChange(val:any) {
       //alert(getKey())
   }
   function AddMap(name: string, value:any, altValue = ''){
    if (name[0] !== '_') AddMapSQL(name, value)
    if (mapDialog.has(name)) mapDialog.delete(name) 
    mapDialog.set(name, value) 
   }
   function AddMapSQL(name: string, value:any, altValue = ''){
    if (mapSQLUpdate.has(name)) mapSQLUpdate.delete(name) 
      mapSQLUpdate.set(name, value) 
   }
  
   function onChangeCombo2(name: string, value:any) {
    AddMap(name, value)
    /* if (mapSQLUpdate.has(name)) mapSQLUpdate.delete(name) 
    mapSQLUpdate.set(name, value)  */
    let x = getVocabTextValue(voc, name, parseInt(value))
    AddMap('_'+name, x)
    
		//alert('Main.Combo2: '+name+' = '+value);
	}
  function onChangeCheckBox(name: string, value:any) {
    AddMap(name, value)
    AddMapSQL(name, value='true'?1:0)
		//alert('Main.CheckBox: '+name+' = '+value);
	}
  function inputChange(event: any){
    AddMap(event.target.name, event.target.value)
    //alert('Dialog: '+event.target.name+'='+event.target.value)
   }
   function inputChangeDate(event: any){
    let x = date2str(event.target.value, 'yyyy-MM-dd')
    AddMap(event.target.name, x)
    console.log('inputChangeDate: '+event.target.name+'='+event.target.value+' or '+x)
   }
   function show() {
    //alert(JSON.stringify([...mapDialog]))
   }
   function close() {
    let mustSave : boolean = (mapDialog.size > 0)
		if (mapDialog.size > 0) mustSave = confirm("Сохранить данные?");
		if (mustSave) Save()
    dispatch('close');  
    // dialogUpdated = false
	// alert('dialogUpdated ='+dialogUpdated)
    
    dialog.close();
   }
   function PrepareUpdateSQL() {
    mapSQLUpdate.forEach((value, key, map) => {
      if (outerRecord[key]) outerRecord[key] = value
    });
   }
   function Save() {
    if (modeUpdate === 'UPDATE') {
      UpdateDBRecord(nameTable, nameKeyTable, parmKey, mapSQLUpdate)
      .then(result =>{
          resultRecordTable = result
         /*  alert('240: Dialog2: result=  '+JSON.stringify(resultRecordTable))
          alert('246: Dialog2: mapSQLUpdate='+JSON.stringify([...mapSQLUpdate]))  
          alert('247: Dialog2: '+JSON.stringify(outerRecord))      */
          sendEvent()
          mapDialog = mapDialog
          dispatch('close');  
          dialog.close();
        
          close()
        })
      // Выполнить UPDATE с возвратом строки
      /* GetRecordDB(nameTable, nameKeyTable, parmKey)
        .then(result =>{
          resultRecordTable = result
          //alert('Dialog2 239 : '+JSON.stringify(resultRecordTable))
          //alert('234: map mapSQLUpdate: '+JSON.stringify(outerRecord))     
          sendEvent()
          mapDialog = mapDialog
          dispatch('close');  
          dialog.close();
        
          close()
        }) */
    } else { // INSERT
      GetLastKey(nameTable, nameKeyTable)
        .then(result =>{
          let newKey: number = result+1
          AddMapSQL(nameKeyTable, result+1)
          PrepareUpdateSQL()
          //alert('map mapSQLUpdate: '+JSON.stringify(outerRecord))          
          //alert('map mapSQLUpdate: '+JSON.stringify([...outerRecord]))
          //alert('248: '+newKey)
          //AddMap('Id', newKey)
          if (mapSQLUpdate.size > 0) {
            //alert('map mapSQLUpdate: '+JSON.stringify([...mapSQLUpdate]))
          }

          InsertDBRecord(nameTable, nameKeyTable, newKey, mapSQLUpdate)
          .then(result =>{
            resultRecordTable = result
            //alert('Dialog2 256 : '+JSON.stringify(resultRecordTable))
            sendEvent()
            mapDialog = mapDialog
            dispatch('close');  
            dialog.close();
        
          close()

          })
        })
    }
    
   }
   function SaveOLD() {
    if (mapSQLUpdate.size > 0) {
      
      //alert('map Dialog: '+JSON.stringify([...mapSQLUpdate]))
    }
    sendEvent()
    // отладка 
    if (mapDialog.size > 0) {
      console.log('dialog size='+mapDialog.size)
          //alert('map Dialog: '+JSON.stringify([...mapDialog]))
    }
    mapDialog = mapDialog
    dispatch('close');  
    dialog.close();
    //alert('CLOSE')
    /* dialogUpdatedKey = 9999
	  RetDialog = 8888
		alert('Save '+RetDialog) */
    close()
   }
   
   //$: if (dialogUpdated) alert('$ dialogUpdated key'+dialogUpdated.record.key)
</script>

 {@debug mapDialog}   
 
 <dialog bind:this={dialog} class={classNames} >               
    <header bind:this={header}>
    {#if icon}{icon}{/if}
    <div class="title">{title}{modeUpdate} {parmKey}</div>
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
                  <div>
                    <!-- selected={DS[fld.fld.slice(1)]} -->
                    <Combo options={formOptionsFromVocab(fld.fld.slice(1), outerRecord[fld.fld.slice(1)])} 
                      onChange = {onChangeCombo2}
                      name={fld.fld.slice(1)}
                      placeholder={getVocabTextValue(voc, fld.fld.slice(1), outerRecord[fld.fld.slice(1)])}
                      on:message={handleMessage}  />
                      <!-- placeholder={currVocabValue(fld.fld.slice(1), DS[fld.fld.slice(1)])}                    -->
                  </div><br>                  
              <!-- {:else if fld.type == 'date'} -->

                {:else if fld.type == 'bool'}
                       <!-- {#if DS[fld.fld] === '1'} 
                       <Checkbox checked text='' --bkgHeaderColor='maroon'></Checkbox>
                       {:else} -->
                  {checkBool(fld, outerRecord)}
                  <Checkbox text="" name={fld.fld}
                       onChange={onChangeCheckBox}
                       checked={_bool} --bkgHeaderColor='maroon'></Checkbox>
                       <!-- {/if} -->
                   
                   <!-- <input type="checkbox" name="+{fld.fld}+" id="+{fld.fld}+ 
                       "checked	><br>	-->
                {:else if fld.type == 'date'}
                  <input type="date" name={fld.fld} id={fld.fld}
                  on:change={inputChangeDate}
                  value="{sayValCell(fld, outerRecord)}"><br>
                {:else }
                   <!-- {@html sayCell(fld, DS)} -->
                   <input type="text" name={fld.fld} id={fld.fld}
                   on:change={inputChange}
                   required value="{sayValCell(fld, outerRecord)}"><br>
                       <!-- <input type="text" name="+{fld.fld}+" id="+{fld.fld}+
                       " required value="{sayCell(DS, fld)}"><br>			   -->
                   {/if}   
               {/if}  
           {/each}
           <button class="btn" title="сохранить" on:click={Save}>
            <i class="fa-regular fa-floppy-disk" ></i></button>
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
     font-size: 0.3em;
     outline: none;
     margin: 0;
     padding: 0;
   }
  
   dialog {
    z-index: 10;
     /* position: fixed; */
     top:  90%;/*center;50%;*/
     transform: translate(0, -50%);
     border-radius: 5px;
  
     border: none;
     box-shadow: 0 0 10px darkgray;
     padding: 0;
     
     width: 600px;
   }
  
   header {
     display: flex;
     justify-content: space-between;
     align-items: center;
  
     background-color: cornflowerblue;
     box-sizing: border-box;
     color: white;
     /* font-weight: bold; */
     padding: 10px;
     width: 100%;
   }
  
   main {
     padding: 10px;
   }
  
   .title {
     flex-grow: 1;
     font-size: 0.5em;
     margin-right: 1em;
   }
  
   dialog::backdrop,
   :global(dialog + .backdrop) {                            
     background: rgba(0, 0, 0, 0.4);                        

   }
   input {
       background-color:lemonchiffon;color:maroon;
       width: 320px;
   }
   .btn {
       margin-top: 5px;
         background-color: FireBrick;
         border: none;
        color: Gold;
 
         cursor: pointer;
         padding: 3px 4px;
         border-radius: 5px;

   }
@media screen and (min-width: 601px) {
   .close-btn {font-size: 0.5em;}
   header {font-size: 2em;  } 
   dialog, .btn {
       font-size: 1em;
     }
   .btn{ width: 1.5em; height: 1.5em; margin-top:  1.2em;}
}

@media screen and (max-width: 600px) {
   .close-btn {font-size: 0.8em;}
   header {font-size: 2em;  } 
   dialog {font-size: 2em;  } 
   .btn {font-size: 1em;  width: 50px; height: 50px; margin-top: 20px;}
}

</style>


    
    
 