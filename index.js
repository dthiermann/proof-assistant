import { test, arrayPrint, unflattenCases } from "./tests.js";
import {and, or, not} from "./boolean.js";



function runTests() {
    test((expr) => unflatten(expr, "l"), unflattenCases, arrayPrint, arrayEquals);
}

//runTests();

function arrayEquals(a, b) {
    // base case: a, b, are strings or ints
    if (not(Array.isArray(a))) {
        if (not(a == b)) {
            return false;
        }
    }
    else if (a.length == b.length) {
        for (let i = 0; i < a.length; i++) {
             arrayEquals(a[i], b[i]);
        }
        return true;
    }
}

function isVariable(n) {
    return typeof(n) == "number";
}

function isApplication(M, bind) {
    return (M[0] != bind);
}

function isAbstraction(M, bind) {
    return (M[0] == bind);
}

function shift(terms, n) {
    return terms.map(a => a + n);

}

function deBruijnReduce(expr, bind) {
    
}




function unflatten(expression, bind) {
    if (isVariable(expression)) {
        return expression;
    }
    else if (isAbstraction(expression, bind)) {
        if (expression.length > 2) {
            let tail = expression.slice(1);
            return[expression[0], unflatten(tail)];

        }
        else {
            return expression;
        }
    }
    else if (isApplication(expression, bind)) {
        if (expression.length > 2) {
            let head = expression.slice(0, expression.length - 1);
            return [unflatten(head), expression[expression.length - 1]];
        }
        else {
            return expression;
        }
    }
}

    


let div = document.createElement("div");
div.textContent = "hello";
div.addEventListener("click", (e) => {
    e.target.textContent = "surprise";
}
)
document.body.append(div);

// def = [name, body]
function expandDef(expression, def) {
    replace(def[0], def[1], expression);
}

// check to see if expression is in the form [[bind, "x", n], m]
function reducible(expression, bind) {
    return (expression.length == 2) && (expression[0][0] == bind);
    
}

// assumes expression is in the form [["lambda", "x", n], m]
function reduceApplication(expression) {
    if (reducible(expression)) {
        let variable = expression[0][1];
        let body = expression[0][2];
        let input = expression[1];
        return replace(variable, input, body);
    }
}

function replace(oldTerm, newTerm, expression) {
    function change(term) {
        if (term == oldTerm) {
            return newTerm;
        }
        else {
            return term;
        }
    }

    return recursiveMap(expression, change);
}

// convert trees to binary trees using left associativity
function makeLeftPairs(expression) {
    if (expression.length > 2) {
        return expression.reduce(
            (a,b) => [a,b]
        )
    }
    else
    {
        return expression;
    }
}

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

// three character categories:
// " " "\n" terminate the current word if there is one and add it as a token
// "(" ")" terminate the current word if there is one, add current char as next token
// anything else: add to word
function tokenize(parensExpr, whiteSpace, grouping) {
    let splitExpr = [];
    let word = "";
    for (let i = 0; i < parensExpr.length; i++) {
        let current = parensExpr[i];

        if (whiteSpace.includes(current)) {
            if (word.length > 0) {
                splitExpr.push(word);
                word = "";
            }

        }
        else if (grouping.includes(current)) {
            if (word.length > 0) {
                splitExpr.push(word);
                word = "";
            }
            splitExpr.push(current);
        }
        else {
            word += current;
        }
    }
    return splitExpr;
}

//  "(,(,equal,(,(,sum,five,),three,),),eight,)"
// "(a b)"

// stack holds ancestors, including current
// 



 
function parse(tokens) {
    let tree = [];
    for (let i=0; i < tokens.length; i++) {
        if (tokens[i] == "(") {
            tree.push([]);
        }
        else if (tokens[i] == ")") {
            let finished = tree.pop();
            if (tree.length == 0) {
                return finished;
            }
            tree[tree.length - 1].push(finished);
        }
        else {
            tree[tree.length - 1].push(tokens[i]);
        }
        

    }
    return tree;
}


let exp = "((hello there) how)";
let ignore = [" ", "\n", "\t"];
let parens = ["(", ")"];

console.log(tokenize(exp, ignore, parens));
