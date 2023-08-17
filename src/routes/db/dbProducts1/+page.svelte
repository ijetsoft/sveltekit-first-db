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
    
 </script>
   {@debug db}  
  <JetDBTable dscFlds={dscProducts} Height='470px'
    tblRows={db} ></JetDBTable>
  
  

  <style>

  </style>