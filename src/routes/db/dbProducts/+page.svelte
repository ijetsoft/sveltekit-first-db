<script  lang="ts">
  import {onMount} from 'svelte';
    import dscProducts from './../../../json/Products.json'
    // import Navigator from './../../components/navigator/+page.svelte'
    import {formView} from './../dsc';
    import JetDBTable from './../../components/JetDBTable/JetDBTable.svelte';
    
    export let data;
    let { db } = data;
    onMount(() => {
      // let myPlace: any = document.querySelector(".placeHold") ;
      //  myPlace.innerHTML = formView(dscProducts, db.product, db.voc);
    }  
    );
  </script>
  <!-- {@debug db} -->
  <JetDBTable dscFlds={dscProducts} 
    tblRows={db} 
    Width='100%'
    Height='400px'>
  </JetDBTable>
  <!-- <Navigator></Navigator> -->
  <p class='placeHold'>xx</p>
  <!-- <table style="width: 30%; margin-top: 50px;">
    <tr><th>название</th> <th>код</th></tr>
    {#each prducts as prduct}
      <tr><td>{country.name}</td> <td>{country.iso2}</td></tr>
    {/each}
  </table> -->

  <style>

  </style>