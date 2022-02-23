const {Client} = require('@elastic/elasticsearch')
const client = new Client({node: 'http://localhost:9200'})

const indexName = 'big-8';

async function bigSearch() {

    console.log(new Date(), 'search start');
    const result = await client.search({
        index: indexName,
        body: {
            query: {
                term: {key: '010203040506'}
            }
        }
    });

    console.log(new Date(), 'search result value: ', result.body.hits.hits[0]._source.value);
    // console.log('### result: ', result);
}

bigSearch().catch(console.log);
