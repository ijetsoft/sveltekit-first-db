<script  lang="ts">
  	/* import { Jumper } from 'svelte-loading-spinners';
    import { navigating } from '$app/stores' */
    import {onMount} from 'svelte';
      import dscOrders from './../../../json/Orders.json'
      import JetDBTable from './../../components/JetDBTable/JetDBTable2.svelte';
      
      export let data;
      let { db } = data;
let x = 1
      
	
      onMount(() => {
        
         let myEl: any = document.getElementsByClassName("jump") ;
         //myEl.style.visibility ="hidden"
        
         //myEl.style.display = "none"
        //  myPlace.innerHTML = formView(dscProducts, db.product, db.voc);
      }  
      );

    </script>
   <!-- <header id="logoheader">
    <div>
      <h1>This is a title</h1>
    </div>
  </header>-->
  <nav id="mainmenu">
    <div>
      <ul>
        <li><a href="index.html">Home</a></li>
        <li><a href="photos.html">Photos</a></li>
        <li><a href="videos.html">Videos</a></li>
        <li><a href="contact.html">Contact</a></li>
      </ul>
    </div>
  </nav> 
  <!-- Width='1000px' Height='100%' -->
  <div style="overflow-x:auto; display: flex;">
    <JetDBTable dscFlds={dscOrders} 
    tblRows={db} 
    Width='100%'
    >
  </JetDBTable>
</div>

<style>
* {
  margin: 0px;
  padding: 0px;
}
#logoheader {
  display: flex;
  justify-content: center;
  width: 96%;
  height: 50px;
  padding: 0% 2%;
  background-color: #0F76A0;
}
#logoheader > div {
  flex: 1;
  max-width: 960px;
  padding-top: 5px;
}
#logoheader h1 {
  font: bold 20px Arial, sans-serif;
  color: #FFFFFF;
}
#mainmenu {
  display: flex;
  justify-content: center;
  width: 96%;
  height: 20px;
  padding: 0% 2%;
  background-color: #9FC8D9;
  border-top: 1px solid #094660;
  border-bottom: 1px solid #094660;
}
#mainmenu > div {
  flex: 1;
  max-width: 960px;
}
#mainmenu li {
  display: inline-block;
   /*height: 15px;
  padding: 5px 10px 0px 5px; */
  margin-right: 5px;
}
#mainmenu li:hover {
  background-color: #6FACC6;
}
#mainmenu a {
  font: bold 18px Arial, sans-serif;
  color: #333333;
  text-decoration: none;
}
main {
  display: flex;
  justify-content: center;
  width: 96%;
  padding: 2%;
  background-image: url("background.png");
}
/* main > div {
  display: flex;
  flex: 1;
  max-width: 960px;
}
#mainarticles {
  flex: 1;
  margin-right: 20px;
  padding-top: 30px;
  background-color: #FFFFFF;
  border-radius: 10px;
} */

    </style>