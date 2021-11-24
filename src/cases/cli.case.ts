import { Case } from "../core";

export const c1 = Case.init(
  "c001",
  "tkeel是否安装",
  "输入 tkeel 验证是否安装成功",
  "tkeel",
  "tkeel",
  (arg: string) => {
    // 处理逻辑
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
