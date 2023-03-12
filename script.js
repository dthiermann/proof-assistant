// expand defs function
// evaluate lambda expressions

defs =["list",
    ["define", ["inc", "n", "f", "x"], ["f", ["n","f","x"]]],
    ["define", ["zero", "f", "x"], "x"],

    ["define", ["one", ["inc", "zero"]]],
    ["define", ["two", ["inc", "one"]]],
    ["define", ["three", ["inc", "two"]]],
    ["define", ["four", ["inc", "three"]]],

    ];

// apply a function to every string in nested arrays
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

// takes an array of characters
function isWord(parensExpr) {
    return parensExpr.map(isLetter).reduce((a,b) => a && b, true);
}

function isLetter(character) {
    return ((character != "(") &&
            (character != ")") &&
            (character != " "))
}

function tokenize(parensExpr) {
    let splitExpr = [];
    let word = "";
    for (let i = 0; i < parensExpr.length; i++) {
        if (!(isLetter(parensExpr[i]))) {
            if (word.length > 0) {
                splitExpr.push(word);
                word = "";
            }
            splitExpr.push(parensExpr[i]);
        }
        else {
            word += parensExpr[i];
        }
    }

    if (word.length > 0) {
        splitExpr.push(word);
    }
    return splitExpr;
}

// testing
let expression = "(hello ((how are) you))";
console.log(tokenize(expression));

/*
console.log(isWord("hello".split("")));
console.log(isWord("he llo".split("")));
console.log(isWord("(hello".split("")));
console.log(isWord("(hello)".split("")));

function addHello(word) {
    return "hello " + word;

}

console.log(recursiveMap(simple, addHello));
console.log(recursiveMap(["a"], addHello));
console.log(recursiveMap([["a", "b"], "c"], addHello));
console.log(recursiveMap(["a", ["b", "c"]], addHello));
console.log(recursiveMap([["a","b"], ["c","d"]], addHello));
*/