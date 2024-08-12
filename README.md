# Load Monitoring App

## Description
 This web app provides real-time monitoring of CPU and memory utilization across multiple PCs. Utilizing Socket.io, each connected device continuously streams performance data to the central backend, enabling comprehensive oversight of system health. Ideal for IT administrators and system engineers, it helps in proactive management, performance optimization, and troubleshooting.
 

![Animated Diagram](https://iili.io/J6f5v6J.gif)

[Watch the video](https://github.com/user-attachments/assets/2b8d9c34-9c22-4ab5-aeca-d35580eb8a5a)

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Frontend Technologies Used](#frontend-technologies-used)
- [Backend Technologies Used](#backend-technologies-used)
- [Contact](#contact)

## Installation
To install the Load Monitoring App, follow these steps:

1. Clone the repository:
    ```bash
    git clone git@github.com:isamir909/load-monitoring.git
    ```

2. Navigate to the project directory:
    ```bash
    cd load-monitoring
    ```

3. Install and start each component:
### Server
    ```bash
    cd server
    pnpm install
    pnpm build
    pnpm start
    ```

### Node Client
    ```bash
    cd nodeClient
    pnpm install
    pnpm build
    pnpm start
    ```

### Next.js Client
    ```bash
    cd nextClient
    pnpm install
    pnpm build
    pnpm start
    ```

## Usage
To run the app, ensure all components (Server, Node Client, and Next.js Client) are started as described above.and before that Create the .env file from the given sample env.

## Features
- Real-time monitoring of CPU load and memory usage
- Processor information, including type, total memory, number of cores, and clock speed
- Live status of machine online/offline

## Frontend Technologies Used
- `Next.js`
- `Tailwind CSS`
- `socket.io-client`
- `typescript`

## Backend Technologies Used
- `Node.js`
- `Express.js`
- `socket.io`
- `MongoDB`

## Contact
- ##### Email: samirlohiya909@gmail.com
- ##### Website: https://samirlohiya.netlify.app/ 
