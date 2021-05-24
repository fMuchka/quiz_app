const {
    contextBridge
} = require("electron");

const path = require("path");
const fs = require("fs");
const mime = require("mime-types");


contextBridge.exposeInMainWorld("path", {
    dirname: (filePath) => {
        return path.dirname(filePath);
    },
    join: (dirPath, filePath) => {
        return path.join(dirPath, filePath);
    }
});

contextBridge.exposeInMainWorld("fs", {
    constants: () => {
        return fs.constants;
    },
    accessSync: (fullPath, constant) => {
        return fs.accessSync(fullPath, constant);
    }
});

contextBridge.exposeInMainWorld("mime", {
    lookup: (filePath) => {
        return mime.lookup(filePath);
    }
})