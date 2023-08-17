<script  lang="ts">
  	/* import { Jumper } from 'svelte-loading-spinners';
    import { navigating } from '$app/stores' */
    import {onMount} from 'svelte';
      import dscOrders from './../../../json/Orders.json'
      import JetDBTable from './../../components/JetDBTable/JetDBTable2.svelte';
      
      export let data;
      let { db } = data;
      let myHeight = (window.screen.height-300)+'px'
let x = 1
      
	
      onMount(() => {
        //alert( window.innerWidth+' '+window.innerHeight)
        
         let myEl: any = document.getElementsByClassName("jump") ;
         //myEl.style.visibility ="hidden"
        
         //myEl.style.display = "none"
        //  myPlace.innerHTML = formView(dscProducts, db.product, db.voc);
      }  
      );
function getHeight(){alert((window.screen.height-280)+'px'); return (window.screen.height-280)+'px'}
    </script>
   {@debug x} 
 <!--  {#if $navigating}  
  <div class="jump">
    <Jumper size="60" color="#FF3E00" unit="px" duration="1s" />
  </div>
   {/if}  --> 
     {@debug db} 
     <!-- <div class="loader"></div> -->

    <JetDBTable dscFlds={dscOrders} 
      tblRows={db}  Height={getHeight()} Width='600px'
      
      
     >
      <!-- '465px' Height={myHeight}-->

    </JetDBTable>
    <!-- <Navigator></Navigator> -->
    <p class='placeHold'></p>
    <style>
  
    </style>