# Simulation Designer Framework

## Table of Contents
- [About](#about)
- [Installation](#installation)
- [Main Features](#main-features)
- [Documentation](#documentation)
- [RAPID Frameworks](#rapid-frameworks)
## About
The Simulation Designer Framework allows users to create streams in a no-code, node based way. The user can implement logic such as creating variables and events in order to create their output node.

- Connects with other [RAPID Frameworks](#rapid-frameworks)

## Installation
This project requires Node.js. Git must be installed in order for cloning to work.
1. Download or clone the project. To clone to project, run `git clone https://github.com/Rapid-Project-SRI/Simulation-Designer`. 
2. Run `npm i` to download all dependencies.
3. Run `npm run dev` to run the project on your local host.

## Main Features
**Node Library**<br>
The Node library features 6 nodes that allow the user to create the stream that they want. The user can drag and drop these nodes into the workspace and create their streams.
![Node Library](/readme_images/nodelibrary.png)

**Workspace**<br>
The Workspace allows the user to drag and drop the nodes they want into the canvas. They are able to connect nodes to each other in order to create logic for the streams.
![Workspace](/readme_images/workspace.png)

**Properties**<br>
Every node has properties that allow the user to control what they want each node to do. Every node type has a different set of properties. For more details see [Documentation](#documentation).
![Node Properties](/readme_images/nodeproperties.png)

When the user is done creating their streams, they can export it as a JSON file and move onto the [UI Designer](https://github.com/Rapid-Project-SRI/UINewStructure).

## Documentation
For more detailed documentation and a complete list of all features, click [here](add link to docs once they are complete).

## RAPID Frameworks
- [Simulation Designer](https://github.com/Rapid-Project-SRI/Simulation-Designer): A node based approach to creating data streams that can be used in the UI Designer.
- [UI Designer](https://github.com/Rapid-Project-SRI/UINewStructure): A drag and drop interface that allows users to create a UI and connect their data streams.
- [Simulator](https://github.com/Rapid-Project-SRI/Simulator): A way to rapidly execut the UI design and its connected streams.