/**
 * @todo: 定义 testCase 数据结构
 */
export type TestCase = {
  id: string;
  description: string;
  steps: string;
  execute: Command | Http;
  expectedResults: any;
  helper: object | undefined;
  isAutomation: true | false;
  type: "API" | "CLI" | "UI";
};
