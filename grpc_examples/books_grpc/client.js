const grpc = require("@grpc/grpc-js");
var protoLoader = require("@grpc/proto-loader");
const PROTO_PATH = require("./books.proto");

const options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
};

var packageDefinition = protoLoader.loadSync(PROTO_PATH, options);

const BooksService = grpc.loadPackageDefinition(packageDefinition).BooksService;

const client = new BooksService(
  "localhost:50051",
  grpc.credentials.createInsecure()
);

module.exports = client;