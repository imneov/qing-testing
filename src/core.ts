import { TestCase } from "./types/core";

export class Case {
  public id: any;
  public description: any;
  public steps: any;
  public data: any;
  public execute: any;
  public expectedResults: any;
  public actualResults: any;
  public helper: any;
  public isAutomation: any;
  public type: any;
  public expect: any;

  static async asyncRun(testCase: TestCase) {
    const c = new Case();
    c.type = testCase.type;
    c.id = testCase.id;
    c.description = testCase.description;
    c.steps = testCase.steps;
    c.data = testCase.data;
    c.execute = testCase.execute;
    c.expectedResults = testCase.expectedResults;
    c.actualResults = await c.execute(c.data);
    c.helper = testCase.helper;
    c.isAutomation = testCase.isAutomation;
    return c;
  }

  static run(testCase: TestCase) {
    const c = new Case();
    c.id = testCase.id;
    c.type = testCase.type;
    c.description = testCase.description;
    c.steps = testCase.steps;
    c.data = testCase.data;
    c.execute = testCase.execute;
    c.expectedResults = testCase.expectedResults;
    c.actualResults = c.execute(c.data);
    c.helper = testCase.helper;
    c.isAutomation = testCase.isAutomation;
    return c;
  }
}
