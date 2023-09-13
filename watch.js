const fs = require('fs');
const { spawn } = require('child_process');

const fileName = 'index.js'; // Nombre del archivo que deseas observar
const script = 'index.js'; // Nombre del archivo para ejecutar (puede ser diferente si es necesario)

let app;

const startApp = () => {
    console.log('Starting application...');
    app = spawn('node', [script], {
        stdio: 'inherit',
    });
};

const restartApp = () => {
    console.log('Restarting application...');
    if (app) {
        app.kill();
    }
    startApp();
};

startApp();

fs.watchFile(fileName, (curr, prev) => {
    if (curr.mtime > prev.mtime) {
        restartApp();
    }
});

process.on('SIGINT', () => {
    if (app) {
        app.kill();
    }
    process.exit();
});
