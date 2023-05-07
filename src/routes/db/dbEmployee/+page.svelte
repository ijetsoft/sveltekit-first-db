<script>
    export let data;
    let { Employees } = data;
    $: ({ Employees } = data);
  </script>

  <table style="width: 30%; margin-top: 50px;">
    <tr><th>имя</th> <th>фамилия</th></tr>
    {#each Employees as employee}
      <tr><td>{employee.LastName}</td> <td>{employee.FirstName}</td></tr>
    {/each}
  </table>

  <style>

  </style>