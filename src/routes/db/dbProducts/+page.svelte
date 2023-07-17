<script  lang="ts">
  import { supabase } from "$lib/supabaseClient.js";
  import {onMount} from 'svelte';
    import dscProducts from './../../../json/Products.json'
    // import Navigator from './../../components/navigator/+page.svelte'
    import {formView} from './../dsc';
    import JetDBTable from './../../components/JetDBTable/JetDBTable2.svelte';
    
    export let data;
    let { db } = data;
    let newRecord : any = {}
    let newKey: any = {}
    onMount(() => {
      // alert(db.lastKey)
      GetNewKey()
    });
    function AddNewRecord(parmDSC: any){
      console.log(newKey)
      let myObject = db.product.data[0]
      //let keys = Object.keys(myObject);
      let keys = [], it = {};
      for(var key in myObject){
        newRecord[key] = ''
        it =  parmDSC.col.find((item:any) => item.fld == key);
        if (it) {
          switch (it.type) {
            case 'key':
            newRecord[key] = newKey+1
            break;
            case 'string':
              newRecord[key] = 'XXX'
              break;
            case 'number':
            newRecord[key] = '0'
            default:
              break;
          }
        }
        
        keys.push(key);
      }
      let ret = {}
     /*  for (let index = 0; index < parmDSC.col.length; index++) {
        const el = parmDSC.col[index];
        newRecord[el.fld] = 'XXX'
      } */
      return ret
    }
    async function GetNewKey() {
      const { data, error } = await supabase
        .from('Product')
        .select('Id')
        .order('Id', { ascending: false })
        .limit(1);
        newKey = data[0]['Id']
        AddNewRecord(dscProducts) 
     return data
   }
  </script>
   {@debug db}  
  <JetDBTable dscFlds={dscProducts} 
    tblRows={db} 
    Width='100%'
    Height='470px'>
  </JetDBTable>
  <!-- <Navigator></Navigator> -->
  <p class='placeHold'>xx</p>
  <!-- <table style="width: 30%; margin-top: 50px;">
    <tr><th>название</th> <th>код</th></tr>
    {#each prducts as prduct}
      <tr><td>{country.name}</td> <td>{country.iso2}</td></tr>
    {/each}
  </table> -->

  <style>

  </style>