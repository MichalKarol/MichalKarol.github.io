const fs = require('fs');

function generateDirs() {
    const posts = JSON.parse(fs.readFileSync('src/sources/posts.json', 'utf8')).reverse();

    return posts.map((post) => {
        return new Promise((resolve, reject) => {
            fs.mkdir(`../post/${post.file}`,{ recursive: true }, (_) => {
                fs.unlink(`../post/${post.file}/index.html`, (_) => {
                    fs.symlink('../../index.html', `../post/${post.file}/index.html`, (_) => {
                        console.log('WTF', post.file, _);
                        resolve();
                    });
                });
            });
        });
    });
}

(async function main() {
    await Promise.all(generateDirs());
})();