# Some ElasticSearch tests

1. basic indexing/searching
1. big import / search

### To launch it

Install an ElasticSearch locally :
```shell
npm run install
```

Check ES is healthy :
- http://localhost:9200/_cat/health?v
- http://localhost:9200/_stats

And run your test :
```shell
npm test
# or
npm run start-big-import
npm run start-big-search
```

### Results

From big import / search :
```shell
### 1 million in 12 minutes
2022-02-23T14:31:34.298Z import start for objective = 1000000
2022-02-23T14:32:54.665Z 100000
2022-02-23T14:34:17.044Z 200000
2022-02-23T14:35:26.711Z 300000
2022-02-23T14:36:38.092Z 400000
2022-02-23T14:37:51.237Z 500000
2022-02-23T14:39:00.310Z 600000
2022-02-23T14:40:11.539Z 700000
2022-02-23T14:41:16.786Z 800000
2022-02-23T14:42:19.119Z 900000
2022-02-23T14:43:23.515Z 1000000
2022-02-23T14:43:23.516Z import done:  1000000
2022-02-23T14:43:29.734Z import refresh done

### search in 0.03 seconds

2022-02-23T14:59:08.564Z search start
2022-02-23T14:59:08.591Z search result value:  6
```
