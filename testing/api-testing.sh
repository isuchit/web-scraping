 API_BASE="api.suchitrotti.com"
 if newman run './testing/tests/Scraper.postman_collection.json' --insecure --insecure --global-var API_BASE=${API_BASE}  --reporters html --reporter-html-export test-reports/api-report.html
    then
        echo Test succeeded.
            #exit 0 - we don't want to exist because we have additional tests.
    else
        echo Test failed.
        error_flag=1
    fi   