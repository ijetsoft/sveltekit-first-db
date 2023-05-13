{
	"name": "Categories",
	"SQL": "SELECT CategoryID, CategoryName, Description FROM Categories ORDER BY CategoryName",
	"col": [
		{
			"fld": "CategoryID",
			"header": "id",
			"type": "key"
		},
		{
			"fld": "CategoryName",
			"header": "название",
			"type": "string"
		},
		{
			"fld": "Description",
			"header": "описание",
			"type": "string"
		},
		{
			"fld": "Picture",
			"header": "фото",
			"type": "string"
		}
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