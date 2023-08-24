<script  lang="ts">
  import { supabase } from "$lib/supabaseClient.js";
  import { Jumper, RingLoader } from 'svelte-loading-spinners';
  import {onMount} from 'svelte';
    import dscProducts from './../../../json/Products.json'
    // import Navigator from './../../components/navigator/+page.svelte'
    import {formView} from './../dsc';
    import JetDBTable from './../../components/JetDBTable/JetDBTable3.svelte';
    
    export let data;
    let { db } = data;
    let newRecord : any = {}
    let newKey: any = {}
    let visible = true;
    let tempNull: any = null
    /* let parm = 1
    setTimeout(() => {
      console.log(parm+" second passed!");
      visible = false;
      }, 1000*parm); */
    onMount(() => {
      
      // visible = false
    });
    function getHeight(){return (window.innerHeight-70)+'px'}
    function getWidth(){ return (window.innerWidth-45)+'px'}
 </script>
   <!-- {@debug db} -->
   <!-- alert(window.screen.height);  -->
   <!-- <span>{getHeight()}</span> -->
  <!-- {#if visible}
   <RingLoader size="100" color="#FF3E00" unit="px" duration="1s"
    style="float: left; index:999; align-content='center'; top=60px" /> 
  {/if}   -->
  <JetDBTable dscFlds={dscProducts} Height={getHeight()} Width={getWidth()} 
    tblRows={db} ></JetDBTable> 
  <!-- <JetDBTable dscFlds={tempNull} Height={getHeight()} Width={getWidth()}
    tblRows={tempNull} ></JetDBTable>-->
  
  

  <style>
* {
  margin: 0px;
  padding: 0px;
}
  </style>