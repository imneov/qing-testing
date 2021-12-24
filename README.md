# Qing-test

Qing-test is a simple, yet elegant, autotest library.

```typescript
const { qtesting } = require("qing-testing");

test("异步交互式输入", async () => {
  const case = qtesting.Case.run({
    data: {
      cmd: "cat",
      args: [],
      options: {
        input: "123",
      },
    },
    execute: qtesting.spawner,
    expectedResults: 123,
  });
  console.log(case);
  expect(case.actualResults).toBe("123");
});
```

Qing-testing supports cli http api test, you only need to write test `data` and pass in the execution method like `qtesting.spawner`, of course you can too can also customize the execution method

[![codecov](https://codecov.io/gh/lunz1207/qing-testing/branch/main/graph/badge.svg?token=050YYB8TBD)](https://codecov.io/gh/lunz1207/qing-testing)

## Installing

```bash
npm install qing-testing
```

## Supported Features

- CLI
- http
- async case
- sync case

## Best–Practices

test result bind case for other case

```bash
const { qtesting } = require('qing-testing')

test("用例数据调用", async () => {
  const c1 = qtesting.Case.run(
    {
      data: {
        cmd: "cat",
        args: [],
        options: {
          input: "123",
        },
      },
      execute: qtesting.spawner,
      expectedResults: 123
    }
  )

  const c2 = qtesting.Case.run(
    {
      data: {
        cmd: "cat",
        args: [],
        options: {
          input: c1.actualResults,
        },
      },
      execute: qtesting.spawner,
      expectedResults: 123
    }
  )
  expect(c2.actualResults).toBe("123");
});

```
