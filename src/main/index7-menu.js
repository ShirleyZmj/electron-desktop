const { app, BrowserWindow, ipcMain, Menu } = require("electron");
const path = require("path");

let win;
app.whenReady().then(() => {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    titleBarStyle: "default",
    show: false,
    webPreferences: {
      // nodeIntegration: true,
      // contextIsolation: false,
      sandbox: false,
      nodeIntegration: false,
      // preload: "src/preload/index4.js",
      preload: path.join(__dirname, "../preload/index7-menu.js"),
    },
    // transparent: true,
  });
  win.loadFile(path.join(__dirname, "../renderer/index7-menu.html"));
  win.once("ready-to-show", () => {
    win.show();
  });
  win.webContents.openDevTools();
});

const menuTpl = [
  {
    label: "文字加粗",
    click: () => {
      console.log("try");
    },
  },
  {
    label: "改变颜色",
    click: () => {
      console.log("try");
    },
  },
  {
    label: "点我试试",
    click: () => {
      console.log("try");
    },
  },
  {
    label: "默认选中",
    type: "checkbox",
    checked: true,
  },
];

const menu = Menu.buildFromTemplate(menuTpl);

ipcMain.on("showMenu", (event) => {
  const menu = Menu.buildFromTemplate([
    {
      label: "改变字体颜色",
      click: () => {
        event.sender.send("change-style", "color");
      },
    },
    {
      label: "字体加粗",
      click: () => {
        event.sender.send("change-style", "bold");
      },
    },
  ]);
  menu.popup();
});
