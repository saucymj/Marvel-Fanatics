const { User } = require('../models');

const userData = [
    {
        username: "bob233",
        email: "bo_b@gmail.com",
        password: "p@ssword1"
    },
    {
        username: "brett-p",
        email: "brett@gmail.com",
        password: "1234"
    },
    {
        username: "shaun",
        email: "shaun_c@gmail.com",
        password: "5678"
    },
    {
        username: "wunna",
        email: "wunna@gmail.com",
        password: "p@ssword2"
    },
    {
        username: "skip-b",
        email: "skip_b@gmail.com",
        password: "lebron"
    },
    {
        username: "kawhi",
        email: "loadmanagement@gmail.com",
        password: "spurs"
    }
]

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;