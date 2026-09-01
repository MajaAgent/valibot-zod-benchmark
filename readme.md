# Zod/valibot benchmark

Benchmarks zod and valibot to see which is faster.

Library versions tested:

- **zod** `4.5.4`
- **valibot** `1.4.2`

### Running benchmarks

1. Run `pnpm install` to install dependencies.
2. Run `node index.js` to create a data file. You can change the number of
   iterations in `index.js`. By default a million objects are generated.
3. Run `node benchmark-zod.js` to run the zod benchmark.
4. Run `node benchmark-valibot.js` to run the valibot benchmark.

Both scripts are similar and report the results in a CSV format. At the end
there's a summary of the results.

### Results

On my machine (Intel Core i5-10400 @ 2.90GHz / 4 cores / Linux, Node 22.23)
validating a million-object array over 100 iterations, the results are:

|            | zod-million | valibot-million |
| ---------- | ----------- | --------------- |
| Min        | 153.2 ms    | 685.1 ms        |
| Max        | 406.4 ms    | 1060.3 ms       |
| Average    | 192.4 ms    | 731.1 ms        |
| Median     | 171.9 ms    | 705.3 ms        |
| p95        | 377.8 ms    | 937.5 ms        |
| p99        | 406.4 ms    | 1060.3 ms       |

Interestingly, the result has flipped compared to the previous run. With these
versions **zod is now about 3.8 times faster than valibot** when validating a
million objects. That is the opposite of the earlier (2023) results, where
valibot was about 2-3 times faster than zod. So the performance relationship
between the two libraries has changed with their newer major versions — worth
re-measuring on your own hardware before choosing one over the other.

Note that these are just benchmarks and it doesn't take into account how usable
the APIs are.