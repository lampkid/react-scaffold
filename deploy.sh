if [ "$1a" = "installa" ]; then
    npm install --registry="http://registry.npm.taobao.org"
else
    npm run "$1"
fi


