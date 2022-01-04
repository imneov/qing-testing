import { Case } from "../core";
import { httpRequest, wait } from "../helper";
import {
  baseURL,
  adminPassword,
  repoName,
  installerName,
  installerVersion,
  pluginId,
} from "./env";

export const casePool: any = {};

// ---------------------------------------平台管理员登陆----------------------
test("管理员登陆", async () => {
  const c1 = await Case.asyncRun({
    description: "管理员登陆",
    data: {
      baseURL: baseURL,
      url: "/apis/rudder/v1/oauth2/admin",
      method: "get",
      params: {
        password: adminPassword,
      },
    },
    helper: {
      authorization: () => {
        let result = c1.actualResults.data.data;
        let authorization = `${result.token_type} ${result.access_token}`;
        return authorization;
      },
    },
    execute: httpRequest,
    expectedResults: { status: 200 },
  });
  expect(c1.actualResults).toMatchObject(c1.expectedResults);
  casePool["c1"] = c1;
});

// ------------------------------------------仓库相关------------------------
test("添加仓库", async () => {
  const c2 = await Case.asyncRun({
    description: `
      1.添加仓库 (无法重复添加）
      2.默认添加官方仓库`,
    data: {
      baseURL: baseURL,
      url: `/apis/rudder/v1/repos/${repoName}`,
      method: "post",
      data: { url: "https://tkeel-io.github.io/helm-charts" },
      headers: {
        Authorization: casePool.c1.helper.authorization(),
        "Content-Type": "application/json",
      },
    },
    execute: httpRequest,
    expectedResults: { status: 200 },
  });
  expect(c2.actualResults).toMatchObject(c2.expectedResults);
});

test("获取仓库信息", async () => {
  const c3 = await Case.asyncRun({
    description: "获取仓库信息",
    data: {
      baseURL: baseURL,
      url: "/apis/rudder/v1/repos",
      method: "get",
      headers: {
        Authorization: casePool.c1.helper.authorization(),
      },
    },
    execute: httpRequest,
    expectedResults: { status: 200 },
  });
  expect(c3.actualResults).toMatchObject(c3.expectedResults);
});

test("仓库所有安装包", async () => {
  const c4 = await Case.asyncRun({
    description: "获取（默认仓库 tkeel-io ）仓库所有安装包",
    data: {
      baseURL: baseURL,
      url: `/apis/rudder/v1/repos/${repoName}/installers`,
      method: "get",
      data: { url: "https://tkeel-io.github.io/helm-charts" },
      headers: {
        Authorization: casePool.c1.helper.authorization(),
        "Content-Type": "application/json",
      },
    },
    execute: httpRequest,
    expectedResults: { status: 200 },
  });
  expect(c4.actualResults).toMatchObject(c4.expectedResults);
});

test("获取仓库指定的安装包和版本", async () => {
  const c5 = await Case.asyncRun({
    description: "获取(默认仓库:tkeel-io)仓库指定的安装包和版本",
    data: {
      baseURL: baseURL,
      url: `/apis/rudder/v1/repos/${repoName}/installers/${installerName}/${installerVersion}`,
      method: "get",
      headers: {
        Authorization: casePool.c1.helper.authorization(),
        "Content-Type": "application/json",
      },
    },
    execute: httpRequest,
    helper: {
      installer: () => {
        let installer = c5.actualResults.data.data.installer;
        installer.Type = 1;
        return installer;
      },
    },
    expectedResults: { status: 200 },
  });
  expect(c5.actualResults).toMatchObject(c5.expectedResults);
  casePool["c5"] = c5;
});

// -----------------------------------------------插件相关------------------------
test("安装插件", async () => {
  const c6 = await Case.asyncRun({
    description: "安装插件(无法重复安装)",
    data: {
      baseURL: baseURL,
      url: `/apis/rudder/v1/plugins/${pluginId}`,
      method: "post",
      data: {
        installer: casePool.c5.helper.installer(),
      },
      headers: {
        Authorization: casePool.c1.helper.authorization(),
        "Content-Type": "application/json",
      },
    },
    execute: httpRequest,
    expectedResults: { status: 200 },
  });
  expect(c6.actualResults).toMatchObject(c6.expectedResults);
});

test("注册插件", async () => {
  const c7 = await Case.asyncRun({
    description: "经平台安装的插件才能被注册",
    data: {
      baseURL: baseURL,
      url: `/apis/rudder/v1/plugins/${pluginId}/register`,
      method: "post",
      data: {
        secret: "changeme",
      },
      headers: {
        Authorization: casePool.c1.helper.authorization(),
        "Content-Type": "application/json",
      },
    },
    execute: httpRequest,
    expectedResults: { status: 200 },
  });
  expect(c7.actualResults).toMatchObject(c7.expectedResults);
});

test("获取插件信息", async () => {
  const c8 = await Case.asyncRun({
    description: "获取插件信息",
    data: {
      baseURL: baseURL,
      url: `/apis/rudder/v1/plugins/${pluginId}`,
      method: "get",
      headers: {
        Authorization: casePool.c1.helper.authorization(),
        "Content-Type": "application/json",
      },
    },
    execute: httpRequest,
    expectedResults: { status: 200 },
  });
  expect(c8.actualResults).toMatchObject(c8.expectedResults);
});

test("列出所有插件", async () => {
  const c9 = await Case.asyncRun({
    description: "列出所有插件",
    data: {
      baseURL: baseURL,
      url: `/apis/rudder/v1/plugins/`,
      method: "get",
      headers: {
        Authorization: casePool.c1.helper.authorization(),
        "Content-Type": "application/json",
      },
    },
    execute: httpRequest,
    expectedResults: { status: 200 },
  });
  expect(c9.actualResults).toMatchObject(c9.expectedResults);
});

test("删除仓库", async () => {
  const c999 = await Case.asyncRun({
    description: "删除仓库",
    data: {
      baseURL: baseURL,
      url: `/apis/rudder/v1/repos/${repoName}`,
      method: "delete",
      headers: {
        Authorization: casePool.c1.helper.authorization(),
        "Content-Type": "application/json",
      },
    },
    execute: httpRequest,
    expectedResults: { status: 200 },
  });
  expect(c999.actualResults).toMatchObject(c999.expectedResults);
});
// ------------------------------------------租户相关 --------------------------------------
test("创建租户", async () => {
  const c12 = await Case.asyncRun({
    description: "创建租户",
    data: {
      baseURL: baseURL,
      url: "/apis/security/v1/tenants",
      method: "post",
      data: {
        title: `test_tenant_${repoName.slice(0, 4)}`,
        remark: "any word",
        admin: {
          username: `test_tenant_${repoName.slice(0, 4)}`,
          password: "123456",
        },
      },
      headers: {
        Authorization: casePool.c1.helper.authorization(),
        "Content-Type": "application/json",
      },
    },
    helper: {
      tenantId: () => {
        let tId = c12.actualResults.data.data.tenant_id;
        return tId;
      },
    },
    execute: httpRequest,
    expectedResults: { status: 200 },
  });
  expect(c12.actualResults).toMatchObject(c12.expectedResults);
  casePool["c12"] = c12;
});

test("获取所有租户", async () => {
  const c13 = await Case.asyncRun({
    description: "获取所有租户",
    data: {
      baseURL: baseURL,
      url: "/apis/security/v1/tenants",
      method: "get",
      headers: {
        Authorization: casePool.c1.helper.authorization(),
        "Content-Type": "application/json",
      },
    },
    execute: httpRequest,
    expectedResults: { status: 200 },
  });
  expect(c13.actualResults).toMatchObject(c13.expectedResults);
});

test("租户登陆", async () => {
  const c13 = await Case.asyncRun({
    description: "租户登陆",
    data: {
      baseURL: baseURL,
      url: "/apis/security/v1/oauth/token",
      method: "get",
      params: {
        grant_type: "password",
        username: `${casePool.c12.helper.tenantId()}-test_tenant_${repoName.slice(
          0,
          4
        )}`,
        password: "123456",
      },
    },
    execute: httpRequest,
    helper: {
      tenantRefreshToken: () => {
        let token = c13.actualResults.data.data.refresh_token;
        return token;
      },
    },
    expectedResults: { status: 200 },
  });
  expect(c13.actualResults).toMatchObject(c13.expectedResults);
  casePool["c13"] = c13;
});

test("刷新租户token", async () => {
  await wait(1500);
  const c14 = await Case.asyncRun({
    description: "刷新住户token",
    data: {
      baseURL: baseURL,
      url: "/apis/security/v1/oauth/token",
      method: "get",
      params: {
        grant_type: "refresh_token",
        refresh_token: casePool.c13.helper.tenantRefreshToken(),
      },
    },
    execute: httpRequest,
    helper: {
      tenantAccessToken: () => {
        let result = c14.actualResults.data.data;
        let authorization = `${result.token_type} ${result.access_token}`;
        return authorization;
      },
    },
    expectedResults: { status: 200 },
  });
  expect(c14.actualResults).toMatchObject(c14.expectedResults);
  casePool["c14"] = c14;
});

test("创建用户", async () => {
  const c15 = await Case.asyncRun({
    description: "创建用户",
    data: {
      baseURL: baseURL,
      url: "/apis/security/v1/tenants/users",
      method: "post",
      data: {
        username: `test_user_${repoName.slice(0, 4)}`,
        password: "123456",
        tenant_id: casePool.c12.helper.tenantId(),
      },
      headers: {
        Authorization: casePool.c14.helper.tenantAccessToken(),
        "Content-Type": "application/json",
      },
    },
    helper: {
      userId: () => {
        let uId = c15.actualResults.data.data.user_id;
        return uId;
      },
    },

    execute: httpRequest,
    expectedResults: { status: 200 },
  });
  expect(c15.actualResults).toMatchObject(c15.expectedResults);
  casePool["c15"] = c15;
});

test("所有用户", async () => {
  const c16 = await Case.asyncRun({
    description: "所有用户",
    data: {
      baseURL: baseURL,
      url: "/apis/security/v1/tenants/users",
      method: "get",
      params: {
        tenant_id: casePool.c12.helper.tenantId(),
      },
      headers: {
        Authorization: casePool.c14.helper.tenantAccessToken(),
        "Content-Type": "application/json",
      },
    },
    execute: httpRequest,
    expectedResults: { status: 200 },
  });
  expect(c16.actualResults).toMatchObject(c16.expectedResults);
});

test("删除指定用户", async () => {
  const c17 = await Case.asyncRun({
    description: "删除指定用户",
    data: {
      baseURL: baseURL,
      url: `/apis/security/v1/tenants/users/${casePool.c15.helper.userId()}`,
      method: "delete",
      params: {
        tenant_id: casePool.c12.helper.tenantId(),
      },
      headers: {
        Authorization: casePool.c14.helper.tenantAccessToken(),
        "Content-Type": "application/json",
      },
    },
    execute: httpRequest,
    expectedResults: { status: 200 },
  });
  expect(c17.actualResults).toMatchObject(c17.expectedResults);
});

test("启用插件", async () => {
  const c18 = await Case.asyncRun({
    description: "经平台注册后的插件才能被用户启用",
    data: {
      baseURL: baseURL,
      url: `/apis/rudder/v1/plugins/${pluginId}/tenants`,
      method: "post",
      data: { extra: "YW55IGRhdGE=" },
      headers: {
        Authorization: casePool.c14.helper.tenantAccessToken(),
        "Content-Type": "application/json",
      },
    },
    execute: httpRequest,
    expectedResults: { status: 200 },
  });
  expect(c18.actualResults).toMatchObject(c18.expectedResults);
});

test("插件访问", async () => {
  const c18 = await Case.asyncRun({
    description: "插件必须启用才能访问",
    data: {
      baseURL: baseURL,
      url: `/apis/${pluginId}/hello`,
      method: "get",
      headers: {
        Authorization: casePool.c14.helper.tenantAccessToken(),
        "Content-Type": "application/json",
      },
    },
    execute: httpRequest,
    expectedResults: { status: 200 },
  });
  expect(c18.actualResults).toMatchObject(c18.expectedResults);
});

test("停用插件", async () => {
  const c19 = await Case.asyncRun({
    description: "停用插件",
    data: {
      baseURL: baseURL,
      url: `/apis/rudder/v1/plugins/${pluginId}/tenants`,
      method: "delete",
      data: { extra: "YW55IGRhdGE=" },
      headers: {
        Authorization: casePool.c14.helper.tenantAccessToken(),
        "Content-Type": "application/json",
      },
    },
    execute: httpRequest,
    expectedResults: { status: 200 },
  });
  expect(c19.actualResults).toMatchObject(c19.expectedResults);
});

test("获取当前租户管理员已经启用的插件", async () => {
  const c19 = await Case.asyncRun({
    description: "获取当前租户管理员已经启用的插件",
    data: {
      baseURL: baseURL,
      url: `/apis/rudder/v1/entries`,
      method: "get",
      headers: {
        Authorization: casePool.c14.helper.tenantAccessToken(),
        "Content-Type": "application/json",
      },
    },
    execute: httpRequest,
    expectedResults: { status: 200 },
  });
  expect(c19.actualResults).toMatchObject(c19.expectedResults);
});

test("注销插件", async () => {
  const c10 = await Case.asyncRun({
    description: "注销插件",
    data: {
      baseURL: baseURL,
      url: `/apis/rudder/v1/plugins/${pluginId}/register`,
      method: "delete",
      headers: {
        Authorization: casePool.c1.helper.authorization(),
        "Content-Type": "application/json",
      },
    },
    execute: httpRequest,
    expectedResults: { status: 200 },
  });
  expect(c10.actualResults).toMatchObject(c10.expectedResults);
});

test("插件卸载", async () => {
  const c11 = await Case.asyncRun({
    description: "插件卸载",
    data: {
      baseURL: baseURL,
      url: `/apis/rudder/v1/plugins/${pluginId}`,
      method: "delete",
      headers: {
        Authorization: casePool.c1.helper.authorization(),
        "Content-Type": "application/json",
      },
    },
    execute: httpRequest,
    expectedResults: { status: 200 },
  });
  expect(c11.actualResults).toMatchObject(c11.expectedResults);
});

test("删除租户", async () => {
  const c998 = await Case.asyncRun({
    description: "删除租户",
    data: {
      baseURL: baseURL,
      url: `/apis/security/v1/tenants/${casePool.c12.helper.tenantId()}`,
      method: "delete",
      headers: {
        Authorization: casePool.c1.helper.authorization(),
        "Content-Type": "application/json",
      },
    },
    execute: httpRequest,
    expectedResults: { status: 200 },
  });
  expect(c998.actualResults).toMatchObject(c998.expectedResults);
});
