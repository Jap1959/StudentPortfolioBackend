
const Schema = require('../Schema');
const fs = require('fs');
const url = "http://localhost:3000/Portfolio/";
const AddBasicInfo = async (data) => {

    const { Name, Email, Role, Description, Linkedin, Leetcode, Codechef, Github } = data;
    try {
        const find = await Schema.BasicInfo.findOne({ Email: Email });
        if (find != null) {
            return UpdateBasicInfo(data);
        }
        const BasicIn = new Schema.BasicInfo({
            Name: Name,
            Email: Email,
            Role: Role,
            Description: Description,
            Linkedin: Linkedin,
            Leetcode: Leetcode,
            Codechef: Codechef,
            Github: Github,
        })
        const result = await BasicIn.save();
        if (result != null) {
            return { status: 200, message: 'Sucessfully saved' };
        } else {
            return { status: 422, message: 'Try Again Later!!' };
        }
    } catch (e) {
        console.log(e);
    }
}
const UpdateBasicInfo = (data) => {
    const { Name, Email, Role, Description, Linkedin, Leetcode, Codechef, Github } = data;
    try {
        const result = Schema.BasicInfo.findOneAndUpdate({ Email: Email }, {
            Name: Name,
            Email: Email,
            Role: Role,
            Description: Description,
            Linkedin: Linkedin,
            Leetcode: Leetcode,
            Codechef: Codechef,
            Github: Github,
        });
        if (result != null) {
            return { status: 200, message: 'Sucessfully saved' };
        } else {
            return { status: 422, message: 'Try Again Later!!' };
        }
    } catch (e) {
        console.log(e);
    }
}
const AddSkills = async (data) => {
    const { Email, Skill } = data;
    try {
        const result = await Schema.BasicInfo.findOneAndUpdate(
            { Email: Email },
            {
                $set: { Skills: Skill },
            }, { new: true },
        );
        console.log(result);
        if (result != null) {
            return { status: 200, message: 'Sucessfully saved' };
        } else {
            return { status: 422, message: 'Complete Header Section' };
        }
    } catch (e) {
        console.log(e);
    }
}
const AddExprience = async (data) => {
    try {
        const result = await Schema.Experience.bulkWrite(data.map(doc => ({
            updateOne: {
                filter: { id: doc.id, Email: doc.Email },
                update: { $set: doc },
                upsert: true // Insert new document if id doesn't exist, update existing document if id already exists
            }
        })));
        if (result != null) {
            return { status: 200, message: 'Sucessfully saved' };
        } else {
            return { status: 422, message: 'Complete Header Section' };
        }
    } catch (e) {
        console.log(e);
    }
}
const AddProject = async (data) => {
    try {

        const result = await Schema.Project.bulkWrite(data.map(doc => ({
            updateOne: {
                filter: { id: doc.id, Email: doc.Email },
                update: { $set: doc },
                upsert: true // Insert new document if id doesn't exist, update existing document if id already exists
            }
        })));
        if (result != null) {
            return { status: 200, message: 'Sucessfully saved' };
        } else {
            return { status: 422, message: 'Try again Later!!!' };
        }
    } catch (e) {
        console.log(e);
    }
}
const AddAboutme = async (data) => {
    const { Email, Description, Image } = data;
    try {
        const result = await Schema.BasicInfo.findOneAndUpdate({ Email: Email }, {
            Aboutme: Description,
            ProfilePic: Image,
        });
        if (result != null) {
            return { status: 200, message: 'Sucessfully saved' };
        } else {
            return { status: 422, message: 'Complete Header Section' };
        }
    } catch (e) {
        console.log(e);
    }
}
const AddComplete = (data) => {
    const { Email } = data;
    try {
        const result = Schema.user.findOneAndUpdate({ Email: Email }, {
            Status: true,
        });
        if (result != null) {
            return { status: 200, message: 'Sucessfully createad', url: url + result._id };
        } else {
            return { status: 422, message: 'Complete Header Section' };
        }
    } catch (e) {
        console.log(e);
    }
}
module.exports = { AddProject, AddSkills, AddExprience, AddBasicInfo, AddAboutme, AddComplete };