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

    getPostData(req).then(postData => {
        req.body = postData

        // 处理 blog 路由
        // const blogData = handleBlogRouter(req, res);
        // if (blogData) {
        //     res.end(
        //         JSON.stringify(blogData)
        //     )
        //     return
        // }
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

        // 处理 blog 路由
        const userData = handleUserRouter(req, res)
        if (userData) {
            res.end(
                JSON.stringify(userData)
            )
            return
        }

        res.writeHead(404, {
            "Content-Type": "text/plain"
        })
        res.write('404')
        res.end()
    })
};

module.exports = serverHandle
