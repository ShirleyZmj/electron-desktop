const { app, BrowserWindow, nativeTheme, ipcMain } = require("electron");
const path = require("path");

console.log("isDarkMode", nativeTheme.shouldUseDarkColors);
// ipcMain.handle("setTheme", (event, theme) => {
//   nativeTheme.themeSource = theme;
// });
ipcMain.on("setTheme", (event, args) => {
  nativeTheme.themeSource = args;
  event.reply("setThemeIs", args);
});

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
      // preload: "src/preload/index4.js",
      preload: path.join(__dirname, "../preload/index4.js"),
    },
    show: false,
  });
  mainWindow.loadFile(path.join(__dirname, "../renderer/index4.html"));
}

console.log(__dirname);

app.whenReady().then(() => {
  createWindow();
  mainWindow.once("ready-to-show", () => {
    mainWindow.show();
    mainWindow.webContents.openDevTools();
  });
});
