# NodeJS Student Portal API

This is a Node.js-based API for managing a student portal. The API handles various functionalities such as student management, course management, and user progress tracking. The project is designed to enhance the educational experience, particularly in Africa.

## Technologies Used

- **Node.js**: Server-side JavaScript runtime
- **Express**: Web framework for Node.js
- **Sequelize**: ORM for Node.js to work with databases
- **PostgreSQL**: Database system
- **Supabase**: Backend-as-a-Service providing authentication and database management
- **Netlify**: Hosting platform for deploying the frontend

## Features

- **User Authentication**: Secure user authentication and authorization
- **Course Management**: Create, update, delete, and fetch courses
- **User Progress Tracking**: Track user progress through courses and quizzes
- **Quizzes**: Create and manage quizzes with questions and answers
- **Multimedia Support**: Handle video and PDF content for courses

## Installation

1. **Clone the repository**

    ```bash
    git clone https://github.com/yourusername/NodeJS-Student-Portal-API.git
    cd NodeJS-Student-Portal-API
    ```

2. **Install dependencies**

    ```bash
    npm install
    ```

3. **Setup environment variables**

    Create a `.env` file in the root directory and add your configuration:

    ```env
    PORT=3000
    DATABASE_URL=your_database_url
    SUPABASE_URL=your_supabase_url
    SUPABASE_KEY=your_supabase_key
    ```

4. **Run migrations**

    ```bash
    npx sequelize-cli db:migrate
    ```

5. **Start the server**

    ```bash
    npm start
    ```

## API Endpoints

### User Authentication

- **POST /api/register**: Register a new user
- **POST /api/login**: Login a user

### Courses

- **GET /api/courses**: Get all courses
- **POST /api/courses**: Create a new course
- **PUT /api/courses/:id**: Update a course
- **DELETE /api/courses/:id**: Delete a course

### User Progress

- **GET /api/progress**: Get user progress
- **POST /api/progress**: Update user progress

### Quizzes

- **GET /api/quizzes**: Get all quizzes
- **POST /api/quizzes**: Create a new quiz
- **PUT /api/quizzes/:id**: Update a quiz
- **DELETE /api/quizzes/:id**: Delete a quiz

## Contributing

1. **Fork the repository**
2. **Create a new branch**: `git checkout -b my-new-feature`
3. **Commit your changes**: `git commit -am 'Add some feature'`
4. **Push to the branch**: `git push origin my-new-feature`
5. **Submit a pull request**

## License

This project is licensed under the MIT License.

## Contact

For any questions or inquiries, please contact thisisyanndev@gmail.com(mailto:thisisyanndev@gmail.com).
