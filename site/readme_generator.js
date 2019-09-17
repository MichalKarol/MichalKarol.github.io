const fs = require('fs');
const SITE_URL = 'https://michalkarol.github.io';
const GITHUB_URL = 'https://github.com/MichalKarol';

const projects = JSON.parse(fs.readFileSync('src/sources/projects.json', 'utf8'));
const posts = JSON.parse(fs.readFileSync('src/sources/posts.json', 'utf8')).reverse();

const posts_section = `
## Posts
${posts.map(post => `
### [${post.title} - ${post.date}](${SITE_URL}/post/${post.file})
${post.summary}  
Tags: ${post.tags.map(tag => `#${tag}`).join(' ')}
`).join('\n')
}`;

const projects_section = `
## Projects
${projects.map(project => `
### [${project.title}](${
 project.url ? project.url : `${GITHUB_URL}/${project.key}`
})
${project.summary}  
Tags: ${project.tags.map(tag => `#${tag}`).join(' ')}
`).join('\n')
}`;

const merged = `
${posts_section}
---
${projects_section}
`;

console.log(merged);
