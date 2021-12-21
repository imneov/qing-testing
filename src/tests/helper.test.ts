import { asyncSpawner, spawner } from "../helper";

describe("helper", () => {

  test("同步交互式输入", async () => {
    console.log(spawner("node", ["-v"]));
    console.log(spawner("cat", [], { input: "用户输入" }));
  });

  test("异步交互式输入", async () => {
    console.log(await asyncSpawner("node", ["-v"]));
    console.log(await asyncSpawner("cat", [], "123456"));
  });
});
