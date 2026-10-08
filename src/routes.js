import { lessonById } from './course';
import { projectById } from './projects';

export function parseRoute(hash) {
  const path = (hash || '#/').replace(/^#/, '').split('?')[0].replace(/\/$/, '') || '/';
  if (path === '/' || path === '/learn') return { type: 'learn' };
  if (path === '/projects') return { type: 'projects' };
  const [, type, id] = path.split('/');
  if (path === `/lesson/${id}` && type === 'lesson' && lessonById[id]) return { type, id };
  if (path === `/project/${id}` && type === 'project' && projectById[id]) return { type, id };
  return { type: 'missing' };
}
