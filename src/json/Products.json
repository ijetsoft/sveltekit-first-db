{
"name": "products",
"SQL": "SELECT * FROM Products ORDER BY ProductName",
"col": [
  {"fld": "ProductID", "header": "id", "type": "key" },
  {"fld": "ProductName", "header": "название","type": "string"},
  {"fld": "_CategoryID", "header": "категория","type": "string"},
  {"fld": "_SupplierID", "header": "поставщик","type": "string"},
  {"fld": "SupplierID", "header": "id поставщика", "type": "number", "ref": "SupplierID"},
  {"fld": "CategoryID", "header": "id категории", "type": "number", "ref": "CategoryID"},
  {"fld": "QuantityPerUnit", "header": "единиц в<br>упаковке", "type": "string"},
  {"fld": "UnitPrice", "header": "цена<br>упаковки", "type": "number"},
  {"fld": "UnitsInStock", "header": "единиц<br>на складе", "type": "number"},
  {"fld": "UnitsOnOrder", "header": "резер-<br>вировано", "type": "number"},
  {"fld": "ReorderLevel", "header": "перерас-<br>пределено", "type": "number"},
  {"fld": "Discontinued", "header": "дис-<br>конт", "type": "bool"}
	],
	"options": [

		{ "lines": "all" },
		{ "numlines": "yes" },
		{
			"reports": [
				[ "повний список", "/doctors/FullReport" ],
				[ "короткий список", "/doctors/ShortReport" ]
			]
		}
	]
}