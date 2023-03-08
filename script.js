// expand defs function
// evaluate lambda expressions
simple = ["a","b"];
sampleExpr = [["a","b"], "c"];

defs =["list",
    ["define", ["inc", "n", "f", "x"], ["f", ["n","f","x"]]],
    ["define", ["zero", "f", "x"], "x"],

    ["define", ["one", ["inc", "zero"]]],
    ["define", ["two", ["inc", "one"]]],
    ["define", ["three", ["inc", "two"]]],
    ["define", ["four", ["inc", "three"]]],

    ];

function recursiveMap(expression, f) {
    let newExpr = [];
    let i=0;
    while (i < expression.length) {
        if (typeof(expression[i]) == "string") {
             newExpr.push(f(expression[i]));
        }
        else {
            newExpr.push(recursiveMap(expression[i], f));
        }
    i = i + 1;
    }
    return newExpr;
}




// testing
function addHello(word) {
    return "hello " + word;

}

console.log(recursiveMap(simple, addHello));
console.log(recursiveMap(["a"], addHello));
console.log(recursiveMap([["a", "b"], "c"], addHello));
console.log(recursiveMap(["a", ["b", "c"]], addHello));
console.log(recursiveMap([["a","b"], ["c","d"]], addHello));