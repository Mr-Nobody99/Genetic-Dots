"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var url = require("url");
var path = require("path");
var glob = require('glob');
var mainWindow = null;
function initialize() {
    makeSingleInstance();
    loadMainProcess();
    function createWindow() {
        var windowOptions = {
            width: 800,
            height: 600,
            title: electron_1.app.name,
            webPreferences: {
                nodeIntegration: true
            }
        };
        mainWindow = new electron_1.BrowserWindow(windowOptions);
        mainWindow.loadURL(url.format({
            pathname: path.join(__dirname, '../index.html'),
            protocol: 'file:',
            slashes: true,
        }));
        mainWindow.on('closed', function () { mainWindow = null; });
    }
    electron_1.app.on('ready', function () { return createWindow(); });
    electron_1.app.on('activate', function () {
        if (mainWindow === null) {
            createWindow();
        }
    });
    electron_1.app.on('window-all-closed', function () {
        if (process.platform !== 'darwin') {
            electron_1.app.quit();
        }
    });
}
function makeSingleInstance() {
    if (process.mas) {
        return;
    }
    electron_1.app.requestSingleInstanceLock();
    electron_1.app.on('second-instance', function () {
        if (mainWindow) {
            if (mainWindow.isMinimized()) {
                mainWindow.restore();
                mainWindow.focus();
            }
        }
    });
}
function loadMainProcess() {
    var files = glob.sync(path.join(__dirname, 'main-process/**/*.js'));
    files.forEach(function (file) { require(file); });
}
initialize();
//# sourceMappingURL=main.js.map