const router = require("express").Router();
const passport = require("passport");

const User = require("../../models/User");
const Ad = require("../../models/Ad");
/*
  @route /api/ads/
  @method POST
  @desc create a new job advertisement
  @access private
*/
// TODO: Create a local strategy for jwt to check if the user is an employer
router.post("/", passport.authenticate("jwt", { session: false }), async (req, res) => {
  // TODO: Add validation
  try {
    const ad = new Ads({
      user: req.user.id,
      title: req.body.title,
      description: req.body.description,
      salary: req.body.salary,
    });
    const Ad = await ad.save();
    res.json(Ad).status(200);
  } catch (e) {
    console.log(e);
    res.json(e).status(500);
  }
});

/*
  @route /api/ads
  @method GET
  @desc return all ads
  @access private
*/
router.get("/", passport.authenticate("jwt", { session: false }), async (req, res) => {
  // Get all ads
  try {
    const ads = await Ads.find().populate("user", ["name"]);
    console.log(ads);
    res.json(ads).status(200);
  } catch (e) {
    console.log(e);
    res.json(e).status(500);
  }
});

/*
  @route /api/users/ads
  @method GET
  @desc return all ads
  @access private
*/
router.delete("/:id", passport.authenticate("jwt", { session: false }), async (req, res) => {
  // Get all ads
  try {
    // find the ad with the id
    const userAd = await Ad.findById(req.params.id);
    // does it belong to the current user
    if (userAd.user != req.user.id) {
      return res.json("Unauthorized").status(403);
    }
    const id = userAd._id;
    await userAd.remove();
    res.json({ success: true, id });
  } catch (e) {
    console.log(e);
    res.json(e).status(200);
  }
});

router.get("/myads", passport.authenticate("jwt", { session: false }), async (req, res) => {
  try {
    //get all ads by user
    const ads = await Ad.find({ user: req.user.id });
    console.log(ads);
    res.json(ads);
  } catch (e) {
    console.log(e);
    res.json(e).status(500);
  }
});

module.exports = router;
