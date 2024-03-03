const schema = require('../Schema');

const GetHeaderSection = async (id) => {
    console.log(id);
    try {
        // const find = schema.user.find({ _id: id, Status: true });
        // console.log(find);
        // if (find != null) {
        const result = await schema.BasicInfo.findOne({ Email: id }).select('-Skills');
        if (result != null) {
            return { status: 200, Data: result };
        } else {
            return { status: 422, message: 'Try again Later' };
        }
        // } else {
        //     return { status: 404, message: 'No Details Added!!' };
        // }
    } catch (e) {

        console.log(e);
    }
}
const GetSkills = async (id) => {

    try {
        const find = await schema.user.find({ _id: id });
        if (find != null) {
            const result = await schema.BasicInfo.find({ Email: find.Email }).select('Skills');
            if (result != null) {
                return { status: 200, Data: result };
            } else {
                return { status: 422, message: 'Try again Later' };
            }
        } else {
            return { status: 404, message: 'No Details Added!!' };
        }
    } catch (e) {

        console.log(e);
    }
}
const GetAboutMe = (id) => {

    try {
        const find = schema.user.find({ _id: id, Status: true });
        if (find != null) {
            const result = schema.BasicInfo.find({ Email: find.Email }).select('Aboutme');
            if (result != null) {
                return { status: 200, Data: result };
            } else {
                return { status: 422, message: 'Try again Later' };
            }
        } else {
            return { status: 404, message: 'No Details Added!!' };
        }
    } catch (e) {

        console.log(e);
    }
}
const GetProject = (id) => {

    try {
        const find = schema.user.find({ _id: id, Status: true });
        if (find != null) {
            const result = schema.Project.find({ Email: find.Email }).select('Project');
            if (result != null) {
                return { status: 200, Data: result };
            } else {
                return { status: 422, message: 'Try again Later' };
            }
        } else {
            return { status: 404, message: 'No Details Added!!' };
        }
    } catch (e) {

        console.log(e);
    }
}
const GetSkillsList = async () => {

    try {
        const result = await schema.Skill.find().sort({ name: 1 });
        if (result != null) {
            return { status: 200, Data: result };
        } else {
            return { status: 404, message: 'No Details Added!!' };
        }
    } catch (e) {

        console.log(e);
    }
}
const GetBranch = async () => {

    try {
        const result = await schema.Branches.find().sort({ name: 1 });
        if (result != null) {
            return { status: 200, Data: result };
        } else {
            return { status: 404, message: 'No Details Added!!' };
        }
    } catch (e) {

        console.log(e);
    }
}
const GetSoftskill = async () => {

    try {
        const result = await schema.Softskill.find().sort({ name: 1 });
        if (result != null) {
            return { status: 200, Data: result };
        } else {
            return { status: 404, message: 'No Details Added!!' };
        }
    } catch (e) {

        console.log(e);
    }
}
const GetExam = async () => {

    try {
        const result = await schema.Exam.find().sort({ name: 1 });
        if (result != null) {
            return { status: 200, Data: result };
        } else {
            return { status: 404, message: 'No Details Added!!' };
        }
    } catch (e) {

        console.log(e);
    }
}
const GetExprience = (id) => {

    try {
        const find = schema.user.find({ _id: id, Status: true });
        if (find != null) {
            const result = schema.Experience.find({ Email: find.Email }).select('Company');
            if (result != null) {
                return { status: 200, Data: result };
            } else {
                return { status: 422, message: 'Try again Later' };
            }
        } else {
            return { status: 404, message: 'No Details Added!!' };
        }
    } catch (e) {

        console.log(e);
    }
}
module.exports = { GetAboutMe, GetExprience, GetHeaderSection, GetProject, GetSkills, GetSkillsList, GetBranch, GetSoftskill, GetExam };
