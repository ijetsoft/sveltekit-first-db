<script lang="ts">
  import JetDBTable from './JetDBTable.svelte'
  let headerFlds: string[] = ['компания', 'контакт', 'страна'];
  let Rows = [
     {Company:'Alfreds Futterkiste', Contact:'Maria Anders', Country:'Germany'},
     {Company:'Centro comercial Moctezuma', Contact:'Francisco Changs', Country:'Mexico'},
     {Company:'Ernst Handele', Contact:'Roland Mendels', Country:'Austria'},
     {Company:'Island Trading', Contact:'Helen Bennett', Country:'UK'},
     {Company:'Laughing Bacchus Winecellars', Contact:'Yoshi Tannamuri', Country:'Canada'},
     {Company:'Magazzini Alimentari Riuniti', Contact:'Giovanni Rovelli', Country:'Italy'}
  ]

</script>
<p>****</p>
{@debug headerFlds}
<div>
   <JetDBTable headerFlds={headerFlds} Rows = {Rows}></JetDBTable> 
</div>
  
  <style>
     p {color: black;}
  </style>