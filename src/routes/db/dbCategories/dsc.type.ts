export type DSCType = {
    name: string;
	SQL: string;
	col: [
        {fld: string;
		header: string;
		type: string;
		validate?: string;
        ref?: string}
    ];
    options: [
        lines: string,
        numlines: string,
        reports: [ {name: string}]

    ]
  };