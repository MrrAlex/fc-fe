const { execSync } = require('child_process');
const fs = require('fs');
const pluginName = 'fe-angular';
const appName = 'fc-fe'
const pluginFileName = `${pluginName}.php`;
const destination = `./plugin/${pluginName}`;
const pluginFilePath = `${destination}/${pluginFileName}`

console.log('Remove previous dist folder');
// Remove the dist folder in the plugin file if its present. Doesn't care if it's not.
fs.rmSync(`${destination}/dist`, { recursive: true, force: true });

console.log('Start build stage');
// Run the build command
execSync('ng build --configuration production', { encoding: 'utf-8', stdio: 'inherit' });
console.log('Build finished, copy build files to plugin folder');
// Move the bundle from the `/app` folder to the plugin's folder
execSync(`mv ./dist ${destination}`)

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
    default:
      return line;
  }
});
const updatedFileContents = updatedFileContentArray.join('\n');

// write the new names to the php file
fs.writeFileSync(`${pluginFilePath}`, updatedFileContents);
console.log(`*************** ${pluginFileName} updated! ***************`)
