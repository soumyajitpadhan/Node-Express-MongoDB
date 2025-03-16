const express = require("express");
const upload = require("./config/multerconfig");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/profile", upload.single('image'), (req, res) => {
    console.log(req.file);
    res.json({ message: "File uploaded successfully", file: req.file });
})

app.listen(3000, () => {
    console.log("Server is running on port 3000");
})



// End-to-End File Upload Flow
// 📌 1️⃣ User submits a file via an HTML form
// The user selects a file (e.g., mypic.png) and clicks Upload.
// The browser prepares the file for sending.

// 📌 2️⃣ Browser encodes the file as binary and sends a POST request with multipart/form-data
// The file is split into two key parts:

// File Metadata
// original name: mypic.png
// type: image/png
// size: 54321 bytes

// File Content (Binary Data)
// The actual bytes of the file.

// 📌 3️⃣ Express receives the request and forwards it to Multer
// Express cannot process files directly.
// It passes the request to Multer, which handles file storage.

// 📌 4️⃣ Multer extracts binary content, renames the file, and saves it
// Multer reads the binary data and writes it to disk.
// It generates a random filename using crypto.randomBytes(12).
// If the original file was mypic.png, the new filename might be:
// a1b2c3d4e5f6.png
// The binary content remains unchanged, only the name changes.

// 📌 5️⃣ Multer removes the file from req.body and moves it to req.file
// The file is no longer in req.body.
// It is now available in req.file with metadata.

// 📌 6️⃣ Backend responds with success, returning the new filename
// The server sends a response:
// { "message": "File uploaded!", "filename": "a1b2c3d4e5f6.png" }

// 📌 7️⃣ The uploaded file’s binary data remains unchanged, only the name is different
// The actual content of the file is preserved.
// Only the filename is changed before being stored.

