const { dockStart } = require('@nlpjs/basic');
const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});



(async () => {
  const dock = await dockStart({ use: ['Basic']});
  const nlp = dock.get('nlp');
  await nlp.addCorpus('./models/en-US.json');
  await nlp.train();
  while (true) {
  rl.question("Message> ", async function(message) {
  const response = await nlp.process('en', message);
  console.log(response.intent + "\n" + response.score);
  });
}
  
})();