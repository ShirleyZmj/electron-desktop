const os = require("os");
const fs = require("fs");
const platform = os.platform();
const release = os.release();
const path = require("path");

const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("myAPI", {
  doSomething: () => {
    console.log("doSomething");
  },
  saveText: (fileName, textContent) => {
    const desktopPath = path.join(os.homedir(), "Desktop", fileName);
    fs.writeFile(desktopPath, textContent, "utf8", (err) => {
      if (err) {
        console.error("Failed to save the file:", err);
        return { success: false, error: err };
      }
      console.log("File saved successfully to:", desktopPath);
      return { success: true, path: desktopPath };
    });
  },
});

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("platform").append(platform);
  document.getElementById("release").append(release);
});
