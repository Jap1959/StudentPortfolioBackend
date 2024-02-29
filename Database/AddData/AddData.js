
const Schema = require('../Schema');
const fs = require('fs');
const url = "http://localhost:3000/Portfolio/";
const AddBasicInfo = (data) => {
    const { Name, Email, Role, Description, Linkedin, Leetcode, Codechef, Github } = data;
    try {
        const find = Schema.BasicInfo.find({ Email: Email });
        if (find != null) {
            return UpdateBasicInfo(data);
        }
        const BasicInfo = new Schema.BasicInfo({
            Name: Name,
            Email: Email,
            Role: Role,
            Description: Description,
            Linkedin: Linkedin,
            Leetcode: Leetcode,
            Codechef: Codechef,
            Github: Github,
        })
        const result = BasicInfo.save();
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
const AddSkills = (data) => {
    const { ids, Email } = data;
    try {
        const result = Schema.BasicInfo.findOneAndUpdate({ Email: Email }, {
            Skills: ids,
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
const AddExprience = (data) => {
    const { Email, Company } = data;
    try {
        let Exprience = [];
        Company.map((element, index) => {
            const Company = Schema.Project({
                Name: element.CName,
                Role: element.CName,
                Description: element.Description,
            })
            Exprience.add(Company);
        })
        const result = Schema.BasicInfo.findOneAndUpdate({ Email: Email }, {
            Company: Exprience,
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
const AddProject = (data) => {
    const { Email, ProjectList } = data;
    try {
        let Projects = [];
        ProjectList.map((element, index) => {
            const Read = fs.readFileSync(`D:/Student_portfolio_backend/Uploads/Project${index}.txt`, 'utf8');
            const Image = new Buffer(Read).toString('base64');
            const ProjectElement = new Schema.ProjectDetail({
                PName: element.PName,
                TechnologyStack: element.TechnologyStack,
                Github: element.Github,
                Decription: element.Decription,
                Image: Image,
            })
            fs.unlinkSync(`D:/Student_portfolio_backend/Uploads/Project${index}.txt`);
            Projects.add(ProjectElement);
        })
        const ProjectS = new Schema.Project({
            Email: Email,
            Project: Projects,

        })
        const result = ProjectS.save();
        if (result != null) {
            return { status: 200, message: 'Sucessfully saved' };
        } else {
            return { status: 422, message: 'Try again Later!!!' };
        }
    } catch (e) {
        console.log(e);
    }
}
const AddAboutme = (data) => {
    const { Email, Description } = data;
    try {
        const Read = fs.readFileSync(`D:/Student_portfolio_backend/Uploads/${Email}.txt`);
        const Image = new Buffer(Read).toString('base64');
        const result = Schema.BasicInfo.findOneAndUpdate({ Email: Email }, {
            Aboutme: Description,
            ProfilePic: Image,
        });
        fs.unlinkSync(`D:/Student_portfolio_backend/Uploads/${Email}.txt`);
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