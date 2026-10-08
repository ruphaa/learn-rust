import { execFileSync } from 'node:child_process';
import { mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { projects } from '../src/projects.js';

const output = mkdtempSync(join(tmpdir(), 'rust-field-notes-starters-'));
for (const project of projects) {
  const binary = join(output, project.id);
  execFileSync('rustc', ['--edition=2021', '--crate-name', project.id.replaceAll('-', '_'), '-', '-o', binary], { input: project.code, stdio: ['pipe', 'pipe', 'pipe'] });
  execFileSync(binary, [], { timeout: 5000 });
  const testBinary = `${binary}-tests`;
  execFileSync('rustc', ['--edition=2021', '--test', '--crate-name', project.id.replaceAll('-', '_'), '-', '-o', testBinary], { input: project.code, stdio: ['pipe', 'pipe', 'pipe'] });
  execFileSync(testBinary, [], { timeout: 5000 });
  console.log(`PASS ${project.id}: compiles, runs, and passes embedded tests`);
}
console.log(`Verified ${projects.length} starter programs. Temporary binaries: ${output}`);
