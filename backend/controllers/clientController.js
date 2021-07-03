const express = require("express");
var router = express.Router();
var clientController = require("mongoose").Types.ObjectId;

var { Client } = require("../models/client");
const { v4: uuidv4 } = require("uuid");

// get method for all clients
router.get("/getClients", (req, res) => {
    Client.find((err, docs) => {
        if (!err) {
            res.send(docs);
        } else {
            console.log(
                `Error retrieving Clients : ${JSON.stringify(err, undefined, 2)}`
            );
        }
    });
});

// get method for specific client
router.get("/getClient/:id", (req, res) => {
    if (!clientController.isValid(req.params.id)) {
        return res.status(400).send(`No customer found for id : ${req.params.id} `);
    }
    Client.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.send(doc);
        } else {
            console.log(
                `Error in retrieving customer : ${JSON.stringify(err, undefined, 2)}`
            );
        }
    });
});

// post method to add new client
router.post("/addNewClient", (req, res) => {
    var newClient = new Client({
        fullName: req.body.fullName,
        phone: req.body.phone,
        email: req.body.email,
        userPass: req.body.userPass,
        status: req.body.status
    });
    newClient.save((err, doc) => {
        if (!err) {
            res.send(doc);
        } else {
            console.log(
                `Error in adding customer : ${JSON.stringify(err, undefined, 2)}`
            );
        }
    });
});

// put method to update client
router.put("/updateClient/:id", (req, res) => {
    if (!clientController.isValid(req.params.id)) {
        res.status(400).send(`No customer found for id : ${req.params.id}`);
    } else {
        var newClient = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phone: req.body.phone,
            email: req.body.email,
            gender: req.body.gender,
            userPass: req.body.userPass
        };

        Client.findByIdAndUpdate(
            req.params.id, { $set: newClient }, { new: true },
            (err, doc) => {
                if (!err) {
                    res.send(doc);
                } else {
                    console.log(
                        `Error updating customer : ${JSON.stringify(err, undefined, 2)}`
                    );
                }
            }
        );
    }
});

// delete method to remove client from database
router.delete("/deleteClient/:id", (req, res) => {
    if (!clientController.isValid(req.params.id)) {
        res.status(400).send(`No customer with id : ${req.params.id}`);
    } else {
        Client.findByIdAndDelete(req.params.id, (err, doc) => {
            if (!err) {
                res.send(doc);
            } else {
                console.log(
                    `Error in deleting customer : ${JSON.stringify(err, undefined, 2)}`
                );
            }
        });
    }
});

// put method to update client status
router.put("/login", (req, res) => {
    let student = req.body[0].singleClient;
    let allClients = req.body[1].allClients;
    if (allClients.length) {
        for (let i = 0; i < allClients.length; i++) {
            if (
                student.email.toLowerCase() == allClients[i].email.toLowerCase() &&
                student.userPass == allClients[i].userPass
            ) {
                student = allClients[i];
            }
        }
    }
    if (!clientController.isValid(student._id)) {
        console.log(student);
        res.send(student);
    } else {
        var newStatus = {
            isActive: true,
        };

        Client.findByIdAndUpdate(
            student._id, { $set: newStatus }, { new: true },
            (err, doc) => {
                if (!err) {
                    res.send(doc);
                } else {
                    console.log(
                        `Error updating Client : ${JSON.stringify(err, undefined, 2)}`
                    );
                }
            }
        );
    }
});

// delete method to update client status in database
router.put("/logout", (req, res) => {
    let student = req.body[0].singleClient;
    let allClients = req.body[1].allClients;
    if (allClients.length && student) {
        for (let i = 0; i < allClients.length; i++) {
            if (
                student.email == allClients[i].email &&
                student.userPass == allClients[i].userPass
            ) {
                student = allClients[i];
            }
            break;
        }
    }
    if (!clientController.isValid(student._id)) {
        console.log(student);
        res.send(student);
        // res.status(400).send();
        return false;
    } else {
        var newStatus = {
            isActive: false,
        };
        Client.findByIdAndUpdate(
            student._id, { $set: newStatus }, { new: true },
            (err, doc) => {
                if (!err) {
                    res.send(doc);
                } else {
                    console.log(
                        `Error updating Client : ${JSON.stringify(err, undefined, 2)}`
                    );
                }
            }
        );
    }
});

// Add new student post
router.put("/addNewPost", (req, res) => {
    let student = req.body[0];
    let allClients = req.body[1];
    let post = req.body[2];

    if (allClients.length && student) {
        for (let i = 0; i < allClients.length; i++) {
            if (student.email == allClients[i].email) {
                student = allClients[i];
            }
            break;
        }
        const postId = uuidv4();
        post.id = postId;
        student.posts.push(post);
        console.log(student.posts);
        var newStatus = {
            posts: student.posts,
        };
        Client.findByIdAndUpdate(
            student._id, { $set: newStatus }, { new: true },
            (err, doc) => {
                if (!err) {
                    res.send(doc);
                } else {
                    console.log(
                        `Error adding post : ${JSON.stringify(err, undefined, 2)}`
                    );
                }
            }
        );
    }
    if (!clientController.isValid(student._id)) {
        console.log(student);
        res.send("No student with given id");
        // res.status(400).send();
        return false;
    }
});

// delete post
router.put("/deletePost", (req, res) => {
    let student = req.body[0];
    let allClients = req.body[1];
    let posts;
    let post = req.body[2];
    let index;
    for (let i = 0; i < allClients.length; i++) {
        for (let j = 0; j < allClients[i].posts.length; j++) {
            var found = false;
            if (post.id == allClients[i].posts[j].id) {
                found = true;
                console.log(true);
                index = allClients[i].posts.indexOf(allClients[i].posts[j]);
                posts = allClients[i].posts;
                posts.splice(index, 1);
                break;
            }
        }
        if (!found) {
            console.log(false);
        }
    }
    var newPosts = {
        posts: posts
    };
    Client.findByIdAndUpdate(
        student._id, { $set: newPosts }, { new: true },
        (err, doc) => {
            if (!err) {
                res.send(doc);
            } else {
                console.log(
                    `Error updating Client : ${JSON.stringify(err, undefined, 2)}`
                );
            }
            if (!clientController.isValid(student._id)) {
                console.log(student);
                res.send(student);
                // res.status(400).send();
                return false;
            }
        });
});
// }
// if (allClients.length && student) {
//   posts = allClients[i]
//   for (let i = 0; i < allClients.length; i++) {
//     if (
//       post.id == allClients[i].posts[i].id
//     ) {
//       post = allClients[i].posts[i];
//       delete post;
//     break;
//     }else{
//       post = "NOt found";
//       console.log(post);
//     }
//   }
//   console.log(student.posts);
//   var newPosts = {
//     posts: student.posts,
//   };
//   Client.findByIdAndUpdate(
//     student._id,
//     { $set: newPosts },
//     { new: true },
//     (err, doc) => {
//       if (!err) {
//         res.send(doc);
//       } else {
//         console.log(
//           `Error updating Client : ${JSON.stringify(err, undefined, 2)}`
//         );
//       }
//     }
//   );
// }

module.exports = router;