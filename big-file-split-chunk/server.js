const fs = require("fs")
const path = require("path")
const util = require("util")
const Koa = require("koa")
const cors = require("@koa/cors")
const multer = require("@koa/multer")
const Router = require("@koa/router")
const serve = require("koa-static")
const fse = require("fs-extra")

const readdir = util.promisify(fs.readdir)
const unlink = util.promisify(fs.unlink)

const app = new Koa()
const router = new Router()
const TEMP_DIR = path.join(__dirname, "temp")
const UPLOAD_DIR = path.join(__dirname, "/public/upload")
const IGNORE_FILES = [".Ds_Store"]

const storage = multer.diskStorage({
  destination: async function (req, file, cb) {
    const fileMd5 = file.originalname.split("-")[0]
    const fileDir = path.join(TEMP_DIR, fileMd5)
    await fse.ensureDir(fileDir)
    cb(null, fileDir)
  },
  filename: function (req, file, cb) {
    const chunkIndex = file.originalname.split("-")[1]
    cb(null, `${chunkIndex}`)
  },
})

const upload = multer({ storage })

router.get("/", async (ctx) => {
  ctx.body = "大文件并发上传"
})

router.get("/upload/exists", async (ctx) => {
  const { name: fileName, md5: fileMd5 } = ctx.query
  const filePath = path.join(UPLOAD_DIR, fileName)
  const isExists = await fse.pathExists(filePath)
  if (isExists) {
    ctx.body = {
      status: "success",
      data: {
        isExists: true,
        url: `http://localhost:3000/${fileName}`,
      },
    }
  } else {
    let chunkIds = []
    const chunksPath = path.join(TEMP_DIR, fileMd5)
    const hasChunksPath = await fse.pathExists(chunksPath)
    if (hasChunksPath) {
      const files = await readdir(chunksPath)
      chunkIds = files.filter((file) => IGNORE_FILES.indexOf(file) === -1)
    }
    ctx.body = {
      status: "success",
      data: {
        isExists: false,
        chunkIds,
      },
    }
  }
})

router.post("/upload/single", async (ctx, next) => {
  const err = await upload
    .single("file")(ctx, next)
    .then((res) => res)
    .catch((err) => err)

  if (err) {
    ctx.body = {
      code: 0,
      msg: err.message,
    }
  } else {
    ctx.body = {
      code: 1,
      data: ctx.file,
    }
  }
})

router.get("/upload/concatFiles", async (ctx) => {
  const { name: fileName, md5: fileMd5 } = ctx.query
  await concatFiles(
    path.join(TEMP_DIR, fileMd5),
    path.join(UPLOAD_DIR, fileName)
  )
  ctx.body = {
    status: "success",
    data: {
      url: `http://localhost:3000/${fileName}`,
    },
  }
})

async function concatFiles(sourceDir, targetDir) {
  const readFile = (file, ws) =>
    new Promise((resolve, reject) => {
      fs.createReadStream(file)
        .on("data", (data) => ws.write(data))
        .on("end", resolve)
        .on("error", reject)
    })
  const files = await readdir(sourceDir)
  const sortedFiles = files
    .filter((file) => IGNORE_FILES.indexOf(file) === -1)
    .sort((a, b) => a - b)
  const writeStream = fs.createWriteStream(targetDir)
  for (const file of sortedFiles) {
    const filePath = path.join(sourceDir, file)
    await readFile(filePath, writeStream)
    await unlink(filePath) // 删除已合并的分块
  }
  writeStream.end()
}

// 注册中间件
app.use(cors())
app.use(serve(UPLOAD_DIR))
app.use(router.routes()).use(router.allowedMethods())
app.listen(3000, () => {
  console.log(`sever start @ part 3000`)
})
