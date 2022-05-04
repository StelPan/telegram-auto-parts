const path = require("path");
const { worker } = require(path.resolve("models"));

async function updateWorker(worker) {
    let updateAttributes = {}
    if (this.email) {
        updateAttributes.email = this.email;
    }

    await worker.update(updateAttributes);

    return updateAttributes;
}

const UpdateProfileAction = async function (req, res) {
    try {
        const { user, body } = req;
        const currentWorker = await worker.findByPk(user.id);
        const updateParameters = await updateWorker.call(body, currentWorker);
        return res.status(200).json({
            type: "UPDATE_PROFILE",
            msg: "Profile updated successfully.",
            changed: updateParameters
        });
    } catch (e) {
        console.error(e);
    }
};

module.exports = {
    UpdateProfileAction
};