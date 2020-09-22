const inquirer = require('inquirer');

const promptUser = () => {
    return inquirer
        .prompt([
            {
                type: 'input',
                name: 'name',
                message: 'What is your name?'
            },
            {
                type: 'input',
                name: 'github',
                message: 'Enter your Github Username'
            },
            {
                type: 'input',
                name: 'about',
                message: 'Provide some information about yourself:'
            }
        ]);
};

const promptProject = protfolioData => {
    if (!protfolioData.projects) protfolioData.projects = [];
    console.log(`
=================
Add a New Project
=================
`);
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of your project?'
        },
        {
            type: 'input',
            name: 'description',
            message: 'Provide a description of the project (Required)'
        },
        {
            type: 'checkbox',
            name: 'languages',
            message: 'What did you create this project with (check all that apply)',
            choices: ['Javascript', 'HTML', 'CSS', 'Es6', 'jQuery', 'Bootstrap', 'Node']
        },
        {
            type: 'input',
            name: 'link',
            message: 'Enter the Github link to your project. (Required)'
        },
        {
            type: 'confirm',
            name: 'feature',
            message: 'Would you like to feature this project?',
            default: false
        },
        {
            type: 'confirm',
            name: 'confirmAddProject',
            message: 'Would you like to enter another project?',
            default: false
        }
    ])
        .then(projectData => {
            protfolioData.projects.push(projectData);

            if (projectData.confirmAddProject) {
                return promptProject(protfolioData);
            } else {
                return protfolioData;
            }
        });
}

promptUser()
    .then(promptProject)
    .then(portfolioData => console.log(portfolioData));

// const fs = require('fs');
// const generatePage = require('./src/page-template.js');=

// const profileDataArgs = process.argv.slice(2,process.argv.length);

// const [name, github] = profileDataArgs;

// fs.writeFile('./index.html', generatePage(name, github), err => {
//     if (err) throw new Error(err);

//     console.log('Portfolio complete! Check out index.html to see the output!');
// });