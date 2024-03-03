const Schema = require('../Database/Schema');
const ExcelJS = require('exceljs');

// Set to store unique identifiers for data in Excel file

// Function to update Excel file with MongoDB data
const UpdateExcelFileBasicinfo = async () => {
    try {
        // Create a new workbook
        const workbook = new ExcelJS.Workbook();

        // Fetch data from MongoDB
        const users = await Schema.BasicInfo.find({});

        // Add a worksheet for Basic info
        const basicWorksheet = workbook.addWorksheet('Basic');

        // Format data for Basic info worksheet
        const basicData = users.map(user => [
            user.Email,
            user.Name,
            user.Description,
            user.Role,
            user.Aboutme,
            user.Status,
            user.Branch,
            user.CGPA,
        ]);

        // Add column labels as the first row in the Basic info worksheet
        basicWorksheet.addRow([
            'Email',
            'Name',
            'Description',
            'Role',
            'Aboutme',
            'Status',
            'Branch',
            'CGPA',
        ]);

        // Add data to the Basic info worksheet
        basicWorksheet.addRows(basicData);
        await workbook.xlsx.writeFile('Basic.xlsx');

        console.log('Excel file updated successfully.');
    } catch (error) {
        console.error('Error updating Excel file:', error);
    }
};
const UpdateExcelFileSkills = async () => {
    try {
        const workbook = new ExcelJS.Workbook();

        const users = await Schema.BasicInfo.find({});
        const basicWorksheet = workbook.addWorksheet('Skills');
        var SkillsData = [];
        var i = 0;
        users.forEach(user => {
            if (user && user.Skills && Array.isArray(user.Skills)) {
                user.Skills.forEach(softSkill => {
                    SkillsData.push([i, user.Email, softSkill]);
                    i++;
                });
            }
        });
        basicWorksheet.addRow([
            'id',
            'Email',
            'Skills',
        ]);

        // Add data to the Basic info worksheet
        basicWorksheet.addRows(SkillsData);
        await workbook.xlsx.writeFile('Skills.xlsx');

        console.log('Excel file updated successfully.');
    } catch (error) {
        console.error('Error updating Excel file:', error);
    }
};
const UpdateExcelFileSoftSkills = async () => {
    try {
        // Create a new workbook
        const workbook = new ExcelJS.Workbook();

        // Fetch data from MongoDB
        const users = await Schema.BasicInfo.find({});

        // Add a worksheet for Basic info
        const basicWorksheet = workbook.addWorksheet('SoftSkills');

        // Format data for Basic info worksheet
        var softSkillsData = [];
        var i = 0;
        users.forEach(user => {
            // Check if user is defined and has the SoftSkills property
            if (user && user.Softskill && Array.isArray(user.Softskill)) {
                user.Softskill.forEach(softSkill => {
                    softSkillsData.push([i, user.Email, softSkill]);
                    i++;
                });
            }
        });

        // Add column labels as the first row in the Basic info worksheet
        basicWorksheet.addRow([
            'id',
            'Email',
            'SoftSkills',
        ]);

        // Add data to the Basic info worksheet
        basicWorksheet.addRows(softSkillsData);
        await workbook.xlsx.writeFile('SoftSkills.xlsx');

        console.log('Excel file updated successfully.');
    } catch (error) {
        console.error('Error updating Excel file:', error);
    }
};


const UpdateExcelFileExprience = async () => {
    const uniqueIdentifiers = new Set();
    try {
        // Create a new workbook
        const workbook = new ExcelJS.Workbook();

        // Add a worksheet
        const worksheet = workbook.addWorksheet('Exprience');

        // Fetch data from MongoDB
        const users = await Schema.Experience.find({});

        // Format data for Excel
        const data = users.map(user => [
            user._id,
            user.Email,
            user.id,
            user.CName,
            user.Description,
            user.DurationEnd,
            user.DurationStart,
            user.Role
        ]);


        // Add data to the worksheet
        worksheet.addRow([
            'id',
            'Email',
            'Company',
            'ExpNo',
            'Description',
            'Start Date',
            'End Date',
            'Role',
        ]);
        worksheet.addRows(data);

        // Check for and skip duplicates
        const uniqueData = data.filter(row => {
            const identifier = row.join('_');
            if (!uniqueIdentifiers.has(identifier)) {
                uniqueIdentifiers.add(identifier);
                return true;
            }
            return false;
        });
        // Save the workbook to a file
        await workbook.xlsx.writeFile('Exprience.xlsx');

        console.log('Excel file updated successfully.');
    } catch (error) {
        console.error('Error updating Excel file:', error);
    }
};
const UpdateExcelFileExams = async () => {
    const uniqueIdentifiers = new Set();
    try {
        // Create a new workbook
        const workbook = new ExcelJS.Workbook();

        // Add a worksheet
        const worksheet = workbook.addWorksheet('Exam');

        // Fetch data from MongoDB
        const users = await Schema.ExamS.find({});
        const examNames = [...new Set(users.map(user => user.Name))];
        // Format data for Excel
        const data = users.map(user => [
            user._id,
            user.Email,
            user.Score,
        ]);


        // Add data to the worksheet
        worksheet.addRow([
            'id',
            'Email',
            ...examNames
        ]);
        worksheet.addRows(data);

        // Check for and skip duplicates
        const uniqueData = data.filter(row => {
            const identifier = row.join('_');
            if (!uniqueIdentifiers.has(identifier)) {
                uniqueIdentifiers.add(identifier);
                return true;
            }
            return false;
        });
        // Save the workbook to a file
        await workbook.xlsx.writeFile('Exams.xlsx');

        console.log('Excel file updated successfully.');
    } catch (error) {
        console.error('Error updating Excel file:', error);
    }
};
module.exports = { UpdateExcelFileBasicinfo, UpdateExcelFileExprience, UpdateExcelFileSkills, UpdateExcelFileSoftSkills, UpdateExcelFileExams };
