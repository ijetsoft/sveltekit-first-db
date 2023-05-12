import type { DSCType } from "./dsc.type";
export function myCut(parm: string) {
  let txt = ""; txt = parm
  console.log(txt.slice(1, 10))
  return txt.slice(0, 30)+"..."
 
  }
  export function getName(record: any, parm: any) {
    return record[parm.fld]
  }
  export function getDSC(dsc: DSCType) {
    let ret = '', len = dsc.col.length
    for (let i = 0; i < len; i++) {
      if (dsc.col[i].type !== "key") ret += "<th>"+dsc.col[i].header+"</th>" 
    }
    return ret
  }
  export async function getUsers() {
    let response = await fetch("/Employees.json");
    let users = await response.json();
    return JSON.stringify(users)
    return users;
  }
  export let things : any;
  export let colNames : any;
  let rowkeys = [];
  let sourceJson = "users.json";
  console.log(sourceJson);
  export async function getThings(){
     
    const res = await 
      fetch(sourceJson);
      //fetch(`https://jsonplaceholder.typicode.com/`+sourceJson);
      const json = await res.json();
  
      if (res.ok) {
        
        setTimeout(() => {
          things = json;				
          //grab column names
          colNames = Object.keys(things[0])
          
          return true;
        }, 0 * Math.random())
        
      } else {
        //throw  new Error(text);
      }
      
    }
    export function myGet() {

    }