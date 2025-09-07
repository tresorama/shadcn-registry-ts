import { writeShadcnCliDataToDisk } from "./generate-shadcn-cli/write-to-disk";
import { writeNextDataToDisk } from "./generate-next/write-to-disk";

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
  await writeShadcnCliDataToDisk();
  await writeNextDataToDisk();
}
