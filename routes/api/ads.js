const router = require("express").Router();
const passport = require("passport");

const User = require("../../models/User");
const Ad = require("../../models/Ad");

const validateAdInput = require("../../validation/advertisement");
const { isEmployer } = require("../../middleware/middleware");
const isAuthenticated = require("../../middleware/auth");
/*
  @route /api/ads/
  @method POST
  @desc create a new job advertisement
  @access private
*/
router.post("/", isAuthenticated, isEmployer, async (req, res) => {
  const { errors, isValid } = validateAdInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

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
  @access private (employer)
*/
router.get("/", isAuthenticated, async (req, res) => {
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
  @route /api/ads/:id
  @method DELETE
  @desc Delete an Ad
  @access private
*/
router.delete("/:id", isAuthenticated, isEmployer, async (req, res) => {
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

/*
  @route /api/ads/myads
  @method GET
  @desc Get user ads
  @access private (employer)
*/
router.get("/myads", isAuthenticated, isEmployer, async (req, res) => {
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
