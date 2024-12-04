#!/bin/bash

# 檢查是否安裝 xsel
if ! command -v xsel &> /dev/null; then
    echo "請先安裝 xsel: sudo apt-get install xsel"
    exit 1
fi

# 將所有檔案內容導向到 xsel
{
    for file in *.html *.js *.css; do
        echo "=== 檔案內容: $file ==="
        cat "$file"
        echo -e "\n\n"
    done
} | xsel --input --clipboard