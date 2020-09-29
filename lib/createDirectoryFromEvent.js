const fs = require("fs");
const fse = require("fs-extra")

function handlePost(req, res) {
  function createNewDirectory(dir, req, res) {
      const result = fs.mkdirSync(`./pages/${dir}`,{ recursive: true })
      
      console.log("Directory is created: ");
      console.log('\x1b[36m', result)
      console.log(  "at working directory:" +  process.cwd())
      res.status(200).end(JSON.stringify({ 
            data : {
              workingDirectory: process.cwd(),
              createdDirectory: result
            }
        })
    )
  return result
  }

  const createdDir = createNewDirectory(req.body.dirName, req, res)
  fse.copyFile('./pages/template/index.js', `${createdDir}/index.js`)
    .then(()=>{
      console.log("success copying ")
    })
    .catch(err => {
      console.error(err)
    })
  fse.copyFile('./pages/template/[slug].js', `${createdDir}/[slug].js`)
    .then(()=>{
      console.log("success copying ")
    })
    .catch(err => {
      console.error(err)
    })
}

export default (req, res) => {
  const { method } = req;
  console.log("request: ")
  console.log(req)
  switch (method) {
    case "GET":
      res.status(200).end("This endpoint is for creating a file structure");

      break;
    case "POST":
      console.log('Creating directory...')
      handlePost(req, res);
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};
