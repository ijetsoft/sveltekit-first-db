<script lang ='ts'>
    import dscCategories from './../../../json/Categories.json'
    import {newGet} from './dsc';
    export let data;
    let { categories } = data;
    $: ({ categories } = data);
  </script>

  <table style="width: 30%; margin-top: 50px;">
    <tr><th>название</th> <th>описание</th></tr>
    {#each categories as category}
      <tr>
        <td>{category.CategoryName}</td> 
        <td>{category.Description}</td></tr>
    {/each}
  </table>

  <style>

  </style>