export { tokenize, parse, unflatten};

import { isVariable, isApplication, isAbstraction } from "./index.js";
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