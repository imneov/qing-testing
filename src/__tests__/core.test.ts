import { Case } from "../core";
import { asyncSpawner, httpRequest, spawner } from "../helper";

describe("core", () => {
  test("run", async () => {
    const c1 = Case.run({
      id: "001",
      description: "测试用例001",
      steps: `
      1、初始化一个 Case 对象`,
      data: {
        cmd: "cat",
        args: [],
        options: { input: "123" },
      },
      execute: spawner,
      expectedResults: "123",
      helper: {
        get: (args: any) => {
          /**
           * 数据处理逻辑
           */
          let result = args + "4";
          return result;
        },
      },
      isAutomation: true,
      type: "CLI",
    });

    const c2 = Case.run({
      id: "002",
      description: "测试用例002",
      steps: `
      1、初始化一个 Case 对象 c1
      2、初始化一个 Case 对象 c2
      2、c2 调用 c1 的实际结果并进行数据处理`,
      data: {
        cmd: "cat",
        args: [],
        options: { input: c1.helper.get(c1.actualResults) },
      },
      execute: spawner,
      expectedResults: "1234",
      helper: undefined,
      isAutomation: true,
      type: "CLI",
    });
    expect(c2.expectedResults).toBe(c2.actualResults);
  });

  test("asyncRun", async () => {
    const c1 = await Case.asyncRun({
      id: "001",
      description: "测试用例001",
      steps: `
      1、初始化一个 Case 对象`,
      data: {
        cmd: "cat",
        args: [],
        options: { input: "123" },
      },
      execute: asyncSpawner,
      expectedResults: "123",
      helper: {
        get: (args: any) => {
          /**
           * 数据处理逻辑
           */
          let result = args + "4";
          return result;
        },
      },
      isAutomation: true,
      type: "CLI",
    });

    const c2 = await Case.asyncRun({
      id: "002",
      description: "测试用例002",
      steps: `
      1、初始化一个 Case 对象 c1
      2、初始化一个 Case 对象 c2
      2、c2 调用 c1 的实际结果并进行数据处理`,
      data: {
        cmd: "cat",
        args: [],
        options: { input: c1.helper.get(c1.actualResults) },
      },
      execute: asyncSpawner,
      expectedResults: "1234",
      helper: undefined,
      isAutomation: true,
      type: "CLI",
    });
    expect(c2.expectedResults).toBe(c2.actualResults);
  });

  test("async http request", async () => {
    const c1 = await Case.asyncRun({
      data: {
        baseURL: "https://yande.re/",
        url: "/post.json",
        method: "get",
        params: {
          limit: 1,
        },
        headers: {
          "content-type": "application/json; charset=utf-8",
        },
      },
      execute: httpRequest,
      expectedResults: { status: 200 },
    });
    expect(c1.actualResults).toMatchObject(c1.expectedResults);
  });
});
