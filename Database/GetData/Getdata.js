const schema = require('../Schema');

const GetHeaderSection = (id) => {

    try {
        const find = schema.user.find({ _id: id, Status: true });
        if (find != null) {
            const result = schema.BasicInfo.find({ Email: find.Email }).select('-Skills');
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
const GetSkills = (id) => {

    try {
        const find = schema.user.find({ _id: id, Status: true });
        if (find != null) {
            const result = schema.BasicInfo.find({ Email: find.Email }).select('Skills');
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
module.exports = { GetAboutMe, GetExprience, GetHeaderSection, GetProject, GetSkills };
