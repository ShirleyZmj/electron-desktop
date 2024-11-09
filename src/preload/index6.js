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
