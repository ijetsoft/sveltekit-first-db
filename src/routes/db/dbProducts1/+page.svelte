<script  lang="ts">
  import { supabase } from "$lib/supabaseClient.js";
  import {onMount} from 'svelte';
    import dscProducts from './../../../json/Products.json'
    // import Navigator from './../../components/navigator/+page.svelte'
    import {formView} from './../dsc';
    import JetDBTable from './../../components/JetDBTable/JetDBTable3.svelte';
    
    export let data;
    let { db } = data;
    let newRecord : any = {}
    let newKey: any = {}
    onMount(() => {
    });
    function getHeight(){return (window.innerHeight-70)+'px'}
    function getWidth(){ return (window.innerWidth-30)+'px'}
 </script>
   <!-- {@debug db}   -->
   <JetDBTable dscFlds={dscProducts} Height={getHeight()} Width={getWidth()}
    tblRows={db} ></JetDBTable>
  
  

  <style>

  </style>