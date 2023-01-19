const AWS = require("aws-sdk");
const fs = require("fs");
const path = require("path");
const rootFolderName = process.env.BUILD_DIRECTORY || "build";
// configuration
const config = {
  s3BucketName: process.env.BUCKET_NAME,
  folderPath: `./${rootFolderName}`, // path relative script's location
};

// initialize S3 client
const s3Config = {
  signatureVersion: "v4",
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
};
const s3 = new AWS.S3(s3Config);

//remove this log in production
// Github show  **** instead of your keys(some privacy things), so //don't panic if you see your password like that
console.log("s3 config ", s3Config);
// resolve full folder path
const distFolderPath = path.join(__dirname, config.folderPath);

uploadDirectoryFiles(distFolderPath);

function uploadDirectoryFiles(distFolderPath) {
  const files = fs.readdirSync(distFolderPath);
  if (!files || files.length === 0) {
    console.log(
      `provided folder '${distFolderPath}' is empty or does not exist.`
    );
    return;
  }
  for (const fileName of files) {
    // get the full path of the file
    const filePath = path.join(distFolderPath, fileName);
    // If it was directory recursively call this function again
    if (fs.lstatSync(filePath).isDirectory()) {
      uploadDirectoryFiles(filePath);
      continue;
    }
    uploadFile(filePath, fileName);
  }
}

function uploadFile(filePath, fileName) {
  const relativeFilePath = `${__dirname}/${rootFolderName}/`;
  const fileKey = filePath.replace(relativeFilePath, "");
  console.log({ fileName, filePath, fileKey });
  const fileContent = fs.readFileSync(filePath);
  // upload file to S3
  s3.putObject(
    {
      Bucket: config.s3BucketName,
      Key: fileKey,
      Body: fileContent,
      ContentType: getMimeType(path.extname(fileName)),
    },
    (err, res) => {
      if (err) {
        return console.log("Error uploading file ", err);
      }
      console.log(`Successfully uploaded '${fileKey}'!`, { res });
    }
  );
}

function getMimeType(ext) {
  switch (ext) {
    case ".js":
      return "application/javascript";
    case ".html":
      return "text/html";
    case ".txt":
      return "text/plain";
    case ".json":
      return "application/json";
    case ".ico":
      return "image/x-icon";
    case ".svg":
      return "image/svg+xml";
    case ".css":
      return "text/css";
    case ".jpg":
    case ".jpeg":
      return "image/jpeg";
    case ".png":
      return "image/png";
    case ".webp":
      return "image/webp";
    case ".gif":
      return "image/gif";
    case ".map":
      return "binary/octet-stream";
    default:
      return "application/octet-stream";
  }
}
