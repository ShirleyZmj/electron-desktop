const { contextBridge, ipcRenderer } = require("electron");
contextBridge.exposeInMainWorld("windowApi", {
  maximize: () => {
    ipcRenderer.invoke("maximize");
  },
  minimize: () => {
    ipcRenderer.invoke("minimize");
  },
  fullScreen: () => {
    ipcRenderer.invoke("fullScreen");
  },
  close: () => {
    ipcRenderer.invoke("close");
  },
});

// Electron 自定义窗口 —— 桌面时钟
