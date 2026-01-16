const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Chat = require("./models/chat.js");
const path = require("path");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));


main().then(() => {
    console.log("connection is successfull");
}).catch((err) => {
    console.log(err);
})
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
};
// index route
app.get("/chats", async (req, res) => {
    let chats = await Chat.find();

    res.render("index", { chats });

});

// NEW ROUTE
app.get("/chats/new", async (req, res) => {
    res.render("new");

});

// Create route
app.post("/chats", (req, res) => {
    let { from, to, msg } = req.body;

    let newChat = new Chat({
        from: from,
        to: to,
        msg: msg,
        created_at: new Date()
    });
    newChat.save()
        .then((result) => {
            console.log("Chat was saved");
            res.redirect("/chats");
        })
        .catch((err) => {
            console.log(err);
            res.send("Error occurred");
        });
});


app.get("/", (req, res) => {
    res.send("root is working fine bro")
});
app.listen(8080, () => {
    console.log("server is listening to port 8080 ");
});