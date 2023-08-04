const { execSync } = require('child_process');
const fs = require('fs-extra');
const pluginName = 'fe-angular';
const appName = 'fc-fe'
const pluginFileName = `${pluginName}.php`;
const destination = `../plugin/${pluginName}`;
const pluginFilePath = `${destination}/${pluginFileName}`

console.log('Remove previous dist folder');
// Remove the dist folder in the plugin file if its present. Doesn't care if it's not.
fs.rmSync(`${destination}/dist`, { recursive: true, force: true });

console.log('Start build stage');
// Run the build command
execSync('ng build --configuration production', { encoding: 'utf-8', stdio: 'inherit' });
console.log('Build finished, copy build files to plugin folder');
fs.moveSync('../dist', `${destination}/dist`)

console.log('Finished moving');
// copy the js and css file names to an array
distFilenames = fs.readdirSync(`${destination}/dist/${appName}`);
scriptsAndStyleFiles = distFilenames.filter(file => file.endsWith('.js') || file.endsWith('.css'));
// replace the js and css file names in the php file contents
const pluginFileContents = fs.readFileSync(`${pluginFilePath}`, 'utf8');
const updateLine = (line, name) => {
  if (line.includes(appName)) {
    const matchedFileName = scriptsAndStyleFiles.find(file => file.includes(name));
    const replaceFromIndex = line.indexOf(appName) + appName.length + 1;
    const replaceToIndex = line.indexOf('\'', replaceFromIndex);
    return line.replace(line.substring(replaceFromIndex, replaceToIndex), matchedFileName);
  } else {
    return line;
  }
}
const updatedFileContentArray = pluginFileContents.split(/\r?\n/).map(line => {
  switch (true) {
    case line.includes('wp_enqueue_style( \'ng_styles'):
      return updateLine(line, 'styles');
    case line.includes('wp_register_script( \'ng_main'):
      return updateLine(line, 'main');
    case line.includes('wp_register_script( \'ng_polyfills'):
      return updateLine(line, 'polyfills');
    case line.includes('wp_register_script( \'ng_runtime'):
      return updateLine(line, 'runtime');
    case line.includes('wp_register_script( \'504'):
      return updateLine(line, '504');
    default:
      return line;
  }
});
const updatedFileContents = updatedFileContentArray.join('\n');

// write the new names to the php file
fs.writeFileSync(`${pluginFilePath}`, updatedFileContents);
console.log(`*************** ${pluginFileName} updated! ***************`)

execSync('scp -r ../plugin/fe-angular/ finuchenie@45.128.205.18:/var/www/funuchenie/data/www/finuchenie.online/wp-content/plugins', { encoding: 'utf-8', stdio: 'inherit' })

console.log('pasted');
