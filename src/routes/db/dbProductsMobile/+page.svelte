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
    function getHeight1(){return window.screen.height}
    function getWidth1(){ return window.screen.width}
    function getHeight2(){return window.innerHeight}
    function getWidth2(){ return innerWidth}

    function getHeight(){return (window.innerHeight-70)+'px'}
    function getWidth(){ return (window.innerWidth-45)+'px'}
 </script>
   <!-- {@debug db} -->
   <!-- alert(window.screen.height);  -->
   <p><span>window ширина: {getWidth1()} / {getWidth2()}</span>
    <span> window высота: {getHeight1()} / {getHeight2()}</span>

   </p>
   <p><span>моя ширина: {getWidth()}</span>
   <span> моя высота: {getHeight()}</span>
  </p>
  <!-- <JetDBTable dscFlds={dscProducts} Height={getHeight()} Width={getWidth()} 
    tblRows={db} ></JetDBTable>  -->

  <style>
* {
  margin: 0px;
  padding: 0px;
}
  </style>