const fs = require('fs')

function escreveDadoNoArq(filename, content){
    fs.writeFileSync(filename, JSON.stringify(content), 'utf8', (e) => {
        if(e){
            console.log(e)
        }
    })
}

function getPostData(req){
    return new Promise((resolve, reject) => {
        try {
            let body = ''

            req.on('data', (chunk) => {
                body += chunk.toString()
            })


            req.on('end', () => {
                resolve(body)
            })

        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    escreveDadoNoArq,
    getPostData
}