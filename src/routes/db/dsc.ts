import type { DSCType } from "./dsc.type";
export function formView(parm: any, qry: any, voc: any) {
  let col = parm.col, ret = '', len = col.length
  //alert(JSON.stringify(qry))
  let lenData = qry.data.length
  //let x: DSCType = <DSCType>parm;
    
  ret = '<table>';
	ret += '<thead>';
	ret += '<tr>';
  for (let i = 0; i < len; i++) {
    if (col[i]?.ref) continue;
    if (col[i].type == 'key' || col[i].type == 'image') continue;
    ret += '<th>'+col[i].header+'</th>';
  }
  ret += '</tr><tbody>';
  let row : any, colRow = '', vocFld = '', vocVal : any
  for (let i = 0; i < lenData; i++) {
    ret += '<tr>';
    row = qry.data[i];
    for (let j = 0; j < len; j++) {
      if (col[j]?.ref) continue;
      if (col[j].type == 'key' || col[j].type == 'image') continue;
      colRow = col[j].fld
      if (colRow[0] == '_') {
        vocFld = colRow.slice(1); vocVal = row[vocFld]
        ret += '<td>'+getVocab(vocFld, voc, vocVal)+'</td>';
      }
      else {
        if (col[j].type == 'memo') {ret += '<td style="text-align: center;"><button class="mini">...</button></td>'}
        else {ret += '<td>'+row[colRow]+'</td>'};
      }
      
    }
    // ret += '<td>'+qry[i].CategoryName+'</td>';
    // ret += '<td>'+qry[i].Description+'</td>';
    ret += '</tr>';
  }
  ret += '</tbody></table>';
  var sSheet = document.styleSheets[0];
  let miniCSS = 'border: solid 1px #777; background-color: grey; border-radius: 3px;'
    miniCSS += 'background-color: rgb(197, 194, 194); width: 25px; cursor:pointer;'
  sSheet.insertRule('th { background-color:maroon;color:white;}', sSheet.cssRules.length);
   if (sSheet.insertRule) {
     //sSheet.insertRule('td {background-color: LemonChiffon}', sSheet.cssRules.length);
     sSheet.insertRule('th, td { border: solid 1px #777; }', sSheet.cssRules.length);
     //sSheet.insertRule('td { text-align: center;}', sSheet.cssRules.length);
     sSheet.insertRule('table {  border-collapse: collapse; color:maroon;}', sSheet.cssRules.length);
     sSheet.insertRule('tr:nth-child(odd) {background-color: #eee}', sSheet.cssRules.length);
     sSheet.insertRule('tr:nth-child(even) {background-color: LemonChiffon}', sSheet.cssRules.length);
     //sSheet.insertRule('table > tbody > tr:nth-child(even) { background-color: white; }', sSheet.cssRules.length);
     sSheet.insertRule('tr:hover { background-color: rgb(202, 101, 101); color: white}', sSheet.cssRules.length);     
     sSheet.insertRule('.mini {'+miniCSS+' }', sSheet.cssRules.length);
   }
  return ret
  }
  function getVocab(parmName: string, parmVoc: any, parmVal: any) {
    let a =  parmVoc.find((item:any) => item.name == parmName);
    let vocQry = a.qry.data
    let nameKey = Object.entries(vocQry[0])[0][0]
    let nameVal = Object.entries(vocQry[0])[1][0]
    let vocabRecs = vocQry.find((itemV:any) => itemV[nameKey] === parmVal);
    let retVal = ''; if (vocabRecs) retVal = vocabRecs[nameVal]
    return retVal
  }
  function getFldValue(parmDSC: any, parmValue: any, parmVoc: any) {
   let colRow = parmDSC.fld, vocFld = ''
   let retAttr = '', retLine = '<td>'+'</td>'
   switch (parmDSC.type) {
    case 'memo':
      
      break;
   
    default:
      break;
   }
   
   if (colRow[0] == '_') {
    vocFld = colRow.slice(1); 
    retLine += '<td>'+getVocab(vocFld, parmVoc, parmValue)+'</td>';}
    else {
      retLine='????'
    }
   return retLine
  }
