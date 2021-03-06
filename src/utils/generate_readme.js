let fs = require("fs");
let path = require("path");

function generateMD() {
  let fileName = "README";
  let fileContents = `# :beginner:[ProjectLearn](https://projectlearn.io) - Project Based Learning

Website: https://projectlearn.io

Tutorials are great, but building projects is the best way to learn. Do project based learning and learn code the right way!
  
ProjectLearn provides a curated list of project tutorials in which learners build an application from scratch. These are divided into different categories, namely, web development, mobile development, game development, machine learning, deep learning and artificial intelligence.
  
The list has project tutorials on many in-demand languages and technologies including ReactJS, NodeJS, VueJS, Flutter, React Native, .NET Core, Unity, TensorFlow, OpenCV, Keras, and more.
  
To contribute to this list, head over to [CONTRIBUTE.md](https://github.com/Xtremilicious/ProjectLearn-Project-Based-Learning/blob/master/CONTRIBUTE.md) for more details :)
  
## List of Project Tutorials:
`;

  const projectsData = require("../../data");
  const projects = projectsData[Object.keys(projectsData)[0]];
  const domains = [
    ["web-dev", "web-development", "Web Devlopment"],
    ["mob-dev", "mobile-development", "Mobile Devlopment"],
    ["game-dev", "game-development", "Game Devlopment"],
    ["ml-ai", "machine-learning-and-ai", "Machine Learning & AI"],
  ];

  for (domain of domains) {
    fileContents = fileContents.concat(
      `### ${domain[2]}: \n| Project | Technologies | Link |\n| :--- |:---|:---|\n`
    );

    for (let i = 0; i < projects.length; i++) {
      slug = domain[1];
      t = domain[0];

      if (projects[i].category.includes(t)) {
        fileContents = fileContents.concat(
          `| ${projects[i].title} | ${projects[i].tech
            .slice(0, 5)
            .join(", ")} | [Link](https://projectlearn.io/learn/${slug}/project/${projects[i].title
            .toLowerCase()
            .split(" ")
            .join("-")}-${projects[i].id}?from=github)|`.concat("\n")
        );
      }
    }
  }

  fileContents = fileContents.concat(`<p align="center">
  <img src="https://i.ibb.co/ypzR4Qv/Screen-Shot-20200320134822.png">
</p>`);

  let outputPath = path.join(__dirname, "../../", `${fileName}.md`);

  fs.writeFile(outputPath, fileContents, function (err) {
    if (err) {
      return console.log(err);
    }
    console.log(outputPath + " file generated");
  });
}

generateMD();
