<script lang="ts">
    import {onMount} from 'svelte';
    import type { AdapterEntry } from '@sveltejs/kit/types/private';
    import { createEventDispatcher } from 'svelte';
    export let options = [{ind:0,val:'comboItem1'}, {ind:1,val:'comboItem2'}, {ind:2,val:'comboItem3'}, {ind:3,val:'comboItem4'},];
	// export let options = ['item1', 'item2', 'item3', 'item4'];
	export let color = 'maroon';
	export let bkgColor = 'lemonchiffon'
	export let borderColor = 'maroon'
	export let multiple = false;
	export let height = '34px';
	export let width = "250px;"
	export let selected: number = 0;
	let thisCombo: any
    let mode = typeof(options[0])=="string" ? 0 : 1
    
	const dispatch = createEventDispatcher();

    function onChange(event: { currentTarget: HTMLSelectElement }) {

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
    onMount(async () => {
        let sSheet = document.styleSheets[0];
		if (sSheet.insertRule) {
            sSheet.insertRule('option:checked {background-color:'+borderColor+';}', sSheet.cssRules.length);
            sSheet.insertRule('option:not(:checked) {background-color:'+bkgColor+';}', sSheet.cssRules.length);
        }
        let r:any = document.querySelector(':root');
        r.style.setProperty('--selectHoverCol', '#999');

      setSelectHover()
    })
    /* onMount(() => {
        let sSheet = document.styleSheets[0];
		if (sSheet.insertRule) {
            sSheet.insertRule('option:checked {background-color:'+borderColor+';}', sSheet.cssRules.length);
            sSheet.insertRule('option:not(:checked) {background-color:'+bkgColor+';}', sSheet.cssRules.length);
        }
        let r:any = document.querySelector(':root');
        r.style.setProperty('--selectHoverCol', '#999');
        setSelectHover()
    }); */
</script>
{@debug multiple}
<select bind:this={thisCombo} 
		style="width: {width}; height:{height}; background:{bkgColor}; color:{color}" 
        on:change={onChange} 
		{multiple}>
    {#each options as option, i}
			{#if mode === 0} 	
				<option value={i}> {option}</option>
			{/if}
			{#if mode === 1} 	
				{#if selected === option.ind}
					<option value={option.ind} selected>  {option.val} </option>
				{:else}
					<option value={option.ind}>  {option.val}</option>
				{/if}
			{/if}
			<!-- {#if i === 0} 
			<option value={i+100} selected> {option}</option>
			{/if} -->
	{/each}
</select>
<style>
select {
    --selectHoverCol: #999;
	padding: 5px 100px 5px 5px; 
	height: 24px;
	width: 250px;
	border-radius: 10px;
	appearance: button;
}
option:checked{ color: white; }
option:hover {
  background-color: var(--selectHoverCol);
  color: #fff;
}

select:focus {
  /* border-radius: 0px; */
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

select {
  --selectHoverCol: #999;
  /* --selectedCol: red; */
  /* width: 100%; 
  font-size: 1em;*/
  padding: 0.3em;
  background-color: #fff;
}

select:focus {
  /* border-radius: 0px; */
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
  color: yellow;
}
/* @media screen and (min-width: 601px) {
	p, select {
     font-size: 1em; 
  }
}

@media screen and (max-width: 600px) {
	p, select {
     font-size: 1em; 
	 height: 32px;
  } 
} */
</style>