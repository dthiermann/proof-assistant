export { test, printExpression as arrayPrint };

import { and, or, not } from "./boolean.js";


function printExpression(expr) {
    if (typeof(expr) == "string") {
        return expr;
    }
    if (typeof(expr) == "number") {
        return expr.toString();
    }

    else {
        let output = "[";
        if (expr.length == 1) {
            output+= printExpression(expr[0]);
        }
        else if (expr.length > 1) {
            for (let i = 0; i < expr.length - 1; i++) {
                output += printExpression(expr[i]);
                output += ", "
            }
            output += printExpression(expr[expr.length - 1]);
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

