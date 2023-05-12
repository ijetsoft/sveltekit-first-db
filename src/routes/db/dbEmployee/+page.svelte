<script lang ='ts'>
  // https://svelte.dev/repl/9d1bc0a8af79459f8ad0cd6c9cb82fa2?version=3.29.4
  import { onMount } from 'svelte';    
  import dscEmployees from './../../../json/Employees.json'
    //import type { DSCType } from "./dsc.type";
    // typeof dscEmployees typeof DSCType
    import { text } from 'svelte/internal';
    import {myCut, getName, getUsers, getThings, colNames, things} from './util';
    import {newGet} from './dsc';
    newGet(dscEmployees.col); let myHTML = '<p>assa</p>';
    export let data;
    let { Employees } = data;
    $: ({ Employees } = data);
    $: note = "";
    // let x: DSCType = <unknown>dscEmployees;
    //const promise = getUsers();
     //alert(getUsers())
    Employees.forEach(element => {
       element.Notes = myCut(element.Notes)
   }); 
   let promise =  getThings()
   let employees = [];
   let message ='';

    onMount(async () => {
    const res = await fetch(     
      'user');
      //'http://dummy.restapiexample.com/api/v1/employees');      
    const json = await res.json();
    if (json.status === 'success') {
      // employees = json.data.sort( 
      //   (e1: string, e2) => e1.employee_name.localeCompare(e2.employee_name));
      // message = '';
    } else {
      employees = [];
      message = json.status;
    }
  });

   
  </script>
    
    {@debug message} 
{#await promise}
	<p></p>
  
{:then getThings}

<table>
	<thead>
	<tr>
		{#each colNames as col}
	<th >{col} &varr;</th>
{/each}
	</tr>
	</thead>
	<tbody>
		
		{#each things as thing, index (thing.id)}

		<tr>
			{#each colNames as col, index}
			<td>{thing[col]}</td>
			{/each}
		</tr>
		{/each}
	
	</tbody>
</table>



{:catch error}
	<p style="color: red">{error.message}</p>
{/await}
{myHTML}
  <p><i class="fa fa-step-backward fa-fw" ></i> ****</p>
  <button class="btn" title="первая запись"><i class="fa fa-step-backward fa-fw" ></i></button>
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
  <svelte:head>
    
  </svelte:head>
  <style>
    .btn {
  background-color: FireBrick;
  border: none;
  color: Gold;
  font-size: 16px;
  cursor: pointer;
  padding: 3px 4px;
  border-radius: 5px;
}
    table {  border-collapse: collapse; }
    th, td { border: solid 1px #777;  }
    th { background-color:lightblue;}
    tr:nth-child(even) {
    background-color: #eee;
}
  </style>