import type { DSCType } from "./dsc.type";
export function newGet(parm: any) {
  let x: DSCType = <DSCType>parm;
  alert(JSON.stringify(x))
  }
