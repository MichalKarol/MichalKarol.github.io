## Motivation
Hi,  
My name is Michał and I am currently a student at Wroclaw University of Technology on Computer Science and Management Faculty.  
I also work for Nokia Solutions and Networks since 2018.  

During the time at university or at work I often encountered issues that were rather poorly described on web or even not mentioned at all.
I hope to create a place with lot of code examples of described in posts technologies, allowing You - the User to evaluate the usefulness of it.

One of the first projects I wish to share is this site and tech behind it.

## Github Pages

Github Pages allow for hosting static pages. With frameworks like Vue it is quite easy task to change our static HTML page to almost functional SPA.

### IDE
As a VSCode user my recommendation is installing [Vetur plugin](https://marketplace.visualstudio.com/items?itemName=octref.vetur).  
It definitely helps during development by displaying warnings and errors in .vue files thus allowing for faster debugging.
Also [Vue devtools extension](https://github.com/vuejs/vue-devtools) to Chrome is a nice addition.

### Used technology
* [TypeScript](https://www.typescriptlang.org/) - type safe programming language compiled into JavaScript
* [Vue.js](https://vuejs.org/) - JavaScript framework allowing to build Single Page Application
* [Bulma](https://bulma.io) - CSS framework using Flexbox with great customization options
* [MarkdownIt](https://github.com/markdown-it/markdown-it) - Markdown parser allowing to generate HTML content, like this one
* [highlight.js](https://highlightjs.org/) - JavaScript library for syntax highlight in generated Markdown content
* [Facebook Comments Plugin](https://developers.facebook.com/docs/plugins/comments/) - plugin adding commenting ability for page
* [Leaflet](https://leafletjs.com/) - library for OpenStreetMap online map widget in 'About me' page
* [Github Pages](https://pages.github.com/) - hosting for static user page


### Initialization

Let's prepare our repository. Name of the repository for personal page must be in format: '${name_of_account}.github.io'.  
With initialized repository, let's clone it to our machine and begin installing npm packages by following [Vue CLI Tutorial](https://cli.vuejs.org):

``` sh
npm install -g @vue/cli 
```

and start Web UI using:

``` sh
vue ui
```

and then create a new project and select options. 
IMPORTANT: Create a subdirectory in repository eg. site/ where the main files will be kept, so later dist/ directory would not contaminate our development files. 
Personally preferred by me options are TypeScript, Router and Vuex. Then you only have to create own site following one of many available Vue tutorials.


### Deployment

1. Build production version of application with:
``` sh
npm run build
```

2. Due to to fact that contents of dist/ directory must be in root directory of repository:
``` sh
mv dist/* ./..
```

3. And it is done. Validate that by running python server in repository root directory:
``` sh
python3 -m http.server $PORT
```