# E2E 测试

[![codecov](https://codecov.io/gh/lunz1207/qing-testing/branch/main/graph/badge.svg?token=050YYB8TBD)](https://codecov.io/gh/lunz1207/qing-testing)

qing-testing 测试框架，支持：

- CLI 自动化测试
- 接口自动化测试
- UI 自动化测试

## 测试设计

我们设计了如下测试用例类 ，主要包含三个部分：

- 测试用例属性
- 测试执行方法
- 执行结果存储

Case 类实例化的过程即是测试执行过程。实例化完成后会自动将执行的结果绑定实例，供其他用例调用。如果需要对测试执行数据进行处理，实例化时在外部将处理逻辑以函数的形式传入即可。以 Case 实例组织测试场景，优化测试用例之间的测试数据依赖问题。

```typescript
export class Case {
  public id!: string;
  // 用例 id
  public name!: string;
  // 用例名称
  public describe!: string;
  // 用例描述
  public command!: string;
  // 用例输入: tkeel 命令
  public expectation: any;
  // 预期结果
  public actuality: any;
  // 实际结果
  public store: any;
  // 用例输出,通常是供其他用例调用的测试数据
  public asyncStore: any;
  // 同上，异步方式

  async asyncCmder(args: string) {
    // 异步执行 cmd
    const result = await util.promisify(exec)(args);
    return result;
  }

  cmder(args: string) {
    // 同步执行 cmd
    const result = execSync(args).toString();
    return result;
  }

  static async asyncInit(
    // 异步方法，初始化 CASE 实例
    id: string,
    name: string,
    describe: string,
    command: string,
    expectation: string,
    callback: Function
  ) {
    const c = new Case();
    c.id = id;
    c.name = name;
    c.describe = describe;
    c.expectation = c.getter(expectation);
    c.actuality = await c.asyncCmder(command);
    c.asyncStore = callback(c.actuality);
    return c;
  }

  static init(
    // 同步方法，初始化 CASE 实例
    id: string,
    name: string,
    describe: string,
    command: string,
    expectation: string,
    callback: Function
  ) {
    const c = new Case();
    c.id = id;
    c.name = name;
    c.describe = describe;
    c.expectation = c.getter(expectation);
    c.actuality = c.cmder(command);
    c.store = callback(c.actuality);
    return c;
  }
}
```

## 用例编写

### 同步用例

```typescript
import { Case } from "../core";

export const c1 = Case.init(
  "c001", // 用例id
  "tkeel是否安装", // 用例名称
  "输入 tkeel 验证是否安装成功", // 用例描述
  "tkeel", // 用例输入：待执行的命令
  "tkeel", // 预期结果
  (arg: string) => {
    // 将执行结果数据进行处理
    const result = arg;
    return "test date for  c002";
  }
);

export const c2 = Case.init(
  c1.store,
  "tkeel是否安装",
  "这是测试用例 c002",
  "tkeel",
  "tkeel",
  (arg: string) => {
    // 处理逻辑
    const result = arg;
    return "this is a test date for c003";
  }
);
```

### 异步用例

```typescript
export async function cases() {
  // 实例化 case 并打包
  const c1 = await Case.asyncInit(
    "c001",
    "tkeel是否安装",
    "输入 tkeel 验证是否安装成功",
    "tkeel",
    "tkeel",
    (arg: string) => {
      // 处理逻辑
      const result = arg;
      return "c002 from c001 store";
    }
  );

  const c2 = await Case.asyncInit(
    c1.asyncStore,
    "tkeel是否安装",
    "这是测试用例 c002",
    "tkeel",
    "tkeel",
    (arg: string) => {
      // 处理逻辑

      const result = arg;
      return "this is a test date for c003";
    }
  );

  const testCases = {
    c1,
    c2,
  };

  return testCases;
}
```

### 校验预期

```typescript
import { c1, c2, cases } from "./cli.case";

describe("tkeel cli", () => {
  var testCases: any;

  beforeAll(async () => {
    testCases = await cases();
  });

  test("001", () => {
    // 同步用例
    expect(c1.actuality).toBe(c1.expectation);
    console.log(c2);
  });

  test("002", async () => {
    // 异步用例
    expect(testCases.c1.actuality).toBe(testCases.c1.expectation);
    console.log(testCases.c2);
  });
});
```

## 执行用例

依赖

- node.js
- npm
- tkeel CLI

```javascript
cd qing-testing
// 安装node依赖
npm install
// 运行测试
npm run test
```
