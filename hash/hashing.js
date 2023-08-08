//hashing.js
//.. THIS SECTION IS FOR HASHING PURPOSES ...//
/* Create a function that computes the hash of the @src directory.
 'hash-src') to handle hashing when the relevant command is passed to the script.*/
 const fs = require('fs');
 const path = require('path');
 const crypto = require('crypto');
 
 function getAllFiles(directory) {
    const stack = [directory];
    const visited = new Set();
    const filesList = [];
    while (stack.length) {
        const currentDir = stack.pop();
        if (visited.has(currentDir)) continue;
        visited.add(currentDir);
        const contents = fs.readdirSync(currentDir, { withFileTypes: true });
        for (const item of contents) {
            const fullPath = path.join(currentDir, item.name);
            if (item.isDirectory()) {
                stack.push(fullPath);
            } else if (item.isFile()) {
                filesList.push(fullPath);
            }
        }
    }
    return filesList;
}
 
 function hashThis(directory) {
   const files = getAllFiles(directory);
   const hash = crypto.createHash('sha256');
   for (const file of files) {
     const fileData = fs.readFileSync(file);
     hash.update(fileData);
   }
   return hash.digest('hex');
 }
 
 module.exports = {
   getAllFiles,
   hashThis
 };