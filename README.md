# SWIFT Chat App Backend

This respository contains the backend code for the SWIFT Chat App, a real-time chat application built using Node.js, MongoDB, Express and Socket.io.

## Demo

You can view a live demo of the SWIFT Chat App Backend at [https://swift-chat-app-api.onrender.com](https://swift-chat-app-api.onrender.com)

## features

- User authentication and authorization
- Real-time chat functionality using Socket.io
- MongoDB integration for storing chat messages and user information

## Installation

To run the backend server locally, follow these steps:

1. Clone the repository to your local machine
2. Install the required dependencies by running `npm install`
3. Create a `.env` file in the root directory of the project and add the following environment variables:

```makefile
PORT=3001
MONGODB_URI=<your MongoDb connection string>
ORIGIN =<your published frontend connection string>
```

4. Start the server by running `npm start`

## API Endpoints

The following API endpoints are available:

<table>
  <thead>
    <tr>
      <th>Endpoint</th>
      <th>Method</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>'/api/auth/add-user'</td>
      <td>POST</td>
      <td>Register a new user</td>
    </tr>
    <tr>
      <td>'/api/auth/login-user'</td>
      <td>POST</td>
      <td>Authenticate a user</td>
    </tr>
    <tr>
      <td>'/api/auth/all-users/:id'</td>
      <td>GET</td>
      <td>Get all users by ID except the user with the ID param</td>
    </tr>
    <tr>
      <td>'/api/auth/get-user/:id'</td>
      <td>GET</td>
      <td>Get user details by ID</td>
    </tr>
    <tr>
      <td>'/setavatar/:id'</td>
      <td>POST</td>
      <td>Adds the user profile picture </td>
    </tr>
    <tr>
      <td>'/api/auth/message/recieve'</td>
      <td>POST</td>
      <td>Get all chat messages</td>
    </tr>
    <tr>
      <td>'/api/auth/message/getmsg'</td>
      <td>POST</td>
      <td>Add a new chat message</td>
    </tr>
  </tbody>
</table>

## Deployment

The backend server can be easily deployed to a cloud hosting playform such as Heroky or AWS. Simply create a new instance, set the necessary environment variables, and deploy the code to the platform.

## License

This project is licensed under the [MIT License](http://opensource.org/licences/MIT)

## Contact

For any questions or feedback, please contact the project owner at [otunbamarcusademola@gmail.com](mailto:otunbamarcusademola@gmail.com)

## Acknowledgements

- This project was inspired by the growing need for real-time chat applications in the curren digital age.
