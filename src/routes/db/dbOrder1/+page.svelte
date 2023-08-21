<script  lang="ts">
  	/* import { Jumper } from 'svelte-loading-spinners';
    import { navigating } from '$app/stores' */
    import {onMount} from 'svelte';
      import dscOrders from './../../../json/Orders.json'
      import JetDBTable from './../../components/JetDBTable/JetDBTable3.svelte';
      
      export let data;
      let { db } = data;
let x = 1
      
	
      onMount(() => {
        
         let myEl: any = document.getElementsByClassName("jump") ;
         //myEl.style.visibility ="hidden"
        
         //myEl.style.display = "none"
        //  myPlace.innerHTML = formView(dscProducts, db.product, db.voc);
      }  
      );
      function getHeight(){return (window.innerHeight-60)+'px'}
    function getWidth(){ return (window.innerWidth-25)+'px'}
    </script>
   <!-- <header id="logoheader">
    <div>
      <h1>This is a title</h1>
    </div>
  </header>-->
  
  <!-- Width='1000px' Height='100%' -->
  <JetDBTable dscFlds={dscOrders} Height={getHeight()} Width={getWidth()} 
  tblRows={db} ></JetDBTable> 


<style>
* {
  margin: 0px;
  padding: 0px;
}
    </style>