require('dotenv').config({ path: './variables.env' });
const express = require('express');
const path = require('path');
const fs = require('fs');
const morgan = require('morgan');
const app = express();

app.set('views', 'views');
app.set('view engine', 'pug');

app.use(morgan('combined'));
app.use(express.static(path.join(__dirname, 'styles')));

const blogFile = fs.readFileSync('./seeds/db.json', 'utf-8');
const blogArray = JSON.parse(blogFile);

// INDEX
app.get('/', (req, res) =>
  res.render('index', {
    blogs: blogArray
  })
);

// NEW
app.get('/new', (req, res) => {
  res.render('new');
});

// SHOW
app.get('/:blogId', (req, res) => {
  const blogId = req.params.blogId;
  const blogArray = JSON.parse(fs.readFileSync('./seeds/blogs.json', 'utf-8'));
  let blog;
  for (let i = 0; i < blogArray.length; i++) {
    if (blogArray[i]._id === blogId) {
      blog = blogArray[i];
      break;
    }
  }
  if (blog !== undefined) {
    res.render('show', { blog });
  } else {
    res.status(404).end('Blog Not Found');
  }
  // Blog.findById(blogId, (err, blog) => {
  //   if (err) {
  //     res.status(404).end('Blog not found');
  //   } else {
  //     res.render('show', { blog });
  //   }
  // });
});

// EDIT VIEW
app.get('/:blogId/edit', (req, res) => {
  const blogId = req.params.blogId;
  const blogArray = JSON.parse(fs.readFileSync('./seeds/blogs.json', 'utf-8'));
  let blog;
  for (let i = 0; i < blogArray.length; i++) {
    if (blogArray[i]._id === blogId) {
      blog = blogArray[i];
      break;
    }
  }
  if (blog !== undefined) {
    res.render('edit', { blog });
  } else {
    res.status(404).end('Blog Not Found');
  }

  // Blog.findById(blogId, (err, blog) => {
  //   if (err) {
  //     res.status(404).end('Blog not found');
  //   } else {
  //     res.render('edit', { blog });
  //   }
  // });
});

// DELETE ACTION
app.delete('/:blogId', (req, res) => {
  const blogId = req.params.blogId;
  const blogArray = JSON.parse(fs.readFileSync('./seeds/blogs.json', 'utf-8'));
  const newBlogArray = blogArray.filter(b => b._id !== blogId);

  fs.writeFileSync('./seeds/blogs.json', JSON.stringify(newBlogArray, null, 2));

  // Blog.deleteOne({ _id: blogId }, () => {
  //   res.redirect(303, '/');
  // });
});

// UPDATE ACTION
app.put('/:blogId', urlencodedParser, (req, res) => {
  const blogId = req.params.blogId;
  const blogArray = JSON.parse(fs.readFileSync('./seeds/blogs.json', 'utf-8'));
  let blog, blogIdx;
  for (let i = 0; i < blogArray.length; i++) {
    if (blogArray[i]._id === blogId) {
      blog = blogArray[i];
      blogIdx = i;
      break;
    }
  }
  if (blog !== undefined) {
    const { author, title, blog_body: body } = req.body;
    const updatedBlog = Object.assign({}, blog, {
      author,
      title,
      body,
      updatedAt: Date.now()
    });
    blogArray[blogIdx] = updatedBlog;
    fs.writeFileSync('./seeds/blogs.json', JSON.stringify(blogArray, null, 2));
    res.redirect(303, '/');
  } else {
    res.status(404).end('Blog Not Found');
  }
  const { author, title, blog_body: body } = req.body;
  // Blog.findByIdAndUpdate(
  //   blogId,
  //   { author, title, body, updatedAt: Date.now() },
  //   err => {
  //     if (err) {
  //       res.status(404).end('Blog not found');
  //     } else {
  //       res.redirect(303, '/');
  //     }
  //   }
  // );
});

app.listen(process.env.PORT, () =>
  console.log(`i am listening on ${process.env.PORT}`)
);
