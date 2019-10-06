const fs = require('fs');

function generateDir(path, depth) {
    return new Promise((resolve, reject) => {
        fs.mkdir(path,{ recursive: true }, (_) => {
            fs.symlink(`${Array(depth).fill('..').join('/')}/index.html`, `${path}/index.html`, (_) => {
                resolve();
            });
        });
    });
}

function generateDirs() {
    const posts = JSON.parse(fs.readFileSync('src/sources/posts.json', 'utf8')).reverse();
    const postPromies = posts.map((post) => {
        return generateDir(`../post/${post.file}/`, 2);
    });
    const staticPromises = ['projects', 'about'].map((static) => {
        return generateDir(`../${static}/`, 1);
    });
    return [...postPromies, ...staticPromises];
}

(async function main() {
    await Promise.all(generateDirs());
})();