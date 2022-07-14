const inquirer = require("inquirer");

const promptUser = () => {
  return inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "What is your name?",
    },
    {
      type: "input",
      name: "github",
      message: "Enter your github username",
    },
    {
      type: "input",
      name: "about",
      message: "Provide some information about yourself",
    },
  ]);
};

const promptProject = (portfolioData) => {
  console.log(`
    =================
    Add a New Project
    =================
    `);

  // if there is no 'projects' array property, create one
  if (!portfolioData.projects) {
    portfolioData.projects = [];
  }
  return inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: " What is the name of your project",
      },
      {
        type: "input",
        name: "description",
        message: "Provide a description of the project (required)",
      },
      {
        type: "checkbox",
        name: "languages",
        message: "What did you build this project with? (check all that apply)",
        choices: [
          "JavaScript",
          "HTML",
          "CSS",
          "ES6",
          "jQuery",
          "Bootstrap",
          "Node",
        ],
      },
      {
        type: "confirm",
        name: "feature",
        message: "Would you like to feature this project?",
        deault: false,
      },
      {
        type: "confirm",
        name: "confirmAddProject",
        message: "Would you like to enter another project?",
        default: false,
      },
    ])
    .then((projectData) => {
      portfolioData.projects.push(projectData);
      if (projectData.confirmAddProject) {
        return promptProject(portfolioData);
      } else {
        return portfolioData;
      }
    });
};
promptUser()
  .then(promptProject)
  .then((portfolioData) => {
    console.log(portfolioData);
  });
// const fs = require('fs');
// const generatePage = require('./src/page-template.js');

// const pageHTML = generatePage(name, github);

// fs.writeFile('./index.html', pageHTML, err => {
//     if (err) throw Error;

//     console.log('Portfolio is complete! Checkout out index.html to see the output!');
// });

// .then(answers => console.log(answers))
// .then(projectAnswers => console.log(projectAnswers));
