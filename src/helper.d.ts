/**
 * @todo: 重构 Cli 数据结构
 */
export type Command = {
  cmd: string;
  args?: Array<any>;
  options?: { input: string };
};

/**
 * @todo: 定义 Http 数据结构，支持 http 接口测试
 */
export type Http = {
  headers: object;
  body: object;
  cookie: object;
};
