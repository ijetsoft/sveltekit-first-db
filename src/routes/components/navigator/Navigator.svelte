<script  lang="ts">
  import Dialog from './../dialog/Dialog2.svelte'
  import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
  let dialog: any;
  import {getContext} from 'svelte'; 
  const {myTable, mark, dsc, DS, voc, lastKey} = getContext('masterTable');
  export let currRow: any;
  export let ModeUpdate : string = ''
  export let naviUpdated = {mode: false, record: {key:8888}}

  let thisRecord = {}
  let titleDialog = ''
  let flagAdd = false
  
  let newRecord : any = {}
    
  function myFirst() { mark(1); }
  function myLast() { mark(-1); }
  function myPrev() { mark(currRow-1); }
  function myNext() { mark(currRow+1); }
  function thisView() {
    thisRecord = DS[currRow-1]
    titleDialog = ''
    dialog.showModal()}
  function thisAdd() {
    AddNewRecord(dsc) 
    console.log(newRecord)
    thisRecord = newRecord; flagAdd = true
    ModeUpdate = 'insert'
    titleDialog = 'новая запись'
    dialog.showModal()}
  function handleInsert (event: any) {
    alert('Navy Insert')
  }
  function AddNewRecord(parmDSC: any){
      //let myObject = DS
      let myObject = DS[0]
      //let keys = Object.keys(myObject);
      let keys = [], it = {};
      for(var key in myObject){
        newRecord[key] = ''
        it =  dsc.col.find((item:any) => item.fld == key);
        if (it) {
          switch (it.type) {
            case 'key':
              newRecord[key] = lastKey+1
              break;
            case 'string':
              newRecord[key] = '?'
              break;
            case 'number':
              newRecord[key] = 0
              break;
            default:
              break;
          }
        }
        keys.push(key);
      }
      /* let ret = {}
      for (let index = 0; index < parmDSC.col.length; index++) {
        const el = parmDSC.col[index];
        newRecord[el.fld] = 'XXX'
      }
      return ret */
    }
    // $: if (naviUpdated) alert('$ naviUpdated key'+naviUpdated.record.key)
</script>
 <!-- {@debug currRow} -->
<div>
  <button class="btn" title="первая запись" on:click={myFirst}>
    <i class="fa fa-step-backward fa-fw" ></i></button>
  <button class="btn" title="предыдущая запись" on:click={myPrev}>
    <i class="fa fa-chevron-left fa-fw"></i></button>
<button class="btn" title="следующая запись" on:click={myNext}>
  <i class="fa fa-chevron-right fa-fw" ></i></button>
<button class="btn" title="последняя запись" on:click={myLast}>
  <i class="fa fa-step-forward fa-fw"></i></button>
<button class="btn" title="просмотреть запись" on:click={thisView}>
  <i class="fa fa-eye fa-fw"></i></button>

<button class="btn" title="редактировать запись"><i class="fa">&#xf044;</i></button>
<button class="btn" title="добавить запись" on:click={thisAdd} 
  on:insert={handleInsert}>
  <i class="far fa-plus-square"></i></button>
<button class="btn" title="опции сетки"><i class="fab fa-stack-exchange"></i></button>
</div>
 {@debug naviUpdated} 
<Dialog title={titleDialog} Add ={flagAdd}
  bind:dialog bkgHeaderColor = 'maroon' 
  dsc={dsc} DS={thisRecord} voc={voc}
  bind:dialogUpdated={naviUpdated}
  parmUpdate ={ModeUpdate}>
</Dialog>
  <style>
    .btn {
  background-color: FireBrick;
  border: none;
  color: Gold;
  
  cursor: pointer;
  padding: 3px 4px;
  border-radius: 5px;
 
}
@media screen and (min-width: 601px) {
    .btn {
      width: 30px; 
      height: 30px; 
      font-size: 1em;  
  }
}
@media screen and (max-width: 600px) {
	.btn {
    width: 50px; 
    height: 50px; 
    font-size: 2em;  
  } 
}  

  </style>