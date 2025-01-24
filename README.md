# @dsnp/parquetjs size test

This script creates a parquet file of DSNP Broadcast announcements.

Set environment variable `ROWS` to the number of rows to randomly generate (default `1000`).

At `ROWS=4096`, output file size and memory usage starts to increase far more than linearly.

| Rows | Output file size |
| --- | --- |
| 4000 | 376030 |
| 4050 | 380029 |
| 4090 | 383127 |
| 4092 | 383237 |
| 4093 | 383371 |
| 4094 | 383480 |
| 4095 | 383523 |
| 4096 | 1413841 |
| 4097 | 3091413 |
| 4100 | 12008913 |
| 4120 | 221395168 |
| 4160 | 1434171544 |
| 4170 | 1905851364 |

Higher values start to crash `node` or fill up all remaining disk space.

```
npm ci
ROWS=4200 node index.js
```
