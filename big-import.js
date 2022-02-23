const {Client} = require('@elastic/elasticsearch');
const client = new Client({node: 'http://localhost:9200'});

const indexName = 'big-8';
const max = 20;
const stepToTrace = 100000;

async function bigImport() {

    let done = 0;
    console.log(new Date(), 'import start with objective =', Math.pow(max, 6));
    for (let i0 = 0; i0 < max; i0++) {
        for (let i1 = 0; i1 < max; i1++) {
            for (let i2 = 0; i2 < max; i2++) {
                for (let i3 = 0; i3 < max; i3++) {
                    for (let i4 = 0; i4 < max; i4++) {

                        const promises = [];
                        for (let i5 = 0; i5 < max; i5++) {

                            const key =
                                ('' + i0).padStart(2, '0') +
                                ('' + i1).padStart(2, '0') +
                                ('' + i2).padStart(2, '0') +
                                ('' + i3).padStart(2, '0') +
                                ('' + i4).padStart(2, '0') +
                                ('' + i5).padStart(2, '0');

                            promises.push(new Promise(async (resolve, reject) => {
                                 await client.index({
                                    index: indexName,
                                    body: {
                                        key: key,
                                        value: i5
                                    }
                                });
                                done++;
                                if (done % stepToTrace === 0) {
                                    console.log(new Date(), done);
                                }
                                resolve();
                            }));
                        }
                        await Promise.all(promises);

                    }
                }
            }
        }
    }

    console.log(new Date(), 'import done: ', done);
    await client.indices.refresh({index: indexName});
    console.log(new Date(), 'import refresh done');
}

bigImport().catch(console.log)
