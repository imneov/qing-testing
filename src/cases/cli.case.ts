import { Case } from "../core";

export const c1 = Case.init(
  "001",
  "node 是否安装",
  "输入 node -h 验证是否安装成功",
  "tkeel",
  "./src/datas/tkeel.txt",
  (arg: string) => {
    // 处理逻辑
    const result = arg;
    return "test date for c002";
  }
);

export const c2 = Case.init(
  "002",
  "node 版本",
  "输入 node -v 验证版本号",
  "node -v",
  "./src/datas/plugin_help.txt",
  (arg: string) => {
    // 处理逻辑
    // const result = arg;
    console.log(c1.store)
    return "test date for c003";
  }
);

export async function cases() {
  // 实例化 case 并打包
  const c1 = await Case.asyncInit(
    "c001",
    "tkeel是否安装",
    "输入 tkeel 验证是否安装成功",
    "tkeel",
    "./src/datas/tkeel.txt",
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
    "tkeel plugin -h",
    "./src/datas/plugin_help.txt",
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
