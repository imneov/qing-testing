import { asyncSpawner, spawner } from "../helper";

describe("helper", () => {
  test("同步交互式输入", async () => {
    const result = spawner({
      cmd: "node",
      args: ["-v"],
    });
    expect(result).toContain("v17");

    const result_2 = spawner({
      cmd: "cat",
      args: [],
      options: {
        input: "123",
      },
    });
    expect(result_2).toBe("123");
  });

  test("异步交互式输入", async () => {
    const result = await asyncSpawner({
      cmd: "cat",
      args: [],
      options: {
        input: "123",
      },
    });
    expect(result).toBe("123");
  });
});
