const mongoose = require("mongoose")
const { Schema } = mongoose

const InstructorProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  skills: [
    {
      skill: {
        type: String,
        required: true,
      },
      yearsOfExperience: {
        type: String,
        required: true,
        default: 0,
      },
    },
  ],
  phone: { type: String, required: true },
  date: {
    type: Date,
    default: Date.now,
  },
  // handle: {
  //   type: String,
  //   required: true,
  //   max: 40,
  // },
  // company: {
  //   type: String,
  // },
  // website: {
  //   type: String,
  // },
  // location: {
  //   type: String,
  // },
  // status: {
  //   type: String,
  //   required: true,
  // },
  // bio: {
  //   type: String,
  // },
  // githubusername: {
  //   type: String,
  // },
  // experience: [
  //   {
  //     title: {
  //       type: String,
  //       required: true,
  //     },
  //     company: {
  //       type: String,
  //       required: true,
  //     },
  //     location: {
  //       type: String,
  //     },
  //     from: {
  //       type: Date,
  //       required: true,
  //     },
  //     to: {
  //       type: Date,
  //     },
  //     current: {
  //       type: Boolean,
  //       default: false,
  //     },
  //     description: {
  //       type: String,
  //     },
  //   },
  // ],
  // education: [
  //   {
  //     school: {
  //       type: String,
  //       required: true,
  //     },
  //     degree: {
  //       type: String,
  //       required: true,
  //     },
  //     fieldofstudy: {
  //       type: String,
  //       required: true,
  //     },
  //     from: {
  //       type: Date,
  //       required: true,
  //     },
  //     to: {
  //       type: Date,
  //     },
  //     current: {
  //       type: Boolean,
  //       default: false,
  //     },
  //     description: {
  //       type: String,
  //     },
  //   },
  // ],

  // social: {
  //   youtube: {
  //     type: String,
  //   },
  //   instagram: {
  //     type: String,
  //   },
  //   linkedin: {
  //     type: String,
  //   },
  //   facebook: {
  //     type: String,
  //   },
  //   twitter: {
  //     type: String,
  //   },
  // },
})

module.exports = InstructorProfile = mongoose.model(
  "instructorsprofiles",
  InstructorProfileSchema
)
