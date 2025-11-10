import daysInShelter from "../utils";
import { describe, expect, it } from "vitest";

describe("#daysInShelter", () => {
  it("should return 0 days since today", () => {
    const today = new Date();
    expect(daysInShelter(today)).toEqual(0);
  });

  it("should return 5 days since 5 days ago", () => {
    var d = new Date();
    d.setDate(d.getDate() - 5);
    expect(daysInShelter(d)).toEqual(5);
  });

  it("should return 100 days since 100 days ago", () => {
    var d = new Date();
    d.setDate(d.getDate() - 100);
    expect(daysInShelter(d)).toEqual(100);
  });
});
