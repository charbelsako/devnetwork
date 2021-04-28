const router = require("express").Router();
const passport = require("passport");

const User = require("../../models/User");

router.get("/users", passport.authenticate("jwt", { session: false }), async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (e) {
    res.status(500).json({ error: "couldn't get users" });
  }
});

router.delete("/users/:id", passport.authenticate("jwt", { session: false }), async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findOneAndRemove({ _id: id });
    res.send(id).status(200);
  } catch (e) {
    res.status(200).json({ error: "couldn't delete user" });
  }
});

module.exports = router;
