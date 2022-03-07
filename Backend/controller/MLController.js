const tfnode = require("@tensorflow/tfjs-node");
const tf = require("@tensorflow/tfjs");
const fs = require("fs");
const jimp = require("jimp");
const { cos } = require("@tensorflow/tfjs");

function processImage(path) {
  const imageSize = 300;
  const imageBuffer = fs.readFileSync(path); // can also use the async readFile instead
  // get tensor out of the buffer
  image = tfnode.node.decodeImage(imageBuffer, 4); //(4 mtlab channel, 3 hota toh rgb k liye use krte lekin model rgba pe train hua toh toh 4
  // dtype to float
  image = image.cast("float32").div(255); // image ki pixel array ko float kiye n divide kr diye har pixel ko 255 se taaki - n 1 k beech value aa jaye ( pixel 0 se 255 hote)
  // resize the image
  image = tf.image.resizeBilinear(image, (size = [imageSize, imageSize])); // can also use tf.image.resizeNearestNeighbor
  image = image.expandDims(); // to add the most left axis of size 1

  return image; // shape (1,300,300,4) rehna chahiye
}

exports.predict = async (req, res) => {
  const newName = "tempImage.png";
  let imagePath = "./public/images/" + newName;
  console.log(res.file);
  jimp
    .read(`./${req.file.path}`)
    .then((lenna) => {
      return lenna.write(imagePath); // save
    })
    .catch((err) => {
      console.error(err);
    });
  console.log("hello");

  const model = await tf.loadLayersModel(
    "http://localhost:8888/public/MLModel/model.json"
  );

  const data = processImage(imagePath);

  // const imageTensor = tf.browser.fromPixels(data);
  const prediction = model.predict(data);

  const tensorArr = prediction.arraySync()[0];
  console.log(tensorArr);
  const maxMatchIdx = tensorArr.indexOf(Math.max(...tensorArr));
  // console.log({ index: maxMatch });
  const labels = [
    "Bangus",
    "Barramundi",
    "Indian Anchovy",
    "Indian Mackerel",
    "Indian Salmon",
    "Katla Fish",
    "Mahseer-tor tor",
    "Mangrove Red Snapper",
    "Pomfret",
    "Rohu",
    "Tarali",
    "Tuna Fish",
  ];

  res.status(200).json({
    data: {
      name: labels[maxMatchIdx],
    },
  });
};
