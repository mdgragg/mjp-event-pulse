const fs = require('fs');
const argLen = process.argv.length;
const fetch = require('node-fetch');
try {
  const eventUrl = process.argv[2];
  if (!eventUrl) {
    throw new Error('Must provide an event url argument');
  }
  console.log(`Creating assets for: ${eventUrl}\n\n ----`);

  fs.mkdir(`./eventAssets/${eventUrl}`, (err) => {
    if (err) throw err;
    fs.copyFile(
      './Components/__GLOBALS__/mjx.theme.ts',
      `./eventAssets/${eventUrl}/${eventUrl}.theme.ts`,
      (err) => {
        if (err) throw err;
      }
    );
  });

  console.log(`Creating asset folder with theme: ${eventUrl}\n\n ----`);

  const filesToCopy = ['index.tsx', 'preview.tsx', 'thank-you.tsx'];

  fs.mkdir(`./Pages/${eventUrl}`, (err) => {
    if (err) throw err;
    filesToCopy.forEach((file) => {
      fs.copyFile(
        `./Pages/[event]/${file}`,
        `./Pages/${eventUrl}/${file}`,
        (err) => {
          if (err) throw err;
          console.log(`Copied: ${file}`);
        }
      );
    });
  });
} catch (error) {
  throw error;
}
