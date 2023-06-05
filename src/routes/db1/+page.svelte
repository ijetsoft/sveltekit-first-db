<script>
    export let data;
    let { countries } = data;
    $: ({ countries } = data);
  </script>

  <table style="width: 30%; margin-top: 50px;">
    <tr><th>название</th> <th>код</th></tr>
    {#each countries as country}
      <tr><td>{country.name}</td> <td>{country.iso2}</td></tr>
    {/each}
  </table>

  <style>
  table { font-size: 2em;}
    @media screen and (min-width: 601px) {
      table {
    font-size: 1em;
  }
}

@media screen and (max-width: 600px) {
  table {
    font-size: 2em;
  }
}
  </style>