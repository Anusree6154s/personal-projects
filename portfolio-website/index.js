import express from "express";
import bodyParser from "body-parser";
import { readFile, writeFile } from 'fs/promises';
import multer from "multer";

const app = express();
const port = 8000 || process.env.PORT;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true, limit: '100mb' }));
app.use(bodyParser.json({ limit: '10mb' }));

// Set up multer for handling file uploads
const storage = multer.memoryStorage(); // Store the files in memory as buffers
const upload = multer({ storage: storage });

//to access in file json file
const filePath = './data.json'

app.get("/", async (req, res) => {
  try {
    const data = await readFile(filePath, 'utf8')
    const jsonData = JSON.parse(data);
    const input = {
      designTools: jsonData.designs.tools,
      designs: jsonData.designs.design,
      websiteTools: jsonData.websites.tools,
      websites: jsonData.websites.website,
      illustrationTools: jsonData.illustrations.tools,
      illustrations: jsonData.illustrations.illustration
    }

    res.render("index.ejs", input);

  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
});

app.get('/pages/post', async (req, res) => {
  res.render('pages/post.ejs')
})

app.get('/pages/design', async (req, res) => {
  res.render('pages/design.ejs')
})

app.get('/pages/dev', async (req, res) => {
  res.render('pages/dev.ejs')
})

app.get('/pages/illustration', async (req, res) => {
  res.render('pages/illustration.ejs')
})

app.get('/data.json', async (req, res) => {
  const data = await readFile(filePath, 'utf8');
  res.send(data)
})

app.post('/addcontent', upload.single('content-image'), async (req, res) => {
  const contentCategory = req.body['content-category'];
  const contentTitle = req.body['content-title'];
  const contentProduct = req.body['content-product'];
  const contentDescription = req.body['content-description'];
  const contentTools = req.body['content-tools']
  const image = req.file.buffer
  const base64Image = image.toString('base64'); //convert buffer data to base64 string
  const contentImage = `data:image/png;base64,${base64Image}`;

  const contentInput = {
    title: contentTitle,
    productURL: contentProduct,
    description: contentDescription,
    tools: contentTools,
    image: contentImage
  }

  const data = await readFile(filePath, 'utf8');
  const jsonData = JSON.parse(data);
  switch (contentCategory) {
    case 'Design':
      jsonData.designs.design.push(contentInput);
      break;

    case 'Dev':
      jsonData.websites.website.push(contentInput);
      break;

    case 'Illustration':
      jsonData.illustrations.illustration.push(contentInput);
      break;

    default:
      break;
  }
  const updatedJsonData = JSON.stringify(jsonData, null, 2);
  await writeFile(filePath, updatedJsonData, 'utf8');
  res.redirect('/pages/post')
})

app.post('/addtool', async (req, res) => {
  const toolsCategory = req.body['tools-category'];
  const toolsInput = req.body['tools-input'];

  const data = await readFile(filePath, 'utf8');
  const jsonData = JSON.parse(data);

  switch (toolsCategory) {
    case 'Design':
      jsonData.designs.tools.push(toolsInput);
      break;

    case 'Dev':
      jsonData.websites.tools.push(toolsInput);
      break;

    case 'Illustration':
      jsonData.illustrations.tools.push(toolsInput);
      break;

    default:
      break;
  }
  const updatedJsonData = JSON.stringify(jsonData, null, 2);
  await writeFile(filePath, updatedJsonData, 'utf8');
  res.redirect('/pages/post')
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


// // server.js
// const jsonServer = require('json-server');
// const server = jsonServer.create();
// const router = jsonServer.router('db.json');
// const middlewares = jsonServer.defaults();

// server.use(middlewares);
// server.use(jsonServer.bodyParser); // Add this middleware to parse the request body

// server.post('/items', (req, res) => {
//   const newItem = req.body; // Access the data sent in the POST request body
//   console.log('Received data:', newItem);

//   // Assuming 'db.json' structure follows the same structure as your newItem
//   router.db.get('items').push(newItem).write();

//   // Send a response indicating success
//   res.json({ message: 'Item added successfully', data: newItem });
// });

// server.use(router);

// const port = 3000;
// server.listen(port, () => {
//   console.log(`JSON Server is running on http://localhost:${port}`);
// });
