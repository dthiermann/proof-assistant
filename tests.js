export { test , arrayToStr, printExpr };

import { and, or, not } from "./boolean.js";
import { tokenize, parse, unflatten } from "./parsing.js";
import { arrayEquals, mapFreeVariables, deBruijnReduce } from "./index.js";

let ignore = [" ", "\n", "\t"];
let parens = ["(", ")"];
let bind = "a";

let incrementDef = "(define (inc n f x) (f (n f x)))";
let productDef = "(define (product n m f x) (n (m f) x))";

let expression = "((a a 4 2 (a 1 3)) (a 5 1))";
let tokenized = tokenize(expression, ignore, parens);
let parsed = parse(tokenized);
let unflat = unflatten(parsed, bind);
// let reduced = deBruijnReduce(unflat[0][1], unflat[1], bind);


printExpr(unflat);
//printExpr(reduced);


function printExpr(expr) {
    console.log(arrayToStr(expr));
}

function arrayToStr(expr) {
    if (typeof(expr) == "string") {
        return expr;
    }
    if (typeof(expr) == "number") {
        return expr.toString();
    }

    else {
        let output = "[";
        if (expr.length == 1) {
            output+= arrayToStr(expr[0]);
        }
        else if (expr.length > 1) {
            for (let i = 0; i < expr.length - 1; i++) {
                output += arrayToStr(expr[i]);
                output += ", "
            }
            output += arrayToStr(expr[expr.length - 1]);
        }
        output += "]";
        return output;
    }
    
}


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

