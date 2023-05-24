<script>
  import JetDBTable from './JetDBTable.svelte'
  let headerFlds = ['компания', 'контакт', 'страна'];
</script>
{@debug headerFlds}
<div>
  <JetDBTable headerFlds={headerFlds}></JetDBTable>
</div>
  
  <style>
     p {color: black;}
  </style>