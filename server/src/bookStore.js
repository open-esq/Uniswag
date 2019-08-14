const admin = require("firebase-admin");
require('now-env')

const firebase = admin.initializeApp({
  credential: admin.credential.cert({
    private_key: process.env.FIREBASE_PRIVATE_KEY,
    client_email: process.env.FIREBASE_CLIENT_EMAIL
  }),
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET
});

const ref = firebase.database().ref("books6");
const bucket = firebase.storage().bucket();

const getBook = async bookId => {
  const bookRef = await ref
    .orderByChild("bookId")
    .equalTo(bookId)
    .once("value");

  if (bookRef.val()) {
    const id = Object.keys(bookRef.val())[0];
    const book = bookRef.val()[id];

    return book;
  }
  return false;
};

const addBook = async ({ bookId, bookTitle, secret }) => {
  // check if the book already exists. if so, exit
  const bookRef = await ref
    .orderByChild("bookId")
    .equalTo(bookId)
    .once("value");
  const bookExists = Boolean(bookRef.val());
  console.log("bookExists:", bookExists);
  if (bookExists) return false;

  const book = {
    bookId,
    bookTitle,
    secret
  };

  const newBook = await ref.push(book);
  // this is the automatically generated id that will be used as the identifier in GCS
  const id = newBook.path.pieces_[1];
  console.log(id);

  const update = {[id]: {...book, secret: id}}
  console.log("update", update)

  const res = await ref.update(update)

  return id;
};

const getSignedUrl = async (storageId) => {
  // creates a placeholder file in the bucket for the front-end upload
  const bucketFile = bucket.file('pdf/'+ storageId);

  const bookConfig = {
    action: "write",
    expires: Date.now() + 10000,
    contentType: "application/pdf"
  };
  
  const bucketImage = bucket.file('image/' + storageId);
  const imageConfig = {
    action: "write",
    expires: Date.now() + 10000,
    contentType: "image/jpeg"
  }

  const bookSignedUrl = await bucketFile.getSignedUrl(bookConfig);
  const imageSignedUrl = await bucketImage.getSignedUrl(imageConfig)
  return {bookSignedUrl, imageSignedUrl};
}

const retrieveBookURL = async (secret) => {
  const bucketFile = bucket.file('pdf/' + secret);
  const config = {
    action: "read",
    expires: Date.now() + 10000
  };

  const signedUrl = await bucketFile.getSignedUrl(config);
  return signedUrl;
}

const retrieveImageURL = async (secret) => {
  const bucketFile = bucket.file('image/' + secret);
  const exists = await bucketFile.exists()
  console.log(exists[0])
  if(exists[0]){
    const config = {
      action: "read",
      expires: Date.now() + 10000
    };
    const signedUrl = await bucketFile.getSignedUrl(config);
    return signedUrl;
  } else {
    return null;
  }
}


module.exports = { addBook, getBook, getSignedUrl, retrieveBookURL, retrieveImageURL };
