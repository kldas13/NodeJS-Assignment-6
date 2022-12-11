const express = require("express");
const router = express.Router();
const Blog = require("../models/Blog");
const bodyparser = require("body-parser");
const { query } = require("express");

// Your routing code goes here

router.use(bodyparser.json());

// router.get("/blog", (req, res) => {
//   res.json({ ok: "blog" });
// });

//Display the list

router.get("/all", async (req, res) => {
  try {
    const users = await Blog.find();
    res.json({
      status: "Success",
      result: users,
    });
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      message: error.message,
    });
  }
});

//Search posts by query params

router.get("/", async (req, res) => {
  // console.log(req.body);
  // console.log(req.query);
  try {
    const { page = 1, search = "" } = req.query;
    // const user = await Blog.find({topic:search}).skip((page-1)*5).limit(5);
    const user = await Blog.find()
      .skip((page - 1) * 5)
      .limit(5);
    const sorter = user.filter((p) => {
      return p.topic == search ? p : null;
    });
    if (sorter.length == 0) {
      res.json({
        status: "Failed",
        message: "Search Failed!",
      });
    } else {
      res.json({
        status: "Success",
        result: sorter,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      message: e.message,
    });
  }
});

//Add posts

router.post("/", async (req, res) => {
  try {
    const user = await Blog.create(req.body);
    res.json({
      status: "Success",
      user,
    });
  } catch (e) {
    res.status(400).json({
      status: "Failed",
      message: e.message,
    });
  }
});

// Edit posts by ID

router.put("/:id", async (req, res) => {
  try {
    const user = await Blog.updateOne({ _id: req.params.id }, req.body);
    res.json({
      status: "Success",
      user,
    });
  } catch (error) {
    res.status(400).json({
      status: "Failed",
      message: error.message,
    });
  }
});

//Delete posts by ID

router.delete("/:id", async (req, res) => {
  try {
    const user = await Blog.deleteOne({ _id: req.params.id });
    res.json({
      status: "Success",
      user,
    });
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      message: e.message,
    });
  }
});

//Delete many posts by name

// router.delete('/:topic', async (req,res)=> {
//     try {
//         const user = await Blog.deleteMany({topic:req.params.topic});
//         res.json({
//             status:"Success",
//             user
//         })
//     } catch (error) {
//         res.status(500).json({
//             status:"Failed",
//             message:e.message
//         })
//     }
// })

module.exports = router;
