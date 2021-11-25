import {
  spawner,
  asyncSpawner,
  cmder,
  asyncCmder,
  getFileContent,
} from "./helper";

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

  static async asyncInit(
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
    c.expectation = getFileContent(expectation);
    c.actuality = await asyncCmder(command);
    c.asyncStore = callback(c.actuality);
    return c;
  }

  static init(
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
    c.expectation = getFileContent(expectation);
    c.actuality = cmder(command);
    c.store = callback(c.actuality);
    return c;
  }
}
