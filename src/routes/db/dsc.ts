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
      else {ret += '<td>'+row[colRow]+'</td>';}
      
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
  function getVocab(parmName: string, parmVoc: any, parmVal: any) {
    let a =  parmVoc.find(item => item.name == parmName);
    let vocQry = a.qry.data
    let nameKey = Object.entries(vocQry[0])[0][0]
    let nameVal = Object.entries(vocQry[0])[1][0]
    let vocabRecs = vocQry.find(itemV => itemV[nameKey] === parmVal);
    return vocabRecs[nameVal]
    // 
    // let nameVal : any
    // try {x = Object.entries(vocabVal)[1][1]}
    // catch {console.log(parmName+' parmVal='+parmVal)}

    return x
    return vocabVal
    let ret : string = parmName+'='+parmVal
    if (parmName == 'SupplierId') return ret
    let str: string = String(parmVal).valueOf()
    let i = -1, val = '', arr = Object.values(a)
    let vocabVal = parmVoc.data.find(itemV => itemV.Id === parmVal);
    let x : any
    try {x = Object.entries(vocabVal)[1][1]}
    catch {console.log(parmName+' parmVal='+parmVal)}

    return x
    for (const [key, value] of Object.entries(vocabVal)) {
      console.log(`${key}: ${value}`);
    }
    //return vocabVal[1]
                    //rec['_' + name] = vocabVal['_Value']
    Object.keys(parmVoc.data).forEach(key => {
      i+=1
      if (parseInt(key) == parmVal) {
        let obj: any = arr[parmVal-1]
        ret = String(Object.values(obj)[1]).valueOf()
      }
      // console.log(key) // returns the keys in an object
      // console.log(parmVoc.data[key])  // returns the appropriate value 
   })
    // for (let index = 0; index < parmVoc.data.length; index++) {
    //   if (Object.keys(parmVoc) == parmVal) ret = parmVoc.data[index][fld[1]]
      
    // }
    //const result = parmVoc.find(() => parmVoc[0] === "cherries");
    return ret
  }
