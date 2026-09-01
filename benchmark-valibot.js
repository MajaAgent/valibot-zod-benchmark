import fs from "fs";
import { array, object, number, string, parse } from "valibot";

const data = fs.readFileSync("./data.json", "utf8");
const json = JSON.parse(data);

const schema = object({
  id: number(),
  name: string(),
  price: number(),
  key1: string(),
  key2: string(),
  key3: string(),
  key4: string(),
});

const executionTimes = [];
console.log("Iteration, Execution Time");
for (let i = 0; i < 100; i++) {
  performance.mark("iterationStart");
  parse(array(schema), json);
  performance.mark("iterationEnd");
  performance.measure(
    `iterationDuration-${i}`,
    "iterationStart",
    "iterationEnd"
  );

  const measure = performance.getEntriesByName(`iterationDuration-${i}`)[0];
  executionTimes.push(measure.duration);

  console.log(`${i}, ${measure.duration}`);
}

const minExecutionTime = Math.min(...executionTimes);
const maxExecutionTime = Math.max(...executionTimes);
const averageExecutionTime =
  executionTimes.reduce((acc, val) => acc + val, 0) / executionTimes.length;

const sortedExecutionTimes = [...executionTimes].sort((a, b) => a - b);

const calculateMedian = (arr) => {
  const middleIndex = Math.floor(arr.length / 2);

  if (arr.length % 2 === 0) {
    return (arr[middleIndex - 1] + arr[middleIndex]) / 2;
  } else {
    return arr[middleIndex];
  }
};

const calculatePercentile = (arr, percentile) => {
  if (arr.length === 0) return 0;
  const index = Math.min(arr.length - 1, Math.floor((percentile / 100) * arr.length));
  return arr[index];
};

const medianExecutionTime = calculateMedian(sortedExecutionTimes);
const p95ExecutionTime = calculatePercentile(sortedExecutionTimes, 95);
const p99ExecutionTime = calculatePercentile(sortedExecutionTimes, 99);

console.log(`Minimum Execution Time: ${minExecutionTime} milliseconds`);
console.log(`Maximum Execution Time: ${maxExecutionTime} milliseconds`);
console.log(`Average Execution Time: ${averageExecutionTime} milliseconds`);
console.log(`Median Execution Time: ${medianExecutionTime} milliseconds`);
console.log(`p95 Execution Time: ${p95ExecutionTime} milliseconds`);
console.log(`p99 Execution Time: ${p99ExecutionTime} milliseconds`);
