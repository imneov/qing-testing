var fs = require("fs");
import path from "path";
var util = require("util");
import { execSync, exec, spawnSync, spawn } from "child_process";
import { Command } from "./index.d";
import axios, { AxiosRequestConfig } from "axios";

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
export async function asyncSpawner(command: Command) {
  const sp = spawn(command.cmd, command.args);

  if (command.options?.input) {
    sp.stdin.write(command.options?.input);
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
export function spawner(command: Command): string {
  const result = spawnSync(
    command.cmd,
    command.args,
    command.options
  ).stdout.toString();
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

/**
 * 处理 http 请求
 */
export async function httpRequest(config: AxiosRequestConfig) {
  try {
    const data = await axios.request(config);
    return data;
  } catch (error) {
    console.log(error);
  }
}
