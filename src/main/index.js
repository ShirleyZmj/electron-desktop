const { app, BrowserWindow } = require("electron");
const path = require("path");

let win;
app.whenReady().then(() => {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    titleBarStyle: "hiddenInset",
    show: false,
  });
  win.loadFile("src/renderer/index.html");
  win.once("ready-to-show", () => {
    win.show();
  });
  // win.webContents.openDevTools();
  // win.loadFile(path.join(__dirname, "../render/index.html"));
});

// 通过这个协议名就能唤起这个软件了，在 Electron 中注册协议只需要一行代码
// electron-desktop://width=800&height=600
// Electron 提供了三个与自定义协议相关的方法：
// ● setAsDefaultProtocolClient：设置协议
// ● isDefaultProtocolClient：查询状态
// ● removeAsDefaultProtocolClient：删除协议
app.setAsDefaultProtocolClient("electron-desktop");

let urlParams = {};

app.on("open-url", (event, url) => {
  const scheme = `${protocol}://`;
  const urlParams = new URLSearchParams(url.slice(scheme.length));
  urlParams = Object.fromEntries(urlParams.entries());
});

app.whenReady().then(() => {
  createWindow();
});

function createWindow() {
  const mainWindow = new BrowserWindow({ width: 800, height: 600 });
  mainWindow.loadURL("https://www.juejin.cn");
}

const gotTheLock = app.requestSingleInstanceLock();
if (!gotTheLock) {
  app.quit();
} else {
  app.on("second-instance", (event, argv, workingDirectory) => {
    // Mac 平台只需要展示窗口即可
    mainWindow.restore();
    mainWindow.show();

    // Windows 平台上需要判断新的实例是否被 scheme 唤起
    const url = argv.find((v) => v.startsWith(scheme));
    if (url) {
      // 如果发现 electron-desktop:// 前缀，说明是通过 scheme 唤起
      console.log(url);
    }
  });
}
