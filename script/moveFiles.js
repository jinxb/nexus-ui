
const fs = require('fs');
const path = require('path');

const sourceDir = path.join('.', 'dist');
const targetDir = path.join('.', 'lib');

// 创建目标目录（如果不存在）
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir);
}

// 获取源目录下的所有文件
const files = fs.readdirSync(sourceDir);

// 遍历所有文件
files.forEach((file) => {
  const sourceFile = path.join(sourceDir, file);
  const targetFile = path.join(targetDir, file);

  // 判断文件是否已存在于目标目录下，如果是则删除
  if (fs.existsSync(targetFile)) {
    fs.unlinkSync(targetFile);
  }

  // 将文件移动到目标目录
  fs.renameSync(sourceFile, targetFile);
});
