import { c1, c2, cases } from "./cli.case";
import { asyncSpawner, spawner } from "../helper";

describe("tkeel cli", () => {
  var testCases: any;

  beforeAll(async () => {
    testCases = await cases();
  });

  test("001", async () => {
    expect(c1.actuality).toBe(c1.expectation);
    console.log(c2);
  });

  test("002", async () => {
    console.log(testCases.c2);
  });

  test("同步交互式输入", async () => {
    console.log(spawner("tkeel", ["-v"]));
    console.log(spawner("cat", [], { input: "用户输入" }));
  });

  test("异步交互式输入", async () => {
    console.log(await asyncSpawner("tkeel", ["-v"]));
    console.log(await asyncSpawner("cat", [], "123456"));
  });
});
