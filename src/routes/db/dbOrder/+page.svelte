<script  lang="ts">
    import {onMount} from 'svelte';
      import dscOrders from './../../../json/Orders.json'
      import JetDBTable from './../../components/JetDBTable/JetDBTable.svelte';
      
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
      Width='500px'
      Height='400px'>
    </JetDBTable>
    <!-- <Navigator></Navigator> -->
    <p class='placeHold'></p>
    <style>
  
    </style>