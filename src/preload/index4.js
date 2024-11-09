// processes chatting

const { contextBridge, ipcRenderer } = require("electron");
contextBridge.exposeInMainWorld("preloadApi", {
  setTheme: (theme) => {
    // ipcRenderer.invoke("setTheme", theme);
    ipcRenderer.send("setTheme", theme);
    ipcRenderer.on("setThemeIs", (event, value) => {
      console.log("setThemeIs successfully", value);
    });
  },
});
