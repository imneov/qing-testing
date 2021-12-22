/**
 * @todo: 重构 Cli 数据结构
 */
export type Command = {
  cmd: string;
  args?: Array<any>;
  options?: { input: string };
};
