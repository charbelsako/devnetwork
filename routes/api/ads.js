const router = require("express").Router()
// const passport = require("passport")

const User = require("../../models/User")
const Ad = require("../../models/Ad")
const Application = require("../../models/Application")

const validateAdInput = require("../../validation/advertisement")
const {
  isEmployer,
  isStudent,
  isStudentOrEmployer,
} = require("../../middleware/middleware")
const isAuthenticated = require("../../middleware/auth")

/*
  @route /api/ads/
  @method POST
  @desc create a new job advertisement
  @access private
*/
router.post("/", isAuthenticated, isEmployer, async (req, res) => {
  const { errors, isValid } = validateAdInput(req.body)

  if (!isValid) {
    return res.status(400).json(errors)
  }

  try {
    const ad = new Ads({
      user: req.user.id,
      title: req.body.title,
      description: req.body.description,
      salary: req.body.salary,
    })
    const Ad = await ad.save()
    res.json(Ad).status(200)
  } catch (e) {
    console.log(e)
    res.json(e).status(500)
  }
})

/*
  @route /api/ads
  @method GET
  @desc return all ads
  @access private (employer)
*/
router.get("/", isAuthenticated, isStudentOrEmployer, async (req, res) => {
  // Get all ads
  try {
    const ads = await Ads.find().populate("user", ["name"])
    console.log(ads)
    res.json(ads).status(200)
  } catch (e) {
    console.log(e)
    res.json(e).status(500)
  }
})

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
    const userAd = await Ad.findById(req.params.id)
    // does it belong to the current user
    if (userAd.user != req.user.id) {
      return res.json("Unauthorized").status(403)
    }
    const id = userAd._id
    await userAd.remove()
    res.json({ success: true, id })
  } catch (e) {
    console.log(e)
    res.json(e).status(200)
  }
})

/*
  @route /api/ads/myads
  @method GET
  @desc Get user ads
  @access private (employer)
*/
router.get("/myads", isAuthenticated, isEmployer, async (req, res) => {
  try {
    //get all ads by user
    const ads = await Ad.find({ user: req.user.id })
    console.log(ads)
    res.json(ads)
  } catch (e) {
    console.log(e)
    res.json(e).status(500)
  }
})

/*
  @route /api/ads/apply/:id
  @method POST
  @desc Apply to a job offering
  @access private
*/
router.post("/apply/:id", isAuthenticated, isStudent, async (req, res) => {
  // Should receive two things, Advertisement id, User id

  try {
    const application = new Application({
      offering: req.body.jobId,
      // ? Could have used req.user.id
      user: req.body.userId,
    })
    const app = await application.save()
    console.log(app)
    res.json({ id: app._id }).status(200)
  } catch (e) {
    console.log(e)
    console.log(e.message)
    res.json({ error: "an error has occurred" }).status(500)
  }
})

/*
  @route /api/ads/applied
  @method GET
  @desc Get all applied jobs for a user
  @access private
*/
router.get("/applied", isAuthenticated, isStudent, async (req, res) => {
  try {
    const appliedJobs = await Application.find({ user: req.user.id }).select(
      "offering"
    )
    const appliedJobsIds = appliedJobs.map((value) => value.offering)
    res.json({ appliedJobsIds })
  } catch (e) {
    console.log(e)
    console.log(e.message)
    res.json({ error: "An error has occurred." }).status(500)
  }
})

/*
  @route /api/ads/myapplications
  @method GET
  @desc Get all applied jobs for a user
  @access private
*/
router.get("/myapplications", isAuthenticated, isStudent, async (req, res) => {
  try {
    const appliedJobs = await Application.find({ user: req.user.id }).populate({
      path: "offering",
      populate: { path: "user" },
    })
    res.json({ appliedJobs })
  } catch (e) {
    console.log(e)
    console.log(e.message)
    res.json({ error: "An error has occurred." }).status(500)
  }
})

module.exports = router
