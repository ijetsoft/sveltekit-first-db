{"name":"Shippers",
 "SQL":"SELECT * FROM Shippers ORDER BY CompanyName",
 "col": [
	{"fld": "ShipperID", "header": "id", "type": "key" },
	{"fld": "CompanyName","header": "текстовое поле", "type": "string" },
	{"fld": "ContactName","header": "текстовое поле", "type": "string" },		
	{"fld": "Phone", "header": "текстовое поле", "type": "string" }		
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
	]}