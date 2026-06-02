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
    backgroundColor: '#13100e',
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
    backgroundColor: '#13100e',
    show: false,
  });

  mainWin.loadFile('index.html');
  mainWin.webContents.insertCSS('*::-webkit-scrollbar{display:none!important;width:0!important;}*{scrollbar-width:none!important;}');

  ipcMain.on('window-minimize', () => mainWin && mainWin.minimize());
  ipcMain.on('window-maximize', () => mainWin && (mainWin.isMaximized() ? mainWin.unmaximize() : mainWin.maximize()));
  ipcMain.on('window-close',    () => mainWin && mainWin.close());
}

app.whenReady().then(() => {
  createSplash();

  // Splash tells us loading started — pre-load main window in background
  ipcMain.on('enter-app', () => {
    createMain();
  });

  // Splash loading bar done — close splash, show main
  ipcMain.on('loading-done', () => {
    if (!mainWin) return;
    mainWin.once('ready-to-show', () => {
      mainWin.show();
      if (splashWin) { splashWin.destroy(); splashWin = null; }
    });
    // If already ready, show immediately
    if (mainWin.webContents.getURL().includes('index.html')) {
      mainWin.show();
      if (splashWin) { splashWin.destroy(); splashWin = null; }
    }
  });

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createSplash();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
