<script lang="ts">
	// https://freefrontend.com/css-select-boxes/
	// https://codepen.io/5t3ph/pen/MWyyYNz
	
	let name = 'world';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	function onChange(event: { currentTarget: HTMLSelectElement }) {
		let x = event.currentTarget.selectedOptions[0].text
		//alert(event.currentTarget.value+' '+x)
		dispatch('message', {
			index: event.currentTarget.value,
			text: event.currentTarget.selectedOptions[0].text
		});
	}
	function handleClick() {
		alert('clicked');
	}
</script>
<div class="box">
	<select>
	  <option>Option 1</option>
	  <option>Option 2</option>
	  <option>Option 3</option>
	  <option>Option 4</option>
	  <option>Option 5</option>
	</select>
  </div>

<style>
body {
  margin: 0;
  padding: 0;
  background-color: #004882;
}

.box {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.box select {
  background-color: #0563af;
  color: white;
  padding: 12px;
  width: 250px;
  border: none;
  font-size: 20px;
  box-shadow: 0 5px 25px rgba(0, 0, 0, 0.2);
  -webkit-appearance: button;
  appearance: button;
  outline: none;
}

.box::before {
  content: "\f13a";
  font-family: FontAwesome;
  position: absolute;
  top: 0;
  right: 0;
  width: 20%;
  height: 100%;
  text-align: center;
  font-size: 28px;
  line-height: 45px;
  color: rgba(255, 255, 255, 0.5);
  background-color: rgba(255, 255, 255, 0.1);
  pointer-events: none;
}

.box:hover::before {
  color: rgba(255, 255, 255, 0.6);
  background-color: rgba(255, 255, 255, 0.2);
}

.box select option {
  padding: 30px;
}
</style>