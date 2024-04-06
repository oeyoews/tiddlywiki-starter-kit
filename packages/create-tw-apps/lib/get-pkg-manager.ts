export type PackageManager = 'npm' | 'pnpm' | 'yarn' | 'bun';

export function getPkgManager(): PackageManager {
  const userAgent = process.env.npm_config_user_agent || '';

  switch (userAgent) {
    case 'yarn':
      return 'yarn';
    case 'pnpm':
      return 'pnpm';
    case 'bun':
      return 'bun';
    default:
      return 'npm';
  }
}
