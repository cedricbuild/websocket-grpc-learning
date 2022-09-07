const grpc = require("@grpc/grpc-js");
const PROTO_PATH = require("./books.proto");
var protoLoader = require("@grpc/proto-loader");

const options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
};
var packageDefinition = protoLoader.loadSync(PROTO_PATH, options);
const booksProto = grpc.loadPackageDefinition(packageDefinition);

const server = new grpc.Server();
let books = [
  { id: "1", title: "Note 1", author: "Content 1", pages: 324 },
  { id: "2", title: "Note 2", author: "Content 2", pages: 192 },
];

server.addService(booksProto.BooksService.service, {
  getAllBooks: (_, callback) => {
    callback(null, books);
  },
  AddBook: (call, callback) => {
    const _book = { id: Date.now(), ...call.request };
    books.push(_book);
    callback(null, _book);
  },
  DeleteBook: (_, callback) => {
    const bookId = _.request.id;
    books = books.filter(({ id }) => id !== bookId);
    callback(null, {});
  },
  EditBook: (_, callback) => {
    const bookId = _.request.id;
    const bookItem = books.find(({ id }) => bookId == id);
    bookItem.title = _.request.title;
    bookItem.author = _.request.author;
    bookItem.pages = _.request.pages;
    callback(null, bookItem);
  },
  GetBook: (_, callback) => {
    const bookId = _.request.id;
    const bookItem = books.find(({ id }) => bookId == id);
    callback(null, bookItem);
  },
});

server.bindAsync(
  "127.0.0.1:50051",
  grpc.ServerCredentials.createInsecure(),
  (error, port) => {
    console.log("Server running at http://127.0.0.1:50051");
    server.start();
  }
);
