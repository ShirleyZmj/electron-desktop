const { app, BrowserWindow } = require("electron");

let mainWindow;

const protocol = "w3schools";
const link =
  " https://www.w3schools.com/html/tryit.asp?filename=tryhtml_iframe_height_width";
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
  }
}

function handleSchemeWakeup(argv) {
  const url = [].concat(argv).find((v) => v.startsWith(scheme));
  if (!url) return;
  const searchParams = new URLSearchParams(url.slice(scheme.length));
  urlParams = Object.fromEntries(searchParams.entries());
  if (app.isReady()) createWindow();
}
