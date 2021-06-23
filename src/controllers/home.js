const ctrl = {};

const { Image } = require('../models');

const sidebar = require('../helpers/sidebar');

ctrl.index = async (req, res) => {
    const images = await Image.find().sort({ timestamp: -1 });
    let viewModel = { images: [] };
    viewModel.images = images;
    viewModel = await sidebar(viewModel);
    console.log(viewModel.images)
    console.log(viewModel.images[0]);
    console.log(typeof viewModel.images);
    console.log(viewModel.images.constructor);
    console.log(Array.isArray(viewModel.images));
    res.render("index", viewModel);
};



module.exports = ctrl;