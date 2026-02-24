#!/usr/bin/env node
import { cpSync, existsSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const appName = process.argv[2] || 'my-app';
const targetDir = resolve(process.cwd(), appName);

if (existsSync(targetDir)) {
  console.error(`目录已存在: ${targetDir}`);
  process.exit(1);
}

const __dirname = dirname(fileURLToPath(import.meta.url));
const templateDir = resolve(__dirname, '../template');

cpSync(templateDir, targetDir, { recursive: true });

const pkgPath = join(targetDir, 'package.json');
const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'));
pkg.name = appName;
writeFileSync(pkgPath, `${JSON.stringify(pkg, null, 2)}\n`);

console.log(`\n创建完成: ${appName}`);
console.log(`cd ${appName}`);
console.log(`bun install`);
console.log(`bun run dev\n`);
