import { describe, it, expect } from 'vitest';
import { projects, suggestedProject } from './projects';
import { lessonById, allLessons } from './course';

describe('project curriculum', () => {
  it('covers all four levels with unique, complete build guides', () => {
    expect(projects).toHaveLength(15);
    expect(new Set(projects.map(project => project.id)).size).toBe(projects.length);
    expect(new Set(projects.map(project => project.stage))).toEqual(new Set(['Beginner', 'Intermediate', 'Advanced', 'Production']));
    for (const project of projects) {
      expect(project.milestones.length).toBeGreaterThanOrEqual(4);
      expect(project.code).toContain('fn main()');
      expect(project.sources.length).toBeGreaterThan(0);
      for (const milestone of project.milestones) {
        expect(milestone.title).toBeTruthy();
        expect(milestone.task).toBeTruthy();
        expect(milestone.check).toBeTruthy();
      }
      for (const source of project.sources) expect(new URL(source.href).protocol).toBe('https:');
      for (const id of project.lessons) expect(lessonById[id], `${project.id}: missing prerequisite ${id}`).toBeTruthy();
    }
  });
  it('connects every lesson to an existing project', () => {
    for (const lesson of allLessons) expect(projects).toContain(suggestedProject(lesson.id));
  });
});
