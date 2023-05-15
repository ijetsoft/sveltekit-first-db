import type { DSCType } from "./dsc.type";
export function formView(parm: any, qry: any, doc: any) {
  let col = parm.col, ret = '', len = col.length
  //alert(JSON.stringify(qry))
  let lenData = qry.length
  //let x: DSCType = <DSCType>parm;
    
  ret = '<table>';
	ret += '<thead>';
	ret += '<tr>';
  for (let i = 0; i < len; i++) {
    if (col[i].type == 'key' || col[i].type == 'image') continue;
    ret += '<th>'+col[i].header+'</th>';
  }
  ret += '</tr><tbody>';
  let row : any, colRow = ''
  for (let i = 0; i < lenData; i++) {
    ret += '<tr>';
    row = qry[i];
    for (let j = 0; j < len; j++) {
      if (col[j].type == 'key' || col[j].type == 'image') continue;
      colRow = col[j].fld
      ret += '<td>'+row[colRow]+'</td>';
    }
    // ret += '<td>'+qry[i].CategoryName+'</td>';
    // ret += '<td>'+qry[i].Description+'</td>';
    ret += '</tr>';
  }
  ret += '</tbody></table>';
  var sSheet = document.styleSheets[0];
  sSheet.insertRule('th { background-color:lightblue;}', sSheet.cssRules.length);
   if (sSheet.insertRule) {
     //sSheet.insertRule('td {background-color: LemonChiffon}', sSheet.cssRules.length);
     sSheet.insertRule('th, td { border: solid 1px #777; }', sSheet.cssRules.length);
     sSheet.insertRule('table {  border-collapse: collapse; color:maroon;}', sSheet.cssRules.length);
     sSheet.insertRule('tr:nth-child(odd) {background-color: #eee}', sSheet.cssRules.length);
     sSheet.insertRule('tr:nth-child(even) {background-color: LemonChiffon}', sSheet.cssRules.length);
     //sSheet.insertRule('table > tbody > tr:nth-child(even) { background-color: white; }', sSheet.cssRules.length);
     sSheet.insertRule('tr:hover { background-color: maroon; color: white}', sSheet.cssRules.length);     
   }
  return ret
  }
