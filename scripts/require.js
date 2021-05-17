const { dialog } = require('electron').remote
const { BrowserWindow } = require("electron");
const { app } = require("electron");
const { remote } = require('electron')
const { shell } = require('electron')
win = remote.getCurrentWindow()
const contents = win.webContents
var ipc = require('electron').ipcRenderer

const fs = require('fs')
const path = require('path')
const fetch = require('node-fetch')