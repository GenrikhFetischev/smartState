import { SmartState } from "./smartState";
console.clear();
(async () => {
  await new Promise((resolve) => setTimeout(resolve, 3000));
})();

if (process.env.TS_NODE_DEV) {
  process.on("SIGTERM", () =>
    require("child_process").execSync(`kill -9 ${process.pid}`)
  );
}

const storage = new SmartState({ numbers: { a: 1, b: 2 } });
// const state = storage.state;

//@ts-ignore
console.log(JSON.stringify(storage.subscribersTree));

// console.log(
//   storage.getData(state.numbers.b, (data) =>
//     console.log(data, "state.numbers.b")
//   )
// );
// console.log(
//   storage.getData(state.numbers, (data) => console.log(data, "state.numbers"))
// );
// storage.setData(state.numbers.b, 123);

(async () => {
  await new Promise((resolve) => setTimeout(resolve, 60000));
})();
