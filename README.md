## Task Tracker API

## Installation

1. Clone the repository: `git clone https://github.com/abhishekbadole8/NewTral.io_assignment_be`
2. Navigate to the project directory: `cd project-directory`
3. Install dependencies: `npm install`
4. Start the server: `npm start`

API will be available at `http://localhost:5000`.

## Endpoints

### User API

- **Register User:** POST `/api/user/register`

- **Login User:** POST `/api/user/login`


### Tasks API

- **Get Tasks:** GET `/api/tasks`
- **Auth Required:** Yes

- **Create Task:** POST `/api/tasks/add`
- **Auth Required:** Yes

- **Update Task:**  PATCH `/api/tasks/update/:id`
- **Auth Required:** Yes

- **Delete Task:** DELETE `/api/tasks/delete/:id`
- **Auth Required:** Yes


## Authentication

Include an authentication token in the request headers for all routes.

Include token in headers for all routes.

Example:

    {
        "headers":{
            "Authorization": `Bearer ${your-auth-token}`
        }
    }