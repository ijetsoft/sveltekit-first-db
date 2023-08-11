<script>
   
  </script>
<div class="vertical-menu">
  <a href="../db1" class="active">Страны мира</a>
  <a href="../db/dbEmployee">Персонал</a>    
  <a href="../db/dbProducts">Товары</a>
  <a href="../db2">Поставщики</a>
  <a href="../db/dbCategories">Типы товаров</a>  
  <a href="../db/dbOrder">Накладные</a>
  <a href="../db/dbOrder1">Накладные#1</a>
</div>
  

  <style>
    .vertical-menu {
    width: 200px; /* Set a width if you like */
    margin-top: 50px;
}

.vertical-menu a {
  background-color: #eee; /* Grey background color */
  color: black; /* Black text color */
  display: block; /* Make the links appear below each other */
  padding: 12px; /* Add some padding */
  text-decoration: none; /* Remove underline from links */
 
  
}

.vertical-menu a:hover {
  background-color: #ccc; /* Dark grey background on mouse-over */
}

.vertical-menu a.active {
  background-color: #04AA6D; /* Add a green color to the "active/current" link */
  color: white;
}
@media screen and (min-width: 601px) {
      a {
    font-size: 1em;
  }
}

@media screen and (max-width: 600px) {
  a {
    font-size: 2em;
  }
}
  </style>