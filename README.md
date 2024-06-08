# Docify

[![Build Status](https://img.shields.io/github/actions/workflow/status/Yashasv-Prajapati/docify/build.yml)](https://github.com/Yashasv-Prajapati/docify/actions)
[![GitHub stars](https://img.shields.io/github/stars/Yashasv-Prajapati/docify)](https://github.com/Yashasv-Prajapati/docify/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/Yashasv-Prajapati/docify)](https://github.com/yourusername/docify/network)

Docify simplifies the process of generating essential project documentation such as UML diagrams, code coverage reports, generic READMEs, test plans, and lists of external dependencies. Connect your GitHub account, import your repositories, and start generating the documentation you need with ease.

## Features

- **UML Diagrams**: Automatically generate UML diagrams for your project.
- **Code Coverage Reports**: Create detailed code coverage reports.
- **Generic README**: Generate a standard README file for your project.
- **Test Plan**: Create comprehensive test plans.
- **External Dependencies**: List and manage external dependencies used in your project.
- **Automation**: Automates the process of generating documentation.
- **GitHub Integration**: Generated documentation is directly pushed to a new branch on the user's GitHub repository.



## Technologies Used

- **Next.js**: React framework for building the user interface.
- **Prisma**: ORM for database management with SQLite.
- **SQLite**: Lightweight database.
- **Docker**: Containerization for easy deployment.
- **FastAPI**: High-performance backend API.

## Supported Languages

Currently, Docify supports projects written in **Java** and **Python**. We aim to expand support to more languages in future.


## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/)
- [Docker](https://www.docker.com/)
- [Git](https://git-scm.com/)

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/docify.git
    cd docify
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

3. Set up environment variables:

    Create a `.env` file in the `client` directory and add the credentials from `.env.example`.

    Next you need to get credentials for Google PALM API and add the client_secret*.json(rename it to client_secret.json) file in the `llm-api` directory.

4. Run database migrations:
    ```bash
    npx prisma migrate dev
    ```

5. Start the development server:
    ```bash
    npm run dev
    ```

6. Build and run the Docker container:
    There are several dockerfiles in the repository. You can use the `Dokerfile_all_java` and `Dockerfile_all_py` one in the `docker/dockerfiles` directory to build and run the container.

    ```bash
    docker build -f docker/dockerfiles/Dockerfile_all_java -t docify_java .
    docker build -f docker/dockerfiles/Dockerfile_all_py -t docify_python .
    docker run -p 3000:3000 docify_java  # For Java support
    docker run -p 3000:3000 docify_python  # For Python support
    ```
7. Running Fast API server for LLM
    Go to the `llm-api` directory and run the following commands.

    - To Install FastAPI and Uvicorn
    ```
    pip install fastapi uvicorn
    ```
    - To run the server
    
    ```
    uvicorn main:app --reload
    ```

### Usage

1. Open your browser and go to `http://localhost:3000`.
2. Connect your GitHub account by authorizing and installing the github app.
3. Import your repository.
4. Select the documentation you want to generate.


## Contributing

We welcome contributions! Please contact any of the maintainers or open an issue to discuss the changes you would like to make.

## Acknowledgements

- Thanks to the developers of Next.js, Prisma, FastAPI, Docker, and SQLite for providing the great tools and frameworks that make this project possible. 
- Thanks to all the maintainers, contributors, and supporters of this project. This project would not be possible without your help. The team effort is greatly appreciated.
