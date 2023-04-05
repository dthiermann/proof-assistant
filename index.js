import { test, printExpr } from "./tests.js";
import {and, or, not} from "./boolean.js";
import {parse, tokenize, unflatten } from "./parsing.js";

export { arrayEquals, mapFreeVariables, deBruijnReduce, isVariable, isApplication, isAbstraction };

// testing

function toDeBruijnString(expression, bindSymbol = "f") {
    stringExpression = ""
    if (isVariable(expression)) {
        return toString(number(expression));
    }
    else if (isAbstraction(expression)) {
        return "(" + bindSymbol + " " + toDeBruijnString(body(expression)) + ")";
    }
    else if (isApplication(expression)) {
        let stringLeft = toDeBruijnString(left(expression));
        let stringRight = toDeBruijnString(right(expression));
        return "(" + stringLeft + " " + stringRight + ")";
    }
}

// rules for printing
// \ M N = \ (M N)
// M N P = (M N) P

function parse(stringExpression) {
    
}

function type(expression) {
    return expression[0];
}

function makeVariable(number) {
    return ["variable", number];
}

function number(variable) {
    return variable[1];
}

function makeApplication(left, right) {
    return ["application", left, right];
}

function left(application) {
    return application[1];
}

function right(application) {
    return application[2];
}

function makeAbstraction(term) {
    return ["abstraction", term];
}

function getBody(abstraction) {
    return abstraction[2];
}

function isVariable(expression) {
    return (expression[0] == "variable");
}

function isAbstraction(expression) {
    return (expression[0] == "abstraction");
}

function isApplication(expression) {
    return (expression[0] == "application");
}

// trying to reduce (\ M) N
// decrement all free variables in M by 1.
// replace any variable k if it has k parent \
// with (N with all the free variables increased by k)


function reducible(expression) {
    return (isApplication(expression) && isAbstraction(left(expression)));
}

function outerVariable(variable, depth) {
    return (number(variable) == depth);
}

function reduce(expression) {
    let M = getBody(left(expression));
    let N = right(expression);

    let decrementedBody = decrementFree(M);

    let reduced = expressionMap(decrementedBody, (variable, depth) => {
        if (number(variable) == depth) {
            return shiftFree(N, k);
        }
        else {
            return variable;
        }
    });
    return reduced;
}

function shiftFree(expression, k) {
    function shiftIfFree(variable, depth) {
        if (free(variable, depth)) {
            let n = number(variable);
            return makeVariable(n + k);
        }
    }

    return expressionMap(expression, shiftIfFree);
}

// apply f(variable, depth) to every variable in expression
// f returns a variable
function expressionMap(expression, f, depth = 0) {
    if (isVariable(expression)) {
        return f(expression, depth);
    }
    else if (isAbstraction(expression)) {
        return makeAbstraction(expressionMap(body(expression), f, depth + 1));
    }
    else if (isApplication(expression)) {
        let newLeft = expressionMap(left(expression), f, depth);
        let newRight = expressionMap(right(expression), f, depth);
        return makeApplication(newLeft, newRight);
    }
}

// apply f(variable) to every free variable in expression
function free(variable, depth) {
    return (number(variable) > depth);
}
