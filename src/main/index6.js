const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

let win;
app.whenReady().then(() => {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    titleBarStyle: "hidden",
    show: false,
    webPreferences: {
      // nodeIntegration: true,
      // contextIsolation: false,
      sandbox: false,
      nodeIntegration: false,
      // preload: "src/preload/index4.js",
      preload: path.join(__dirname, "../preload/index6.js"),
    },
    // transparent: true,
  });
  win.loadFile(path.join(__dirname, "../renderer/index6.html"));
  win.once("ready-to-show", () => {
    win.show();
  });
  // win.webContents.openDevTools();
});

ipcMain.handle("close", (event) => {
  win.close();
});
ipcMain.handle("fullScreen", (event) => {
  win.setFullScreen(!win.isFullScreen());
});
ipcMain.handle("maximize", (event) => {
  win.maximize();
});
ipcMain.handle("minimize", (event) => {
  win.minimize();
});
