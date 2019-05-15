import axios from "axios";

export const userController = {};

let usersDb = {};

userController.getUsers = async (_, res) => {
  for (let i = 0; i < 10; i++) {
    const { data } = await axios.get("https://randomuser.me/api");

    let temp = data.results[0];
    usersDb[temp.name.first] = {
      gender: temp.gender,
      fisrtname: temp.name.first,
      city: temp.location.city,
      email: temp.email,
      cell: temp.cell
    };
  }
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(usersDb));
};
userController.createUser = (req, res) => {
  const user = req.body;

  if (
    !user.firstname ||
    !user.gender ||
    !user.city ||
    !user.email ||
    !user.cell
  ) {
    res.status(400).send("user Parametes are not correct");
    res.end();
  } else {
    usersDb[user.firstname] = user;
    console.log(usersDb);
    res.status(201).send({ message: "User successfully created!" });
  }
};
userController.findUser = (req, res) => {
  const fName = req.params.firstname;
  if (usersDb[fName]) {
    res.send(usersDb[fName]);
  } else {
    res.status(404).send({ message: "User not found! " });
  }
};
