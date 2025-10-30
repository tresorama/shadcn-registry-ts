import { OUTPUT_FILE_PATHS } from "../config";

import { calculateRegistryForNext } from "../../output-deriver/next/registry/derive";
import { calculateStaticSidebarData } from "../../output-deriver/next/sidebar/derive";
import { calculateRegistryForShadcnCli } from "../../output-deriver/shadcn-cli/registry/derive";

import { writeFileJson } from "@/lib/utils/file";
import { createPerformanceTimer } from "@/lib/utils/performance-timer";

(async () => {
  try {
    console.log('Initializing ...!');
    await run();
    console.log('Success!');
    process.exit(0);
  } catch (error) {
    console.log('Error!');
    console.error(error);
    process.exit(1);
  }
})();

/**
 * Generate static data and save to disk
 */
async function run() {
  await generateNext();
  await generateShadcnCli();
  console.log('\nAll done. ✅');
}

async function generateNext() {
  console.log('\nGenerating [next-app] static data and saving to disk...');
  const perfTimer = createPerformanceTimer();

  console.log('Generating [next-app.registry]');
  await writeFileJson(
    OUTPUT_FILE_PATHS.REGISTRY_FOR_NEXT.REGISTRY,
    await calculateRegistryForNext(),
  );

  console.log('Generating [next-app.sidebar]');
  await writeFileJson(
    OUTPUT_FILE_PATHS.REGISTRY_FOR_NEXT.SIDEBAR,
    await calculateStaticSidebarData(),
  );

  console.log(`Generating [next-app] done ✅ in ${perfTimer.getElapsedTime()} ms`);
}

async function generateShadcnCli() {
  console.log('\nGenerating [shadcn-cli] static data and saving to disk...');
  const perfTimer = createPerformanceTimer();

  console.log('Generating [shadcn-cli.registry]');
  await writeFileJson(
    OUTPUT_FILE_PATHS.REGISTRY_FOR_SHADCN_CLI.REGISTRY,
    await calculateRegistryForShadcnCli(),
  );

  console.log(`Generating [shadcn-cli] done. ✅ in ${perfTimer.getElapsedTime()} ms`);
}