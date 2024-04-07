export type PackageManager = 'npm' | 'pnpm' | 'yarn' | 'bun';

export function getPkgManager(): PackageManager {
  const userAgent = process.env.npm_config_user_agent || '';
  const packageManagerMap: Record<string, PackageManager> = {
    yarn: 'yarn',
    pnpm: 'pnpm',
    bun: 'bun'
  };

  return packageManagerMap[userAgent] || 'npm';
}