const axios = require("axios");

module.exports = async (req, res) => {
  // Form validation
  if (
    !req.body.email ||
    !req.body.password ||
    req.body.password !== req.body.confirmPassword
  ) {
    res.redirect("/auth/register");
    return;
  }

  const mutation = `
    mutation register($email: String!, $password: String!, $username: String!) { 
      register(email: $email, password: $password, username: $username) 
    }
  `;
  try {
    const response = await axios.post(
      process.env.GRAPHQL_ENDPOINT,
      {
        query: mutation,
        variables: {
          email: req.body.email,
          password: req.body.password,
          username: req.body.username,
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    res.cookie("JWT", response.data.data.register, {
      maxAge: 900000,
      httpOnly: true,
    });
    res.redirect("/");
  } catch (err) {
    res.redirect("/auth/login");
  }
};
