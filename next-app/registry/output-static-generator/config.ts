import { getFilePathFromRoot } from "@/lib/utils/file";

export const OUTPUT_FILE_PATHS = {
  REGISTRY_FOR_NEXT: {
    REGISTRY: getFilePathFromRoot('registry/output-static-artifacts/next/registry.json'),
    SIDEBAR: getFilePathFromRoot('registry/output-static-artifacts/next/sidebar-data.json'),
  },
  REGISTRY_FOR_SHADCN_CLI: {
    REGISTRY: getFilePathFromRoot('registry/output-static-artifacts/shadcn-cli/registry.json'),
  }
};