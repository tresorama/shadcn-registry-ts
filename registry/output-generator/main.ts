import {
  generateStaticRegistryForShadcnCli
} from "./generate.static-registry-derivates";

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
}
