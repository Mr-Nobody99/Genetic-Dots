import { app, BrowserWindow } from 'electron';
import * as url from 'url';
import * as path from 'path';

const glob = require('glob');

let mainWindow: BrowserWindow = null;

function initialize() {
  makeSingleInstance();
  loadMainProcess();
  function createWindow() {
    const windowOptions = {
      width: 800,
      height: 600,
      title: app.name,
      webPreferences: {
        nodeIntegration: true
      }
    };

    mainWindow = new BrowserWindow(windowOptions);

    mainWindow.loadURL(
        url.format({
            pathname: path.join(__dirname, '../index.html'),
            protocol: 'file:',
            slashes: true,
        })
    )
    mainWindow.on('closed', () => {mainWindow = null});
  }

  app.on('ready', () => createWindow() );
  app.on('activate', () => {
    if (mainWindow === null) {
      createWindow();
    }
  });
  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });
}

function makeSingleInstance() {
  if (process.mas) { return; }
  app.requestSingleInstanceLock();
  app.on('second-instance', () => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) {
        mainWindow.restore();
        mainWindow.focus();
      }
    }
  });
}

function loadMainProcess() {
  const files = glob.sync(path.join(__dirname, 'main-process/**/*.js'));
  files.forEach((file: string) => { require(file); });
}

initialize();