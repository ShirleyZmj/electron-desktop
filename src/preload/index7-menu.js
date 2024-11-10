const { contextBridge, ipcRenderer } = require("electron");
contextBridge.exposeInMainWorld("menuApi", {
  showMenu: () => {
    ipcRenderer.send("showMenu");
  },
  onChangeStyle: (callback) => ipcRenderer.on("change-style", callback),
});
