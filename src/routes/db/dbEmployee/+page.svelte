<script  lang="ts">
  import {onMount} from 'svelte';
    import dscEmployees from './../../../json/Employees.json'
    import JetDBTable from './../../components/JetDBTable/JetDBTable.svelte';
    export let data;
    let { db } = data;
    onMount(() => {
      // let myPlace: any = document.querySelector(".placeHold") ;
      //  myPlace.innerHTML = formView(dscEmployees, db.employee, db.voc);
    }  
    );
  </script>
  {@debug data}
  <JetDBTable dscFlds={dscEmployees} 
    tblRows={db} 
    Width='500px'
    Height='400px'>
  </JetDBTable>
    <!-- <table style="width: 30%; margin-top: 50px;">
    <tr><th>название</th> <th>код</th></tr>
    {#each prducts as prduct}
      <tr><td>{country.name}</td> <td>{country.iso2}</td></tr>
    {/each}
  </table> -->

  <style>
.mini {
  background-color: rgb(202, 101, 101);
  border: none;
  color: Black;
  font-size: 16px;
  cursor: pointer;
  padding: 3px 4px;
  border-radius: 3px;
  cursor: pointer;
  border: 1px solid black;
  border-color: #04AA6D;
}
  </style>