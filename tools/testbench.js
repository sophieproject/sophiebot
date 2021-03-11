let now = typeof performance === "object" && performance.now
    ? performance.now.bind(performance)
    : Date.now.bind(Date);

    let maxTests = 100;
    let loopLimit = 50000000;
    let expectedX = 1249999975000000;
runTest();

function runTest(index = 1, results = {usingVar: 0, usinglet: 0}) {
    console.log(`Running Test #${index} of ${maxTests}`);
    setTimeout(() => {
        let varTime = usingVar();
        let letTime = usinglet();
        results.usingVar += varTime;
        results.usinglet += letTime;
        console.log(`Test ${index}: var = ${varTime}ms, let = ${letTime}ms`);
        ++index;
        if (index <= maxTests) {
            setTimeout(() => runTest(index, results), 0);
        } else {
            console.log(`Average time with var: ${(results.usingVar / maxTests).toFixed(2)}ms`);
            console.log(`Average time with let: ${(results.usinglet / maxTests).toFixed(2)}ms`);
        }
    }, 0);
}

function usingVar() {
    let start = now();
    var x = 0;
    for (var i = 0; i < loopLimit; i++) {
        x += i;
    }
    if (x !== expectedX) {
        throw new Error("Error in test");
    }
    return now() - start;
}

function usinglet() {
    let start = now();
    let x = 0;
    for (let i = 0; i < loopLimit; i++) {
        x += i;
    }
    if (x !== expectedX) {
        throw new Error("Error in test");
    }
    return now() - start;
}