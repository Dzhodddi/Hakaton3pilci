# 3pilci [Zeroka.ai](http://13.60.54.251:5173)

Full-stack application for creating CV and helping to employ you!
## Technologies Used
* **Frontend**: React, TypeScript, CSS
* **Backend**: 
  * Java (handles profile and interview management)
  * Go (handles Google OAuth)
  * Python (handles prompts from the user)
* **Services/Tooling**:
* **Containerization**: Docker (Dockerfile, `docker-compose.yml`)
* **CI/CD**: GitHub Actions for CI/CD
* **Artifacts**: After a successful change on the main branch, images will be updated in [Docker Hub](https://hub.docker.com/repositories/dzhodi)
* **Prompts**: Generate your CV using LLMs even if you unauthorized

## Getting Started

### Installation & Running

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/Dzhodddi/Hakaton3pilci.git
    cd Hakaton3pilci
    ```

2.  **Run the application (using Docker):**
    The presence of a `docker-compose.yml` file suggests this is the intended way to run the project.
    ```sh
    docker-compose up --build
    ```

## Contributors

* [Dzhodddi](https://github.com/Dzhodddi)
* [appelsene](https://github.com/appelsene)
* [Heart-n-Core](https://github.com/Heart-n-Core)
