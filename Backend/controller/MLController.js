const tfnode = require("@tensorflow/tfjs-node");
const tf = require("@tensorflow/tfjs");
const fs = require("fs");

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
  console.log(image.shape);
  return image.shape; // shape (1,300,300,4) rehna chahiye
}

exports.predict = (req, res) => {
  const data = processImage(req.file.path);
  res.status(200).json({
    data: req.file,
  });
};
