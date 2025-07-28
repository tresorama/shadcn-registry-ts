import {
  generateStaticRegistryForShadcnCli,
  generateStaticRegistryForNext
} from "./generate.static-registry-derivates";
import {
  generateStaticSidebarData
} from "./generate.static-sidebar-data";

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


async function run() {
  await generateStaticRegistryForShadcnCli();
  await generateStaticRegistryForNext();

  await generateStaticSidebarData();
}
