var koa = require("koa")
    , app = koa()
    , logger = require("koa-logger")
    , router = require("koa-router")
    , render = require("koa-swig")
    , bodyparser = require("koa-bodyparser")
    , serve = require("koa-static")
    , http = require("http")
    , path = require("path")
    , mongoose = require("mongoose")
    , port = process.env.PORT
    , env = process.env.NODE_ENV
    ;

// Initialize database
connection = mongoose.connect("mongodb://127.0.0.1:27017/accedoplayer")
mongoose.set("debug",  env == "production"? false: true)

// Initialize models after database
var models = require("./models")

app.use(logger())
app.use(bodyparser())
app.use(serve("./dist"))

// Swig (Template rendering engine)
app.context.render = render({
    root: path.join(__dirname, "templates"),
    autoescape: true,
    cache: "memory",
    ext: "html"
})

// Initialize router
routers = require("./routers")
app.use(routers.public.middleware())
app.use(routers.api.middleware())

console.log("Server running at port " + port + " in " + env)

server = http.createServer(app.callback())
server.listen(port)
