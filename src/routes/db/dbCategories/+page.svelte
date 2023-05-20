<script lang="ts">
    import {onMount} from 'svelte';
    import dscCategories from './../../../json/Categories.json'
    import {formView} from './../dsc';
    export let data;
    let { CategoryID } = data;
    //let { categories } = data;

    //let myPlace: any = document.querySelector(".placeHold") ;
    onMount(() => {
      let myPlace: any = document.querySelector(".placeHold") ;
       myPlace.innerHTML = formView(dscCategories, categories, document);
    }  
    );
    
  </script>
  <p class='placeHold'>****</p>
<!--   
  <table style="width: 30%; margin-top: 50px;">
    <tr><th>название</th> <th>описание</th></tr>
    {#each categories as category}
      <tr>
        <td>{category.CategoryName}</td> 
        <td>{category.Description}</td></tr>
    {/each}
  </table>   -->
  
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