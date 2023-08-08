const { getAllFiles, hashThis } = require('./path-to-your-main-file');

process.on('message', (directory) => {
    try {
        const files = getAllFiles(directory);
        const hash = hashThis(files);
        process.send({ success: true, hash });
    } catch (error) {
        process.send({ success: false, error: error.message });
    }
});