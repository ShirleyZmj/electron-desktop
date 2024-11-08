const { app, BrowserWindow } = require("electron");
const path = require("path");

let mainWindow;
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      // nodeIntegration: true,
      // contextIsolation: false,
      sandbox: false,
      nodeIntegration: false,
      preload: "src/preload/index3.js",
      preload: path.join(__dirname, "../preload/index3.js"),
    },
    show: false,
  });
  mainWindow.loadFile(path.join(__dirname, "../renderer/index3.html"));
}

console.log(__dirname);

app.whenReady().then(() => {
  createWindow();
  mainWindow.once("ready-to-show", () => {
    mainWindow.show();
    mainWindow.webContents.openDevTools();
  });
});
