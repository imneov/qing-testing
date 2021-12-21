import { Case } from "../core";

describe("core", () => {
  test("init", async () => {
    const c1 = Case.init({
      id: "001",
      description: "测试用例001",
      steps: `
      1、初始化一个 Case 对象`,
      data: {
        cmd: "123",
      },
      expectedResults: "123",
      actualResults: 123,
      helper: {
        get: (args: any) => {
          /**
           * 数据处理逻辑
           */
          let result = args + 123;
          return result;
        },
      },
      isAutomation: true,
      type: "CLI",
    });

    const c2 = Case.init({
      id: "002",
      description: "测试用例002",
      steps: `
      1、初始化一个 Case 对象 c1
      2、初始化一个 Case 对象 c2
      2、c2 调用 c1 的实际结果并进行数据处理`,
      data: {
        cmd: "123",
      },
      expectedResults: 246,
      actualResults: c1.helper.get(c1.actualResults),
      helper: undefined,
      isAutomation: true,
      type: "CLI",
    });
    expect(c2.expectedResults).toBe(c2.actualResults);
  });

  test("asyncInit", async () => {
    const c1 = await Case.asyncInit({
      id: "001",
      description: "测试用例001",
      steps: `
      1、初始化一个 Case 对象`,
      data: {
        cmd: "123",
      },
      expectedResults: "123",
      actualResults: 123,
      helper: {
        get: (args: any) => {
          /**
           * 数据处理逻辑
           */
          let result = args + 123;
          return result;
        },
      },
      isAutomation: true,
      type: "CLI",
    });

    const c2 = await Case.asyncInit({
      id: "002",
      description: "测试用例002",
      steps: `
      1、初始化一个 Case 对象 c1
      2、初始化一个 Case 对象 c2
      2、c2 调用 c1 的实际结果并进行数据处理`,
      data: {
        cmd: "123",
      },
      expectedResults: 246,
      actualResults: c1.helper.get(c1.actualResults),
      helper: undefined,
      isAutomation: true,
      type: "CLI",
    });
    expect(c2.expectedResults).toBe(c2.actualResults);
  });
});
