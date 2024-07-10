
exports.imageFilePath = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded or invalid file type" });
    }
    let imagePath = req?.file?.path
    return res.status(201).json({ imagePath, ok: true, message: 'susccess', status: 201 })
}