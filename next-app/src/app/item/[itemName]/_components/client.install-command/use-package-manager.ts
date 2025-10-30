import { atom, useAtom } from 'jotai';

import type { PackageManagerKey } from '@/lib/registry/get-next-data';

export { type PackageManagerKey };

const atomPackageManager = atom<PackageManagerKey>('npm');

export const usePackageManager = () => {
  const [packageManager, setPackageManager] = useAtom(atomPackageManager);
  return {
    packageManager,
    setPackageManager
  };
};