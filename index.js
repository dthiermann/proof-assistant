let ignore = [" ", "\n", "\t"];
let parens = ["(", ")"];


// Type definitions
// tokens: emptylist or list (string)
// syntaxTree: string or list (syntaxTree)
// expression object: variable (string), abstraction (string, expression),
// or application (expression, expression)
// 

// everything is a string or a list

// testing
let text = "(define (inc n f x) (f (n f x)))";
let expectedTokens = ["(","define","(","inc","n","f","x",")",
"(","f","(","n","f","x",")",")",")"];
let tokens = tokenizeParens(text);
let tokenTree = buildSyntaxTree(tokens);
let expression = buildExpr(tokenTree);
let printedExpr = print(expression);
console.log(text);

function test(actual, expected) {
    if (equal(actual, expected)) {
        console.log("passed");
    } else {
        console.log("failed");
        console.log("Expected: " + print(expected));
        console.log("Actual: " + print(actual));
        
    }
}

function equal(a,b) {
    if (typeof(a) == "string" && typeof(b) == "string") {
        return (a == b);
    }
    if (typeof(a) != typeof(b)) {
        return false;
    }
    if (a.length != b.length) {
        return false;
    }
    for (let i = 0; i < a.length; i++) {
        if (not (equal(a[i], b[i]))) {
            return false;
        }
    }
    return true;
}

// parsing and printing:

function tokenizeParens(input) {
  return tokenize(input, ignore, parens);
}

// string --> array (string)
function tokenize(input, whiteSpace, grouping) {
  let splitExpr = [];
  let word = "";
  for (let i = 0; i < input.length; i++) {
    let current = input[i];

    if (whiteSpace.includes(current)) {
      if (word.length > 0) {
        splitExpr.push(word);
        word = "";
      }
    } else if (grouping.includes(current)) {
      if (word.length > 0) {
        splitExpr.push(word);
        word = "";
      }
        splitExpr.push(current);
    } else {
      word += current;
    }
  }
  if (word.length > 0) {
      splitExpr.push(word);
  }
  return splitExpr;
}

function print(expression, bindSymbol = "lambda") {
  console.log(toString(expression, bindSymbol));
}


function toString(expression, bindSymbol = "lambda") {
  if (isVariable(expression)) {
    return getName(expression);
  } else if (isAbstraction(expression)) {
    return (
      "(" +
      bindSymbol +
      getName(expression) +
      " " +
      toString(body(expression)) +
      ")"
    );
  } else if (isApplication(expression)) {
    let stringLeft = toString(operator(expression));
    let stringRight = toString(argument(expression));
    return "(" + stringLeft + " " + stringRight + ")";
  }
}

function buildSyntaxTree(tokens) {
    let i = 0;

    function syntaxTree() {
        let result = []
        if (tokens[i] == "(") {
            i++;
            while (tokens[i] != ")") {
                result.push(syntaxTree());
            }
            i++;

        }
        else {
            result = tokens[i];
            i++;
        }
        return result;
    }

    return syntaxTree();

}


function buildExpr(syntaxTree, bind) {
    if (typeof(syntaxTree) == "string") {
        return makeVariable(syntaxTree);
    }
    else if (syntaxTree[0] == bind) {
        let name = syntaxTree[1];
        let body = buildExpr(syntaxTree.slice(2));
        return makeAbstraction(name, body);
    }
    else {
        let exprList = syntaxTree.map(buildExpr);
        return exprList.reduce(makeApplication);
    }

}

// constructors and getters:

function type(expression) {
  return expression[0];
}

function makeVariable(name) {
  return ["variable", name];
}

function getName(expression) {
  if (isVariable(expression)) {
    return expression[1];
  } else if (isAbstraction(expression)) {
    return expression[1];
  }
}

function makeApplication(left, right) {
  return ["application", left, right];
}

function operator(application) {
  return application[1];
}

function argument(application) {
  return application[2];
}

function makeAbstraction(name, body) {
  return ["abstraction", name, body];
}

function getBody(abstraction) {
  return abstraction[2];
}

function isVariable(expression) {
  return type(expression) == "variable";
}

function isAbstraction(expression) {
  return type(expression) == "abstraction";
}

function isApplication(expression) {
  return type(expression) == "application";
}

// trying to reduce (\ M) N
// decrement all free variables in M by 1.
// replace any variable k if it has k parent \
// with (N with all the free variables increased by k)

function reducible(expression) {
  return isApplication(expression) && isAbstraction(operator(expression));
}




// apply f(variable, depth) to every variable in expression
// f returns a variable
function expressionMap(expression, f, depth = 0) {
  if (isVariable(expression)) {
    return f(expression, depth);
  } else if (isAbstraction(expression)) {
    return makeAbstraction(expressionMap(body(expression), f, depth + 1));
  } else if (isApplication(expression)) {
    let newLeft = expressionMap(operator(expression), f, depth);
    let newRight = expressionMap(argument(expression), f, depth);
    return makeApplication(newLeft, newRight);
  }
}
