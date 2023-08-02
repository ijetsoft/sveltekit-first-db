<script  lang="ts">
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
     {@debug db} 
    <JetDBTable dscFlds={dscOrders} 
      tblRows={db} 
      Height='465px'>
    </JetDBTable>
    <!-- <Navigator></Navigator> -->
    <p class='placeHold'></p>
    <style>
  
    </style>