//const { app, BrowserWindow } = require('electron')
const { app, Tray, Menu, dialog, globalShortcut } = require('electron')
const { BrowserWindow } = require('electron')
const { ipcMain } = require('electron')
const path = require("path")

require('electron-reload')(__dirname, {
  electron: require('electron')
})

const mouseMover = require("./scripts/mouse-mover")
const server = require("./scripts/server")

var mainWindow
var autoLaunch
let firstClose = false

function createWindow () {
  const win = new BrowserWindow({
    //show: false,
    //backgroundColor: '#3b10e6',
    fullscreenable: false,
    hasShadow: true,
    width: 1000,
    height: 800,
    minimizable: true,
    minWidth: 670,
    minHeight: 460,
    //defaultFontFamily: "monospace",
    webPreferences: {
      enableRemoteModule: true,
      nodeIntegration: true,
      spellcheck: true
    }
  })
  let tray = null
  win.on('minimize', function (event) {
    if (firstClose === false) {
      event.preventDefault();
      win.setSkipTaskbar(true);
      tray = createTray();
    } else if (firstClose === true) {
      firstClose = false
    }
  });

  win.on('restore', function (event) {
    if (firstClose === false) {
      win.show();
      win.setSkipTaskbar(false);
      tray.destroy();
    } else if (firstClose === true) {
      firstClose = false
    }
  })
  win.loadFile('views/index.html')

  return win
  //win.webContents.openDevTools()
}
function createTray() {
  appIcon = new Tray(/*path.join(__dirname, "cloud_fun.ico")*/"file/example.ico");
  const contextMenu = Menu.buildFromTemplate([
      {
          label: 'Open', click: function () {
              mainWindow.show();
          }
      },
      {
          label: 'Shut Down App', click: function () {
              app.isQuiting = true;
              app.quit();
          }
      }
  ]);
  appIcon.on('double-click', function (event) {
      mainWindow.show();
  });
  appIcon.setToolTip('Re Mo');
  appIcon.setContextMenu(contextMenu);
  return appIcon;
}

app.whenReady().then(() => {
  const simpleShort = globalShortcut.register('CommandOrControl+Alt+S', () => {
    //console.log('CommandOrControl+X is pressed')
    mainWindow.show()
  })
  const complexShort = globalShortcut.register('Super+Alt+S', () => {
    //console.log('CommandOrControl+X is pressed')
    mainWindow.show()
  })
  if (!simpleShort && !complexShort) {
    console.log('registration failed')
  }
  mainWindow = createWindow()
  server.startServer()
  server.onMove((pos) => {
    mouseMover.move(pos)
  })
  createTray()
})
/*
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
*/
app.setAboutPanelOptions({ applicationName: "Ouestion Mark"})


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
app.on('will-quit', () => {
  globalShortcut.unregisterAll()
  autoLaunch.disable()
})


app.on("open-file", function(event, path) {
  event.preventDefault();
  filepath = path;
  if (ready) {
      mainWindow.webContents.send('open-file', filepath);
      filepath = null;

      return;
  }
});
ipcMain.on("download", function() {
  const win = BrowserWindow.getFocusedWindow();
})