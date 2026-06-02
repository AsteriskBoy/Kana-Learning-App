const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  minimize:    () => ipcRenderer.send('window-minimize'),
  maximize:    () => ipcRenderer.send('window-maximize'),
  close:       () => ipcRenderer.send('window-close'),
  enterApp:    () => ipcRenderer.send('enter-app'),
  loadingDone: () => ipcRenderer.send('loading-done'),
});
