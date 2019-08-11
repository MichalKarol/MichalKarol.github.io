#!/bin/bash
set -euxo pipefail
npm run build
rm -rf ../{css,js,fonts,img}
rm ../precache-manifest.*
mv dist/* ../. 
cd .. && python3 -m http.server 8081