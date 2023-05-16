
<script lang="ts">
  import {onMount} from 'svelte';
  import type { AdapterEntry } from '@sveltejs/kit/types/private';
  // https://stackoverflow.com/questions/10484053/change-select-list-option-background-colour-on-hover
	// https://freefrontend.com/css-select-boxes/
	// https://codepen.io/5t3ph/pen/MWyyYNz
	
	export let options = ['main1', 'main2', 'main3', 'main4'];
  export let multiple = false;
	export let height = '34px';
	export let width = "250px;"
	export let fontSize = "16px;"
	export let color = "maroon"
	export let backgroundColor = "LemonChiffon"
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	function onChange(event: { currentTarget: HTMLSelectElement }) {
		// let x = event.currentTarget.selectedOptions[0].text
		// dispatch('message', {
		// 	index: event.currentTarget.value,
		// 	text: event.currentTarget.selectedOptions[0].text
		// });
	}
	function handleClick() {
		alert('clicked');
	}
  let sSheet = document.styleSheets[0];
		if (sSheet.insertRule) {
      let ret = 'width:'+width+';'
      ret += ' height:'+height+';'
      ret += ' font-size: '+fontSize+';'
			ret += ' height: '+height+';'			
			ret += ' border-radius: 10px;'
			ret += ' border: 1px solid #19247c;'
			ret += ' color: '+color+';'
			ret += ' background-color: '+backgroundColor+';'
			ret += ' padding: 5px 100px 5px 5px;'
     	sSheet.insertRule('.box select {'+ret+'}', sSheet.cssRules.length);
      //  sSheet.insertRule('.box select {'+sLine+'}', sSheet.cssRules.length);
		}
    function setSelectHover(selector = "select") {
      let selects : any; selects = document.querySelectorAll(selector);
      let lenSelect = selects.length;
      
      for (let index = 0; index < selects.length; index++) {
        let select = selects[index];
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
            selectWrap.style.height = "auto";
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
              select.blur();
              hasFocus = false;
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
    }
    //onMount(() => setSelectHover());
    onMount(async () => {
      setSelectHover()
    })
</script>
{@debug width}
<!-- <div class="box">
	<select class="selectHovercolor" on:change={onChange} multiple={multiple}>
		{#each options as option, i}
				<option value={i}> {option}</option>
		{/each}
		
	</select>
  </div> -->
  <select class="selectHovercolor">
    <option value="volvo" selected>Volvo</option>
    <option value="saab">Saab</option>
    <option value="opel">Opel</option>
    <option value="audi">Audi</option>
  </select>
<style>
select {
  --selectHoverCol: #999;
  --selectedCol: red;
  width: 100%;
  font-size: 1em;
  padding: 0.3em;
  background-color: #fff;
}

select:focus {
  border-radius: 0px;
  border-color: red;
  background: #fff;
  outline: none;
}

.select-wrap {
  position: relative;
}

.select-wrap:focus-within select {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10
}

option:hover {
  background-color: var(--selectHoverCol);
  color: #fff;
}

option:checked {
  box-shadow: 0 0 1em 100px var(--selectedCol) inset;
}
</style>