<script>
    export let data;
    let { Products } = data;
    $: ({ Products } = data);
  </script>

  <table style="width: 50%; margin-top: 50px;">
    <tr><th>название</th> <th>упаковка</th><th>цена</th>
      <th>поставщик</th>
      <th>категория</th>      
    </tr>
    {#each Products as prod}
    <tr>
      <td>{prod.ProductName}</td> 
      <td>{prod.QuantityPerUnit}</td> 
      <td>{prod.UnitPrice}</td>
      <td>{prod.CompanyName}</td>
      <td>{prod.CategoryName}</td>      
    </tr>
    {/each}
  </table>

  <style>
    
  </style>