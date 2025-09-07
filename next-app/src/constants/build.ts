import * as serverConstants from './server';

if (serverConstants.DEBUG_CONSTANTS) {
  console.log('BUILD CONSTANTS:');
  console.log({
    serverConstants: { ...serverConstants }
  });
}