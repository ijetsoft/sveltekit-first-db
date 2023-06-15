<script  lang="ts">
  import Navigator from './Navigator.svelte'
  import {setContext} from 'svelte';
  setContext('masterTable', 
    {myTable: {}, mark: {}, dsc: {}, DS: {}, voc: {}});
</script>
 <!-- {@debug currRow} -->
 <Navigator ></Navigator>
  <style>
    .btn {
  background-color: FireBrick;
  border: none;
  color: Gold;
  font-size: 16px;
  cursor: pointer;
  padding: 3px 4px;
  border-radius: 5px;
  width: 30px;
}
  </style>