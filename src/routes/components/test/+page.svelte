<script lang='ts'>
    const colors =
      ['red', 'orange', 'yellow', 'green', 'blue', 'purple'];
    const flavors = ['vanilla', 'chocolate', 'strawberry'];
    const seasons = ['Spring', 'Summer', 'Fall', 'Winter'];
    let favoriteColor = '';
    let favoriteFlavors : any[];
    let favoriteSeason = '';
    let happy = true;
    let name = '';
    let story = '';
    let option = [{ind:1,val:'vanilla'}, {ind:1,val:'vanilla'}, {ind:1,val:'vanilla'}];
    function myFunction() {
alert(typeof(option[0].ind))
    }
  </script>
   
  <div class="form">
    <div>
      <p>Name</p>
      <input type="text" bind:value={name}>
    </div>
    <div>
      <label>
        <input type="checkbox" bind:checked={happy}>   
        Happy?
      </label>
    </div>
    <div>
      <p>Favorite Flavors</p>
      {#each flavors as flavor}
      <label class="indent">
        <input type="checkbox" value={flavor} bind:group={favoriteFlavors}> 
        {flavor}
      </label>
      {/each}
    </div>
    <div>
      <p>Favorite Season</p>
      {#each seasons as season}
      <label class="indent">
        <input type="radio" value={season} bind:group={favoriteSeason}> 
  
        {season}
      </label>
      {/each}
    </div>
    <div>
      <label>
        Favorite Color
        <select bind:value={favoriteColor}> 
          <option />
          {#each colors as color}
          <option>{color}</option> 
          {/each}
        </select>
      </label>
    </div>
    <div>
      <label>
        Life Story
        <textarea bind:value={story} />
      </label>
    </div>
   <hr>
   <button on:click={myFunction}>Click me</button>
    {#if name}                                                              
   
      <div>
        {name} likes {favoriteColor}, {favoriteSeason},
        and is {happy ? 'happy' : 'unhappy'}.
      </div>
      <div>{name}'s favorite flavors are {favoriteFlavors}.</div>
      <div>Story: {story}</div>
    {/if}
  </div>
   
  <style>
    div {
      margin-bottom: 10px;
    }
   
    .indent {
      margin-left: 10px;
    }
   
    input,
    select,
    textarea {
      border: solid lightgray 1px;
      border-radius: 4px;
      margin: 0;
      padding: 4px;
    }
   
    input[type='checkbox'],
    input[type='radio'] {
      margin: 0 5px 0 0;
    }
   
    label {
      display: inline-flex;
      align-items: center;
    }
   
    select,
    textarea {
      margin-left: 5px;
    }
  </style>
  