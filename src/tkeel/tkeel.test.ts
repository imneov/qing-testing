import { casePool } from "./keel.case";

test("just run test", () => {
  expect(casePool.c1.actualResults).toMatchObject(casePool.c1.expectedResults);
});
