const readline = require('readline');
const { spawn } = require('child_process');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('请输入依赖: ', (name) => {
  const npmInstall = spawn('pnpm.cmd', ['i', '--save', `${name}`], { stdio: 'inherit' });
  npmInstall.on('close', (code) => {
    console.log(`npm install 进程退出，代码: ${code}`);
  });
});
