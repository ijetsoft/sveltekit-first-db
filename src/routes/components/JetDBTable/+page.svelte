<script lang="ts">
  import JetDBTable4 from './JetDBTable4.svelte'
  import JetDBTable5 from './JetDBTable5.svelte'
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
   <JetDBTable4 headerFlds={headerFlds} Rows = {Rows}></JetDBTable4> 
</div>
<div>
   <JetDBTable5 headerFlds={headerFlds} Rows = {Rows}></JetDBTable5> 
</div>
  
  <style>
     p {color: black;}
  </style>