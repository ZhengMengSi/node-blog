const querystring = require('querystring')
const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')

const serverHandle = (req, res) => {
    // 设置返回格式 JSON
    res.setHeader('Content-Type', 'application/json')
    const getPostData = (req) => {
        const promise = new Promise((resolve, reject) => {
            if (req.method !== 'POST') {
                resolve({})
                return
            }
            if (req.headers['content-type'] !== 'application/json') {
                resolve({})
                return
            }
            let postData = ''
            req.on('data', chunk => {
                postData += chunk.toString()
            })
            req.on('end', () => {
                if (!postData) {
                    resolve({})
                    return
                }
                resolve(
                    JSON.parse(postData)
                )
            })
        })
        return promise
    }
    // 获取 path
    const url = req.url
    req.path = url.split('?')[0]
    req.query = querystring.parse(url.split('?')[1])
    req.cookie = {}
    const cookieStr = req.headers.cookie || ''
    cookieStr.split(';').forEach(item => {
        if (!item) {
            return
        }
        const arr = item.split('=')
        const key = arr[0].trim()
        const val = arr[1].trim()
        req.cookie[key] = val
    })
    console.log('req headers cookie ', req.headers.cookie)
    console.log('req cookie ', req.cookie)

    getPostData(req).then(postData => {
        req.body = postData

        // 处理 blog 路由
        const blogResult = handleBlogRouter(req, res)
        if (blogResult) {
            blogResult.then(blogData => {
                console.log(blogData);
                res.end(
                    JSON.stringify(blogData)
                )
            })
            return
        }

        // 处理 user 路由
        // const userData = handleUserRouter(req, res)
        // if (userData) {
        //     res.end(
        //         JSON.stringify(userData)
        //     )
        //     return
        // }
        const userResult = handleUserRouter(req, res)
        if (userResult) {
            userResult.then(userData => {
                res.end(
                    JSON.stringify(userData)
                )
            })
            return
        }

        // 没有匹配到路由
        res.writeHead(404, {
            "Content-Type": "text/plain"
        });
        res.write('404')
        res.end()
    })
};

module.exports = serverHandle
