// news-app-next/scripts/launch.js

const readline = require('readline');
const { exec } = require('child_process');


const rocket = [
  '        /\\',
  '       /  \\',
  '      /____\\',
  '     /______\\',
  '    /  |  |  \\',
  '   /   |  |   \\',
  '  /____________\\',
];

// Дым 
function drawSmoke(offset) {
  const smoke = [];
  for (let i = 0; i < 5; i++) {
    let line = ' '.repeat(6);
    line += '.'.repeat(3 + Math.floor(Math.sin((i + offset) * 0.5) * 2 + 2));
    smoke.push(line);
  }
  return smoke;
}

// Очистка 
function clearConsole() {
  process.stdout.write('\x1B[2J\x1B[0f');
}

//  ракета + дым
function drawRocketWithSmoke(offset) {
  clearConsole();

  // Ракета — статичная
  rocket.forEach((line) => {
    console.log(line);
  });

  // Дым — динамичный
  drawSmoke(offset).forEach((line) => {
    console.log(line);
  });
}

let animationFrame = 0;

function animate() {
  return setInterval(() => {
    drawRocketWithSmoke(animationFrame);
    animationFrame++;
  }, 300);
}

// Запуск
function launchApp() {
  clearInterval(animation);
  clearConsole();
  console.log(`
       /\\
      /  \\
     /____\\
    /______\\
   /  |  |  \\
  /   |  |   \\
 /____________\\
`);
  console.log('\n🚀 Лента новостей запущена...\n');
  exec('npm run dev', (err, stdout, stderr) => {
    if (err) {
      console.error('Ошибка запуска:', err);
      return;
    }
    console.log(stdout);
    console.error(stderr);
  });
}

const animation = animate();


setTimeout(launchApp, 5000);