const { app, BrowserWindow, crashReporter } = require('electron')

crashReporter.start({
    productName: 'YA',
    companyName: 'YACompany',
    submitURL: 'https://localhost',
    uploadToServer: true
})

app.on('window-all-closed', function () {
    app.quit();
});
app.on('ready', function () {
    const { screen } = require('electron')
    const { width, height } = screen.getPrimaryDisplay().workAreaSize
    var mainWindow = new BrowserWindow({
        alwaysOnTop: true,
        frame: false,
        hasShadow: false,
        height: height,
        left: 0,
        resizable: false,
        show: true,
        top: 0,
        transparent: true,
        webPreferences: {
            nodeIntegration: false
        },
        width: width,
    });
    // クリックイベントを無視
    mainWindow.setIgnoreMouseEvents(true);
    mainWindow.maximize();
    // mainWindow.loadURL('http://www.google.co.jp/'); // 動確用
    mainWindow.loadURL('file://' + __dirname + '/index.html');

    mainWindow.on('closed', function () {
        mainWindow = null;
    });
});
