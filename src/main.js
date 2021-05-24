const { app, BrowserWindow } = require("electron");
const path = require("path");

function createWindow() {
  const win = new BrowserWindow({
    width: 860,
    height: 680,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true, // protect against prototype pollution
      enableRemoteModule: false, // turn off remote,
      preload: path.join(__dirname, "preload.js") // use a preload script
    },
  });

  win.loadFile(path.join(__dirname, "../dist/index.html"));
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});