
<script lang="ts">
    import {onMount} from 'svelte';
     import type { AdapterEntry } from '@sveltejs/kit/types/private';
         
    export let options = ['*main1', 'main2', 'main3', 'main4'];
    export let onChange: any;
    export let multiple = false;
    export let height = '24px';
    export let width = "320px;"
    export let color = "maroon"
    export let bkgColor = "LemonChiffon"
    export let selectColor = "#b65555";
      //export let backgroundColor = "LemonChiffon"
      let att = {'thisCombo': {}}
      let thisCombo: any
      let _style: any;
      import { createEventDispatcher } from 'svelte';
      const dispatch = createEventDispatcher();
      //function onChange(event: { currentTarget: HTMLSelectElement }) {
          // let x = event.currentTarget.selectedOptions[0].text
          // dispatch('message', {
          // 	index: event.currentTarget.value,
          // 	text: event.currentTarget.selectedOptions[0].text
          // });
      //}
    
    let mode = typeof(options[0])=="string" ? 0 : 1
    //if (multiple) height = '100px';
    //_style.setAttribute('background', 'LemonChiffon');
    if (document) {
      let sSheet = document.styleSheets[0];
      if (sSheet.insertRule) {
        let ret = ''
        ret += 'width:'+width
        ret += ' border-radius: 10px;'
        ret += ' border: 1px solid '+color+';' 
        ret += ' background-color: '+bkgColor+';' 
        ret += ' --selectHoverCol: '+selectColor+';'     
        ret += ' color: '+color+';' 
        //ret += ' font-size: '+fontSize+';'      
        //ret += ' height:'+height+';'
              // ret += ' padding: 5px 100px 5px 5px;'
        sSheet.insertRule('select {'+ret+'}', sSheet.cssRules.length);
        sSheet.insertRule('select:focus {border-radius: 10px;}', sSheet.cssRules.length);
        //sSheet.insertRule('select:focus {background-color: '+bkgColor+'}', sSheet.cssRules.length);
        //sSheet.insertRule('option:checked {background-color: '+bkgColor+'}', sSheet.cssRules.length);
      }
    }
    function handleClick() {
          alert('clicked');
    }
    function setSelectHover(selector = "select") {
      let select = thisCombo
      let selectWrap: any;
      if (select.parentNode) selectWrap = select.parentNode.closest(".select-wrap");
      // wrap select element if not previously wrapped
      if (!selectWrap) {
        selectWrap = document.createElement("div");
        selectWrap.classList.add("select-wrap");
        if (select.parentNode) select.parentNode.insertBefore(selectWrap, select);
        selectWrap.appendChild(select);
      }
      // set expanded height according to options
      let size = select.querySelectorAll("option").length;
      // adjust height on resize
      const getSelectHeight = () => {
        //selectWrap.style.height = "auto";
        let selectHeight = select.getBoundingClientRect();
        selectWrap.style.height = selectHeight.height + "px";
      };
      getSelectHeight();
      window.addEventListener("resize", (e) => {
        getSelectHeight();
      });
      /**
      * focus and click events will coincide
      * adding a delay via setTimeout() enables the handling of
      * clicks events after the select is focused
      */
      let hasFocus = false;
      select.addEventListener("focus", () => {
        select.setAttribute("size", size);
        setTimeout(() => {
          hasFocus = true;
        }, 150);
      });
      // close select if already expanded via focus event
      select.addEventListener("click", () => {
        if (hasFocus) {
          select.blur(); hasFocus = false;
        }
      });
      // close select if selection was set via keyboard controls
      select.addEventListener("keydown", (e:any) => {
        if (e.key === "Enter") {
          select.removeAttribute("size");
          select.blur();
        }
      });
      // collapse select
      select.addEventListener("blur", () => {
        select.removeAttribute("size");
        hasFocus = false;
      });

    }
      //onMount(() => setSelectHover());
      onMount(async () => {
        setSelectHover()
      })
  </script>
 
  <!-- <div class="box">
      <select class="selectHovercolor" on:change={onChange} multiple={multiple}>
          {#each options as option, i}
                  <option value={i}> {option}</option>
          {/each}
          
      </select>
    </div> -->
    <!-- style="width: {width}; height:{height}; background:{bkgColor}; color:{color}"  -->
    <select bind:this={thisCombo}  
    style="width: {width};"    
    on:change={onChange}
    {multiple}>
      {#each options as option, i}
              {#if mode === 0} 	
                  <option value={i}> {option}</option>
              {:else}
                  <option value={option.ind}>  {option.val}</option>
              {/if}
              {#if mode === 1} 	
                  <!-- <option value={option.ind}> * {option.val}</option> -->
              {/if}
          {/each}
    </select> 
    <!-- <select class="selectHovercolor">
      <option value="volvo" selected>Volvo</option>
      <option value="saab">Saab</option>
      <option value="opel">Opel</option>
      <option value="audi">Audi</option>
    </select>  -->
  <style>
  select {
  /*--selectHoverCol: #999;*/
  /* --selectedCol: red; */
  /* width: 100%; 
  font-size: 1em;*/
  margin: 0px;
  padding: 0px;
  /* background-color: #fff; */
}

select:focus {
  border-radius: 0px; 
  border-color: red;
  background: #fff;
  outline: none;
}

.select-wrap {
  position: relative;
  z-index: 10
}

.select-wrap:focus-within select {
  position: absolute;
  top: 0;
  left: 0;
 
}

option:hover {
  background-color: var(--selectHoverCol);
  color: #fff;
}

option:checked {
  box-shadow: 0 0 1em 100px var(--selectedCol) inset;
  color: yellow;
  background-color:maroon;
}
  @media screen and (min-width: 601px) {
    option {
     font-size: 1em; 
    }
    select {
     font-size: 1em; 
    } 
  }

@media screen and (max-width: 600px) {
	option {
     font-size: 2em; 
	
  } 
  select {
     font-size: 1em; 
    }
}  
  </style>