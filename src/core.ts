import { TestCase } from "./core.d";

export class Case {
  public id: any;
  public description: any;
  public steps: any;
  public execute: any;
  public expectedResults: any;
  public actualResults: any;
  public helper: any;
  public isAutomation: any;
  public type: any;

  static async asyncInit(testCase: TestCase) {
    const c = new Case();
    c.id = testCase.id;
    c.description = testCase.description;
    c.steps = testCase.steps;
    c.execute = testCase.execute;
    c.expectedResults = testCase.expectedResults;
    c.actualResults = testCase.actualResults;
    c.helper = testCase.helper;
    c.isAutomation = testCase.steps;
    c.type = testCase.type;
    return c;
  }

  static init(testCase: TestCase) {
    const c = new Case();
    c.id = testCase.id;
    c.description = testCase.description;
    c.steps = testCase.steps;
    c.execute = testCase.execute;
    c.expectedResults = testCase.expectedResults;
    c.actualResults = testCase.actualResults;
    c.helper = testCase.helper;
    c.isAutomation = testCase.steps;
    c.type = testCase.type;
    return c;
  }
}
