const fs = require('fs');

function generateDir(path) {
    return new Promise((resolve, reject) => {
        fs.mkdir(path,{ recursive: true }, (_) => {
            fs.link('../index.html', `${path}/index.html`, (_) => {
                resolve();
            });
        });
    });
}

function generateDirs() {
    const posts = JSON.parse(fs.readFileSync('src/sources/posts.json', 'utf8')).reverse();
    const postPromies = posts.map((post) => {
        return generateDir(`../post/${post.file}/`);
    });
    const staticPromises = ['projects', 'about'].map((static) => {
        return generateDir(`../${static}/`);
    });
    return [...postPromies, ...staticPromises];
}

(async function main() {
    await Promise.all(generateDirs());
})();