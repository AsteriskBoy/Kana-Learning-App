const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

let splashWin = null;
let mainWin = null;

function createSplash() {
  splashWin = new BrowserWindow({
    width: 520,
    height: 380,
    resizable: false,
    center: true,
    frame: false,
    icon: path.join(__dirname, 'icon.png'),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    },
    backgroundColor: '#f8f5ee',
    show: false,
  });

  splashWin.loadFile('splash.html');
  splashWin.once('ready-to-show', () => {
    splashWin.show();
    splashWin.webContents.insertCSS('*::-webkit-scrollbar{display:none!important;width:0!important;}*{scrollbar-width:none!important;}');
  });
}

function createMain() {
  mainWin = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    center: true,
    frame: false,
    icon: path.join(__dirname, 'icon.png'),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    },
    backgroundColor: '#f8f5ee',
    show: false,
  });

  mainWin.loadFile('index.html');
  mainWin.webContents.insertCSS('*::-webkit-scrollbar{display:none!important;width:0!important;}*{scrollbar-width:none!important;}');
}

// Window control IPC handlers
ipcMain.on('window-minimize', () => mainWin && mainWin.minimize());
ipcMain.on('window-maximize', () => mainWin && (mainWin.isMaximized() ? mainWin.unmaximize() : mainWin.maximize()));
ipcMain.on('window-close',    () => mainWin && mainWin.close());

app.whenReady().then(() => {
  createSplash();
  createMain(); // Pre-load main window in background

  // Transition from splash to main window
  ipcMain.on('enter-app', () => {
    if (!mainWin) createMain();
    mainWin.show();
    mainWin.focus();
    if (splashWin) {
      splashWin.destroy();
      splashWin = null;
    }
  });

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createSplash();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
