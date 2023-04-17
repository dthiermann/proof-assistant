
/*
Simple tests:
parse, expand defs, evaluate, and print (sum five three)

To Do:
parse and print expressions written with the conventions that allow you
to leave out certain parentheses

expr =
variable
(lam variable expr)
(expr expr)

terms = expr expr expr ...
terms = expr | expr terms

(lam a terms) --> (lam a (terms))
(expr expr terms) --> ((expr expr) terms)


parse defs
expand defs

def = name expr
expand nameOfDef code
replace nameOfDef BodyOfDef code

*/
let ignore = [" ", "\n", "\t"];
let parens = ["(", ")"];

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

function isBoundBy(variable, abstraction) {
    return 0;
}

function print(expression, bindSymbol = "lam") {
    console.log(toString(expression, bindSymbol));
}

// turns expression into a string with letter variables for printing 
function toString(expression, bindSymbol = "lam") {
    stringExpression = ""
    if (isVariable(expression)) {
        return getName(expression);
    }
    else if (isAbstraction(expression)) {
        return "(" + bindSymbol + getName(expression) + " " + toString(body(expression)) + ")";
    }
    else if (isApplication(expression)) {
        let stringLeft = toString(left(expression));
        let stringRight = toString(right(expression));
        return "(" + stringLeft + " " + stringRight + ")";
    }
}


// takes a list of tokens, where variables are ints,
function parse(tokens, bind) {
    let i = 0;
    function expect(token) {
        if (token == tokens[i]) {
            i++;
            return true;
        }
        else {
            console.log("Syntax Error: expected" + token);
        }
    }

    function accept(token) {
        if (token == tokens[i]) {
            i++;
            return true;
        }
        else {
            return false;
        }
    }

    function abstraction() {
        let varName = tokens[i];
        i++;
        return makeAbstraction(varName, expr());
    }

    function definition() {
        let name = tokens[i];
        i++;
        return makeDefinition(name, expr());
    }

    function expr() {
        if (accept('(')) {
            if (accept(bind)) {
                let result = abstraction();
            }
            else if (accept("define")) {
                let result = definition();
            }
            else {
                let result = makeApplication(expr(), expr());
            }
            expect(")");
        }
        else {
            let result = makeVariable(tokens[i]);
            i++;
        }
        return result;

    }

    return expr(tokens);
}

function type(expression) {
    return expression[0];
}

function makeVariable(name) {
    return ["variable", name];
}

function getName(expression) {
    if (isVariable(expression)) {
        return expression[1];
    }
    else if (isAbstraction(expression)) {
        return expression[1];
    }
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

function makeAbstraction(name, body) {
    function checkName(variable) {
        return (getName(variable) == name);
    }

    return ["abstraction", variableName, body];
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
    return (getDepth(variable) == depth);
}

function reduce(operator, argument) {
    function replaceWithArgument(variable) {
        if (isBoundBy(variable, operator)) {
            return argument;
        }
        else {
            return variable;
        }
    }
    return expressionMap(getBody(operator), replaceWithArgument);
}

function shiftFree(expression, k) {
    function shiftIfFree(variable, depth) {
        if (free(variable, depth)) {
            let n = getDepth(variable);
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