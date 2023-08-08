const { app, BrowserWindow, ipcMain } = require('electron');
let win;
app.on('ready', () => {
  win = new BrowserWindow({
    width: 377,
    height: 244,
    webPreferences: {
        nodeIntegration: true,
        contextIsolation: false, // Add this line
      },
    frame: false,
    transparent: true,
    //opacity: 0.5
  });

  win.on('closed', () => {
    win = null;
  });

  win.loadFile('./atom/view.html');
});

ipcMain.on('minimize-window', () => {
  win.minimize();
});

ipcMain.on('close-window', () => {
  win.close();
});
