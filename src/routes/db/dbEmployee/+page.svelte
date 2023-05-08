<script>
    import dscEmployees from './../../../json/Employees.json'
    import MyTable from './MyTable.svelte'
    import { text } from 'svelte/internal';
    import {myCut, getName} from './util';

    export let data;
        let { Employees } = data;
    $: ({ Employees } = data);
    $: note = "";
    let options = ['item1', 'item2', 'item3', 'item4'];
    
    Employees.forEach(element => {
       element.Notes = myCut(element.Notes)
   }); 
	
  </script>
 <!-- <MyTable options={dscEmployees.col} ></MyTable> -->
   
  <table style="width: 30%; margin-top: 50px; ">
    <tr>
      {#each dscEmployees.col as colfld }
        {#if colfld.type !== "key"} <th>{colfld.header}</th> {/if}
      {/each}
      <!-- <th>фамилия</th> 
      <th>имя</th>
      <th>должность</th>
      <th>уваж.</th>
      <th >дата рожд.</th>
      <th>раб. с</th>
      <th>адрес</th>
      <th>город</th>
      <th>регион</th>
      <th>почт. код</th>
      <th>страна</th>
      <th>дом. телефон</th>
      <th>экст.</th>
      <th>резюме</th> -->
    </tr>
    {#each Employees as employee}
      <tr>
        {#each dscEmployees.col as colfld }
        {#if colfld.type !== "key"} 
          {#if colfld.type == "memo"} 
            <td style="max-width: 300px;min-width: 300px;">{getName(employee, colfld)} </td> 
          {:else}
            <td>{getName(employee, colfld)} </td> 
          {/if}

        {/if}
      {/each}
        <!-- <td>{employee.LastName}</td>
          {employee["LastName"]}
        <td>{employee.FirstName}</td> 
        <td>{employee.Title}</td>
        <td>{employee.TitleOfCourtesy}</td>
        <td style="width: 180px">{employee.BirthDate}</td>
        <td>{employee.HireDate}</td>
        <td>{employee.Address}</td>
        <td>{employee.City}</td> 
        <td>{employee.Region}</td>    
        <td>{employee.PostalCode}</td>    
        <td>{employee.Country}</td>
        <td>{employee.HomePhone}</td>
        <td>{employee.Extension}</td>
        <td> {employee.Notes} </td> -->
      </tr>
    {/each}
  </table>
  

  <style>
    table {  border-collapse: collapse; }
    th, td { border: solid 1px #777;  }
    th { background-color:lightblue;}
    tr:nth-child(even) {
    background-color: #eee;
}
  </style>