const replace = require('./script');

test("makes some replacements", () => {
    deep = ["hello", ["how", "are"], "how", "you"];
    something = ["one new", ["two new","three new"]];
    somethingDeep = ["hello", [something, "are"], something, "you"];
    expect(replace("how", something, deep)).toStrictEqual(somethingDeep);
})