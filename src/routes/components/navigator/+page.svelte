<script  lang="ts">
  import {getContext} from 'svelte'; 
  const {myTable, mark} = getContext('masterTable');
  export let currRow: any
  function myFirst() { mark(1); }
  function myLast() { mark(-1); }
  function myPrev() { mark(currRow-1); }
  function myNext() { mark(currRow+1); }
</script>
{@debug currRow}
<div>
  <button class="btn" title="первая запись" on:click={myFirst}>
    <i class="fa fa-step-backward fa-fw" ></i></button>
  <button class="btn" title="предыдущая запись" on:click={myPrev}>
    <i class="fa fa-chevron-left fa-fw"></i></button>
<button class="btn" title="следующая запись" on:click={myNext}>
  <i class="fa fa-chevron-right fa-fw" ></i></button>
<button class="btn" title="последняя запись" on:click={myLast}>
  <i class="fa fa-step-forward fa-fw"></i></button>

<button class="btn" title="просмотреть запись"><i class="fa fa-eye fa-fw"></i></button>
<button class="btn" title="редактировать запись"><i class="fa">&#xf044;</i></button>
<button class="btn" title="добавить запись"><i class="far fa-plus-square"></i></button>
<button class="btn" title="опции сетки"><i class="fab fa-stack-exchange"></i></button>
</div>
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