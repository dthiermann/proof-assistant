
// want to be able to click on terms to expand their defs
// want to be able to choose which reduction to make

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

// check to see if expression is in the form [["lambda", "x", n], m]
function reducible(expression) {
    return (expression.length == 2) && (expression[0][0] == "lambda");
    
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

export * from "./index.js";

