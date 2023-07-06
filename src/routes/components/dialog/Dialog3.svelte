<script  lang="ts">
import { supabase } from "$lib/supabaseClient.js";
import Checkbox from '../checkbox/Checkbox.svelte';
import Combo from '../combobox1-0/Combox2.svelte';
import {createEventDispatcher, onMount} from 'svelte';
</script>
<dialog>
    <p>Greetings, one and all!</p>
    <form method="dialog">
      <button>OK</button>
    </form>
  </dialog>
<style>
dialog {
  z-index: 10;
  margin-top: 10px;

  /*top:  90%;center;50%;*/
  transform: translate(0, -50%);
  border-radius: 5px;
  background-color:lemonchiffon;
  color:maroon;
  
  border: none;
  box-shadow: 0 0 10px darkgray;
  padding: 0;
     
  width: 600px;
}

</style>