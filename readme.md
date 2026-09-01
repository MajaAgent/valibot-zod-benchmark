# Zod/valibot benchmark

Benchmarks zod and valibot to see which is faster.

### Running benchmarks

1. Run `pnpm install` to install dependencies.
2. Run `node index.js` to create a data file. You can change the number of
   iterations in `index.js`. By default a million objects are generated.
3. Run `node benchmark-zod.js` to run the zod benchmark on the million objects.
4. Run `node benchmark-valibot.js` to run the valibot benchmark on the million
   objects.
5. Run `node benchmark-zod-4k.js` / `node benchmark-valibot-4k.js` to run both
   on a 4000-object sample.

Or simply run `pnpm bench` to run everything in sequence.

All scripts are similar and report the results in a CSV format. At the end
there's a summary of the results.

### Results

On my machine (Intel Core i5-10400 @ 2.90GHz / 4 cores / Linux, Node 22.23),
validating a million-object array and a 4000-object sample over 100 iterations
each, the results are:

|            | zod-million | zod-4k | valibot-million | valibot-4k |
| ---------- | ----------- | ------ | --------------- | ---------- |
| Min        | 153.2 ms    | 0.16 ms| 685.1 ms        | 2.04 ms    |
| Max        | 406.4 ms    | 8.62 ms| 1060.3 ms       | 5.92 ms    |
| Average    | 192.4 ms    | 0.42 ms| 731.1 ms        | 2.30 ms    |
| Median     | 171.9 ms    | 0.17 ms| 705.3 ms        | 2.10 ms    |
| p95        | 377.8 ms    | 0.71 ms| 937.5 ms        | 2.90 ms    |
| p99        | 406.4 ms    | 8.62 ms| 1060.3 ms       | 5.92 ms    |

Interestingly, the result has flipped compared to the previous run. With these
versions **zod is now faster than valibot** on both dataset sizes (about 3.8× on
a million objects and about 5× on the 4000-object sample). That is the opposite
of the earlier (2023) results, where valibot was about 2-3 times faster than
zod. So the performance relationship between the two libraries has changed with
their newer major versions — worth re-measuring on your own hardware before
choosing one over the other.

Note that these are just benchmarks and it doesn't take into account how usable
the APIs are.

### Library versions

| Library | Previous | Used in this run |
| ------- | -------- | ---------------- |
| zod     | 3.22.4   | 4.5.4            |
| valibot | 0.25.0   | 1.4.2            |