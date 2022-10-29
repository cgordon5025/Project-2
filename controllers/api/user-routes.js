const router = require("express").Router();
const { User, Post } = require("../../models");

// get all messages
router.get("/", async (req, res) => {
  // find all users --- I think I might need to add more code to the findAll {}
  try {
    const allMessageData = await Message.findAll({ include: user_id }); 
    res.status(200).json(allMessageData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get one user
router.get("/:id", async (req, res) => {
  // find a single user by its `id`
  try {
    const userIdData = await User.findByPk(req.params.id, {
      // JOIN with Post
      include: [{ model: Message }]
    });

    if (!userIdData) {
      res.status(404).json({ message: "No messages found for this user!" });
      return;
    }
  } catch (err) {
    res.status(500).json(err);
  }
});


router.post('/signup', async (req, res) => {
  try {
    const createdUserData = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    //this sets up the new user information
    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.userID = userData.id;
      req.session.username = userData.username;
      res.status(200).json(userData)
    });
    res.status(200).json(createdUserData);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;