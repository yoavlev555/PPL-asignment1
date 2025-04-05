import { Result, makeFailure, makeOk, bind, either } from "../lib/result";

/* Library code */
const findOrThrow = <T>(pred: (x: T) => boolean, a: T[]): T => {
    for (let i = 0; i < a.length; i++) {
        if (pred(a[i])) return a[i];
    }
    throw "No element found.";
}

export const findResult : <T>(pred: (x: T) => boolean, arr: T[]) => Result<T>  = <T>(pred: (x: T) => boolean, arr: T[]) => {
    if(arr.length == 0){
        return makeFailure("No such element exists");
    }

    else if(pred(arr[0])){
        return makeOk(arr[0]);
    }

    else{
        return findResult(pred,arr.slice(1));
    } 
}

/* Client code */
export const returnSquaredIfFoundEven_v1 = (a: number[]): number => {
    try {
        const x = findOrThrow(x => x % 2 === 0, a);
        return x * x;
    } catch (e) {
        return -1;
    }
}

export const returnSquaredIfFoundEven_v2 : (a: number[]) => Result<number> = (a: number[]) => {
    return bind(findResult((x: number) => x % 2 === 0, a),(x: number) => makeOk(x * x));
}

export const returnSquaredIfFoundEven_v3 : (a: number[]) => number = (a: number[]) => {
    const ifOK : (x: number) => number = (x: number) : number => x * x;
    const ifFailure : (x: string) => number = (message: string) : number => -1;
    return either(findResult((x: number) => x % 2 === 0, a), ifOK, ifFailure)
};

