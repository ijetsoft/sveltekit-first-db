export function myCut(parm: string) {
  let txt = ""; txt = parm
  console.log(txt.slice(1, 10))
  return txt.slice(0, 30)+"..."
 
  }
  export function getName(record: any, parm: any) {
    return record[parm.fld]
  }