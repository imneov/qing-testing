var fs = require("fs");
import path from "path";
var util = require("util");
import { execSync, exec, spawnSync, spawn } from "child_process";

/**
 * 异步执行命令，不支持交互式输入
 * @param {string}  cmd - 命令
 * @return {object} 命令的执行结果
 */
export async function asyncCmder(cmd: string): Promise<any> {
  const result = await util.promisify(exec)(cmd);
  return result;
}

/**
 * 同步执行命令，不支持交互式输入
 * @param {string}  cmd - 命令
 * @return {string}} 命令的执行结果
 */
export function cmder(cmd: string): string {
  const result = execSync(cmd).toString();
  return result;
}

/**
 * 异步执行命令，支持交互式输入
 * @param {string}  cmd - 命令
 * @param {Array} arg - 命令的参数
 * @param {string} [content] - 可选参数，用户输入
 * @return {string} 命令的执行结果
 */
export async function asyncSpawner(
  cmd: string,
  arg: Array<any>,
  content?: string
) {
  const sp = spawn(cmd, arg);

  if (content) {
    sp.stdin.write(content);
    sp.stdin.end();
  }

  let result: any;
  for await (const chunk of sp.stdout) {
    result = chunk.toString();
  }

  return result;
}

/**
 * 同步执行命令，支持交互式输入
 * @param {string}  cmd - 命令
 * @param {Array} arg - 命令的参数
 * @param {object} [options] - 可选参数，object 类型
 * @return {string} 命令的执行结果
 */
export function spawner(
  cmd: string,
  arg: Array<any>,
  options?: object
): string {
  const result = spawnSync(cmd, arg, options).stdout.toString();
  return result;
}

/**
 * 获取 txt 文件内容
 * @param {string} filePath - 文件路径
 * @return {string} 文件内容
 */
export function getFileContent(filePath: string): string {
  const content = fs.readFileSync(path.resolve(filePath), "utf-8");
  return content;
}
