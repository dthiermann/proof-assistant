export { test };

import { and, or, not } from "./boolean.js";


let incrementDef = "(define (inc n f x) (f (n f x)))";
let productDef = "(define (product n m f x) (n (m f) x))";

// cases is a list of [input, expected] pairs
function test(f, cases, prettyPrint, equality) {
    cases.forEach((instance) => {
        let actual = f(instance[0]);
        let expected = instance[1];
        let result = equality(actual, expected);
        console.log(result);
        if (!result) {
            console.log("Actual: " + prettyPrint(actual));
            console.log("Expected: " + prettyPrint(expected));
        }
    })
}

