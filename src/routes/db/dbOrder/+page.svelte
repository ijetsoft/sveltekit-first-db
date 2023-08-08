<script  lang="ts">
  	import { Jumper } from 'svelte-loading-spinners';
    import { navigating } from '$app/stores'
    import {onMount} from 'svelte';
      import dscOrders from './../../../json/Orders.json'
      import JetDBTable from './../../components/JetDBTable/JetDBTable2.svelte';
      
      export let data;
      let { db } = data;

      
	
      onMount(() => {
        // let myPlace: any = document.querySelector(".placeHold") ;
        //  myPlace.innerHTML = formView(dscProducts, db.product, db.voc);
      }  
      );

    </script>
  
  {#if $navigating} 
    <Jumper size="60" color="#FF3E00" unit="px" duration="1s" />
  {/if} 
     {@debug db} 
     <!-- <div class="loader"></div> -->

    <JetDBTable dscFlds={dscOrders} 
      tblRows={db} 
      Height='465px'>
    </JetDBTable>
    <!-- <Navigator></Navigator> -->
    <p class='placeHold'></p>
    <style>
  
    </style>