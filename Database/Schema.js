const mongoose = require('mongoose');
const User = new mongoose.Schema({
    Email: {
        type: String,
        required: true,
    },
    Password: String,
    usertype: {
        type: String,
        default: "Normal"
    },
    userName: String,
    Status: {
        type: Boolean,
        default: true,
    },
    tokens: String,
});
const Skills = new mongoose.Schema({
    SkillName: String,
    Skillicon: String,
});
const BasicInfoSchema = new mongoose.Schema({
    Email: String,
    ProfilePic: String,
    Name: String,
    Description: String,
    Role: String,
    Headers: String,
    Aboutme: String,
    Leetcode: String,
    Codechef: String,
    Linkedin: String,
    Github: String,
    Skills: [Number],
});
const CompanyDetails = new mongoose.Schema({
    CName: String,
    DurationStart: Date,
    DurationEnd: Date,
    Role: String,
    Description: String,
});
const ExperienceSchema = new mongoose.Schema({
    Email: String,
    Company: [CompanyDetails],
});
const ProjectDetails = new mongoose.Schema({
    PName: String,
    TechnologyStack: String,
    Description: String,
    Github: String,
    Image: String,
});
const ProjectSchema = new mongoose.Schema({
    Email: String,
    Project: [ProjectDetails],
});
const user = mongoose.model("User", User);
const BasicInfo = mongoose.model("BasicInfo", BasicInfoSchema);
const Experience = mongoose.model("Exprience", ExperienceSchema);
const ProjectDetail = mongoose.model("ProjectDetail", ProjectDetails);
const Project = mongoose.model("Project", ProjectSchema);
const Company = mongoose.model("Company", CompanyDetails);
module.exports = { user, BasicInfo, Experience, Project, Company, ProjectDetail };