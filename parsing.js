export { tokenize, parse, printExpression};

let exp = "((hello there) how)";
let ignore = [" ", "\n", "\t"];
let parens = ["(", ")"];

console.log(tokenize(exp, ignore, parens));
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