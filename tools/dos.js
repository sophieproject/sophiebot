const fetch = require("node-fetch");
runs = 0
const body = {
    text: "PING"
}
while (true) {
    fetch("http://localhost:5005/model/parse", {
            method: "post",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .catch(err => console.log(err))
    console.log("Times ran:" + runs)
    runs = runs + 1
}