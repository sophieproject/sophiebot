const { dockStart } = require('@nlpjs/basic');

(async () => {
  const dock = await dockStart({ use: ['Basic']});
  const nlp = dock.get('nlp');
  await nlp.addCorpus('./models/en-US.json');
  await nlp.train();
  const response = await nlp.process('en', 'Who are you');
  console.log(response);
})();