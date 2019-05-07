/**
 * @file Simple utils that are used throughout
 * @author Mattamorphic
 */


/**
 * Pause until key press using an async function
 *
 * @return {Promise<NodeJS.ReadStream>}
 */
export const keypress = async (): Promise<NodeJS.ReadStream> => {
  process.stdin.setRawMode(true);
  return new Promise(
    (resolve): NodeJS.ReadStream =>
      process.stdin.once(
        'data',
        (): void => {
          process.stdin.setRawMode(false);
          resolve();
        },
      ),
  );
};
