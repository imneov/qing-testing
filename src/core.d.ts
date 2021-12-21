/**
 * @todo: 重构 Cli 数据结构
 */
export type Command = {
  cmd: string;
  args?: Array<any>;
  options?: object;
};

/**
 * @todo: 定义 Http 数据结构，支持 http 接口测试
 */
export type Http = {
  headers: object;
  body: object;
  cookie: object;
};

/**
 * @todo: 定义 testCase 数据结构
 */
export type TestCase = {
  id: string;
  description: string;
  steps: string;
  data: Command | Http;
  expectedResults: any;
  actualResults: any;
  helper: object | undefined;
  isAutomation: true | false;
  type: "API" | "CLI" | "UI";
};
