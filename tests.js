export { test, arrayPrint, unflattenCases };

import { and, or, not } from "./boolean.js";



let unflattenCases = [
    [["l", "a"],  ["l", "a"]],
    [["l", 1], ["l", 1]  ],
    [["l", "a", "b"],   ["l", ["a", "b"]]  ],
    [["a", "b", "c"],[["a", "b"], "c"]]
]
let flat = ["l", "a", "b", "c"];

function arrayPrint(arr) {
    if (typeof(arr) == "string") {
        return arr;
    }
    if (typeof(arr) == "number") {
        return arr.toString();
    }

    else {
        let output = "[";
        for (let i = 0; i < arr.length - 2; i++) {
            output += arrayPrint(arr[i]) + ", ";
        }
        output += 
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

