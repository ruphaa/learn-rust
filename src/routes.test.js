import { describe, it, expect } from 'vitest';
import { parseRoute } from './routes';
import { allLessons } from './course';
import { projects } from './projects';

describe('navigation destinations', () => {
  it('gives projects their own pages rather than redirecting to a lesson', () => {
    for (const project of projects) {
      expect(parseRoute(`#/project/${project.id}`)).toEqual({ type: 'project', id: project.id });
    }
  });
  it('resolves every lesson and the two section pages', () => {
    for (const lesson of allLessons) expect(parseRoute(`#/lesson/${lesson.id}`)).toEqual({ type: 'lesson', id: lesson.id });
    expect(parseRoute('#/projects')).toEqual({ type: 'projects' });
    expect(parseRoute('')).toEqual({ type: 'learn' });
  });
  it('shows a recoverable missing-page state instead of quietly loading the first lesson', () => {
    for (const hash of ['#/lesson/unknown', '#/project/unknown', '#/anything', '#/lesson/ownership/extra']) expect(parseRoute(hash)).toEqual({ type: 'missing' });
  });
});
