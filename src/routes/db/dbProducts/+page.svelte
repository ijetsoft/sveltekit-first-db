<script lang="ts">
    import {onMount} from 'svelte';
    import dscCategories from './../../../json/Products.json'
    import {formView} from './../dsc';
    export let data;
    let { products } = data;

    //let myPlace: any = document.querySelector(".placeHold") ;
    onMount(() => {
      let myPlace: any = document.querySelector(".placeHold") ;
       myPlace.innerHTML = formView(dscCategories, products, document);
    }  
    );
    
  </script>
  <p class='placeHold'>****</p>
 
  <style>
    /* table {  border-collapse: collapse; }
    th, td { border: solid 1px #777;  color:maroon}
    th { background-color:lightblue;}
    tr:nth-child(even) {
    background-color: #eee;  
	}
  tr:hover { background-color: red; }
  table { background-color: white; }*/
  </style>