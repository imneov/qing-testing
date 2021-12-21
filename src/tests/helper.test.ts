import { asyncSpawner, spawner } from "../helper";

describe("helper", () => {
  test("同步交互式输入", async () => {
    console.log(
      spawner({
        cmd: "node",
        args: ["-v"],
      })
    );
    console.log(
      spawner({
        cmd: "cat",
        args: [],
        options: {
          input: "用户输入",
        },
      })
    );
  });

  test("异步交互式输入", async () => {
    console.log(
      await asyncSpawner({
        cmd: "node",
        args: ["-v"],
      })
    );
    console.log(
      await asyncSpawner({
        cmd: "cat",
        args: [],
        options: {
          input: "用户输入",
        },
      })
    );
  });
});
