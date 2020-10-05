const fs = require("fs");
const fse = require("fs-extra")

function handleUpdate(req, res) {
  const dirToUpdate = req.body.oldUrl;
  fs.rename(`./pages/${dirToUpdate}`, `./pages/${req.body.newUrl}`, ()=>{
   
    console.log("updated")
  }
 
  )
  res.status(204).end('updated')
}

export default (req, res) => {
  const { method } = req;

  switch (method) {
    case "GET":
      res.status(200).end("This endpoint is for updating");
      break;
    case "PATCH":
      console.log('Updating directory...')
      handleUpdate(req, res);
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};
