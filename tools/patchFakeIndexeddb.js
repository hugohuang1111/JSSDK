const fs = require('fs');
const path = require('path');

function removeFileIf(filePath) {
    if (!fs.existsSync(filePath)) {
        return;
    }
    fs.unlink(filePath, function(error) {
        if (error) {
            console.log("remove failed:" + error);
        }
    });
}

const sourceFile = path.normalize(path.join(__dirname, "../node_modules/fake-indexeddb/build/FDBTransaction.js"));
const patchedSourceFile = path.normalize(path.join(__dirname, "./FDBTransaction.js"));

removeFileIf(patchedSourceFile);
const ws = fs.createWriteStream(patchedSourceFile);

let fileContent = fs.readFileSync(sourceFile, { encoding: 'utf8' });
const patchString = "console.log(''); // SDKBox Modify for Cocos Creator";
const codeString = "setImmediate(this._start.bind(this));";

if (fileContent.includes(patchString)) {
    console.log("has patched, needn't patch again.");
    return
}

const idx = fileContent.indexOf(codeString);

ws.write(fileContent.substring(0, idx));
ws.write(patchString);
ws.write('\n                ');
ws.write(fileContent.substring(idx));
ws.end();

fs.rename(patchedSourceFile, sourceFile, function(error) {
    if (error) {
        console.log('Rename file failed:', error);
        return;
    }
    removeFileIf(patchedSourceFile);
});

