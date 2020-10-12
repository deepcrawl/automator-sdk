import { sleep } from "./sleep.helper";

describe("#sleep", () => {
  it("should sleep for the required time", async () => {
    const startTimeStamp = Date.now();
    await sleep(1000);
    const endTimeStamp = Date.now();
    const secondsPassed = Math.floor((endTimeStamp - startTimeStamp) / 1000);
    expect(secondsPassed).toEqual(1);
  });
});
