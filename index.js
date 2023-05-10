let ignore = [" ", "\n", "\t"];
let parens = ["(", ")"];

// testing
let text = "(define (inc n f x) (f (n f x)))";
let expectedTokens = ["(","define","(","inc","n","f","x",")",
"(","f","(","n","f","x",")",")",")"];
let tokens = tokenizeParensExpr(text);
let tokenTree = parse(tokens);

// testParse();
testTokenize();

// assumptions:
//   a and b have the same length
//   the elements of a and b can be compared using !=
// checks to see if a and b have the same elements
function arrayDeepEquality(a,b) {
    if (atom(a) || atom(b)) {
        return (a == b);
    }
    else {
        let headEquals = arrayDeepEquality(first(a), first(b));
        let tailEquals = arrayDeepEquality(rest(a), rest(b));
        return headEquals && tailEquals;
    }
}

// simple array functions
function atom(a) {
    let isNumber = (typeof(a) == "number");
    let isString = (typeof(a) == "string");
    let isBool = (typeof(a) == "boolean");
    return (isNumber || isString || isBool);
}

function first(arr) {
    return arr[0];
}

function rest(arr) {
    if (arr.length > 1) {
        return arr.slice(1);
    }
    else {
        return "null";
    }
    
}


function testTokenize() {
    console.log(tokenizeParensExpr("hello"));
    console.log(arrayDeepEquality(tokens, expectedTokens));
}



function testParse() {
    console.log(parse("hello"));
    // let expected = ["define", ["inc","n","f","x"],["f"["n","f","x"]]];
    //console.log(arrayDeepEquality(tokenTree, expected));

}

// parsing and printing:

function tokenizeParensExpr(parensExpr) {
  return tokenize(parensExpr, ignore, parens);
}

// string --> array (string)
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

// turns expression into a string with letter variables for printing
function toString(expression, bindSymbol = "lambda") {
  stringExpression = "";
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
    let stringLeft = toString(left(expression));
    let stringRight = toString(right(expression));
    return "(" + stringLeft + " " + stringRight + ")";
  }
}

function parse(tokens) {
    let i = 0;

    function nestedList() {
        let result = [];
        if (tokens[i] == "(") {
            i++;
            while (tokens[i] != ")") {
                result.push(nestedList());
            }
            i++;

        }
        else {
            result = tokens[i];
            i++;
        }
        return result;
    }

    return nestedList();

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

function left(application) {
  return application[1];
}

function right(application) {
  return application[2];
}

function makeAbstraction(name, body) {
  return ["abstraction", name, body];
}

function getBody(abstraction) {
  return abstraction[2];
}

function isVariable(expression) {
  return expression[0] == "variable";
}

function isAbstraction(expression) {
  return expression[0] == "abstraction";
}

function isApplication(expression) {
  return expression[0] == "application";
}

// trying to reduce (\ M) N
// decrement all free variables in M by 1.
// replace any variable k if it has k parent \
// with (N with all the free variables increased by k)

function reducible(expression) {
  return isApplication(expression) && isAbstraction(left(expression));
}

function outerVariable(variable, depth) {
  return getDepth(variable) == depth;
}

function reduce(operator, argument) {
  function replaceWithArgument(variable) {
    if (isBoundBy(variable, operator)) {
      return argument;
    } else {
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
  } else if (isAbstraction(expression)) {
    return makeAbstraction(expressionMap(body(expression), f, depth + 1));
  } else if (isApplication(expression)) {
    let newLeft = expressionMap(left(expression), f, depth);
    let newRight = expressionMap(right(expression), f, depth);
    return makeApplication(newLeft, newRight);
  }
}
