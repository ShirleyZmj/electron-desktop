const { app, BrowserWindow } = require("electron");

let mainWindow;
// zhufengpeixun://width=800&height=600
const protocol = "zhufengpeixun";
const link = "http://www.zhufengpeixun.com/";
const scheme = `${protocol}://`;
app.setAsDefaultProtocolClient(protocol);

let urlParams = {};

handleSchemeWakeup(process.argv);

const gotTheLock = app.requestSingleInstanceLock();
if (!gotTheLock) {
  app.quit();
} else {
  app.on("second-instance", (event, argv) => {
    mainWindow.restore();
    mainWindow.show();
    handleSchemeWakeup(argv);
  });
}

app.on("open-url", (event, url) => handleSchemeWakeup(url));

app.whenReady().then(() => {
  createWindow();

  mainWindow.once("ready-to-show", () => {
    mainWindow.show();
  });
});

function createWindow() {
  const width = parseInt(urlParams.width) || 800;
  const height = parseInt(urlParams.height) || 600;
  if (mainWindow) {
    mainWindow.setSize(width, height);
  } else {
    mainWindow = new BrowserWindow({ width, height, show: false });
    mainWindow.loadURL(link);
    // mainWindow.loadURL("src/renderer/index.html");
  }
}

function handleSchemeWakeup(argv) {
  const url = [].concat(argv).find((v) => v.startsWith(scheme));
  if (!url) return;
  const searchParams = new URLSearchParams(url.slice(scheme.length));
  urlParams = Object.fromEntries(searchParams.entries());
  if (app.isReady()) createWindow();
}
