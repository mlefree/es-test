const {Client} = require('@elastic/elasticsearch');
const client = new Client({
    node: 'http://localhost:9200'
});
client.info(console.log);

async function run() {
    console.log('indexing...');

    // Let's start by indexing some data
    await client.index({
        index: 'game-of-thrones',
        body: {
            character: 'Ned Stark',
            quote: 'Winter is coming ....'
        }
    })

    await client.index({
        index: 'game-of-thrones',
        body: {
            character: 'Daenerys Targaryen',
            quote: 'I am the blood of the dragon.'
        }
    })

    await client.index({
        index: 'game-of-thrones',
        body: {
            character: 'Tyrion Lannister',
            quote: 'A mind needs books like a sword needs a whetstone.'
        }
    })

    // here we are forcing an index refresh, otherwise we will not
    // get any result in the consequent search
    await client.indices.refresh({index: 'game-of-thrones'})

    console.log('searching...');
    const result = await client.search({
        index: 'game-of-thrones',
        body: {
            query: {
                match: {quote: 'winter'}
                // term: {quote: 'I am the blood of the dragon.'}
            }
        }
    });

    console.log(result.body.hits.total.value);
    console.log('### result: ', result);
}

run().catch(console.log)
