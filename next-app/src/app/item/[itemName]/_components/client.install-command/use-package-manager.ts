import { atom, useAtom } from 'jotai';

import type { PackageManagerKey } from '#root/registry/output-generator/generate-next/registry/types.package-manager';

export { type PackageManagerKey };

const atomPackageManager = atom<PackageManagerKey>('npm');

export const usePackageManager = () => {
  const [packageManager, setPackageManager] = useAtom(atomPackageManager);
  return {
    packageManager,
    setPackageManager
  };
};