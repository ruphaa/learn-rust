import { describe, expect, it } from "vitest";
import { allLessons, lessonById, tracks } from "./course";

describe("course map", () => {
  it("keeps every navigation lesson backed by complete content", () => {
    expect(allLessons.length).toBe(23);
    for (const lesson of allLessons) {
      const detail = lessonById[lesson.id];
      expect(detail, lesson.id).toBeDefined();
      expect(detail.code.length, lesson.id).toBeGreaterThan(20);
      expect(detail.options.length, lesson.id).toBe(4);
      expect(detail.answer, lesson.id).toBeGreaterThanOrEqual(0);
      expect(detail.answer, lesson.id).toBeLessThan(4);
      expect(detail.href, lesson.id).toMatch(/^https:\/\/doc\.rust-lang\.org\/book\//);
    }
  });

  it("moves from beginner to production in four named tracks", () => {
    expect(tracks.map((track) => track.label)).toEqual([
      "Beginner",
      "Intermediate",
      "Advanced",
      "Production",
    ]);
  });
});
