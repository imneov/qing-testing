import { TestCase } from "./core.d";
import { spawner, asyncSpawner } from "./helper";

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
    c.type = testCase.type;
    c.id = testCase.id;
    c.description = testCase.description;
    c.steps = testCase.steps;
    c.execute = testCase.execute;
    c.expectedResults = testCase.expectedResults;
    if (c.type == "CLI") {
      c.actualResults = await asyncSpawner(c.execute);
    }
    c.helper = testCase.helper;
    c.isAutomation = testCase.isAutomation;
    return c;
  }

  static init(testCase: TestCase) {
    const c = new Case();
    c.id = testCase.id;
    c.type = testCase.type;
    c.description = testCase.description;
    c.steps = testCase.steps;
    c.execute = testCase.execute;
    c.expectedResults = testCase.expectedResults;
    if (c.type == "CLI") {
      c.actualResults = spawner(c.execute);
    }
    c.helper = testCase.helper;
    c.isAutomation = testCase.isAutomation;
    return c;
  }
}
