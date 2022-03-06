const userModel = require('../model/userModel');

module.exports.getUser = async function getUsers(req, res) {
    let id = req.id;
    let user = await userModel.findById(id);
    if (user) {
        return res.json(user);
    }
    else {
        return res.json({
            message: "user not found"
        });
    }
};

module.exports.updateUser = async function updateUser(req, res) {
    try {
        let id = req.params.id;
        console.log(id);
        let user = await userModel.findById(id);
        console.log(user);
        let dataToBeUpdated = req.body;
        console.log(dataToBeUpdated);
        if (user) {
            const keys = [];
            for (let key in dataToBeUpdated) {
                keys.push(key);
            }
            console.log(keys);
            for (let i = 0; i < keys.length; i++) {
                user[keys[i]] = dataToBeUpdated[keys[i]];
            }
            console.log(user);
            const updatedData=await user.save();
            return res.json({
                message: "data updated successfully",
                data: user
            });
        }
        else {
            return res.json({
                message: "user not found"
            })
        }
    }
    catch (err) {
        message: err.message
    }
};

module.exports.deleteUser = async function deleteUser(req, res) {
    try {
        let id = req.params.id;
        let user = await userModel.findByIdAndDelete(id);
        if (!user) {
            res.json({
                message: "user not found"
            })
        }
        res.json({
            message: "data deleted successfully",
            data: user
        });
    }
    catch (err) {
        res.json({
            message: err.message
        })
    }
};

module.exports.updateProfileImage=function updateProfileImage(req,res){
    res.json({
        message:"file updated successfully"
    })
}