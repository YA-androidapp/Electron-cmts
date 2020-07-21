// script.jsで定義されている合言葉を変更し、
// このファイルが存在するディレクトリ内で
// $ npx electron .
// と実行して下さい。
// （ブックマークレットのようにダイアログで入力する形だと最前面固定が解除されてしまうためソースコード中で定義する必要があった）

// 合言葉を変更した後など、パッケージ化し直す場合は
// $ npx electron-packager . BlueLightCut --platform=darwin --arch=x64 --overwrite
// と実行して下さい。

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
