const schema = require('./Schema');// Import your Mongoose model
const CreatePipeline = () => {
    schema.Experience.aggregate([
        {
            $group: {
                _id: "$CName",
                count: { $sum: 1 }
            }
        },
        {
            $out: "company_statistics"
        }
    ])
        .then(result => {
            console.log(result);
        })
        .catch(error => {
            console.error(error);
        });
}
module.exports = { CreatePipeline };