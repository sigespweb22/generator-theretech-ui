const Generator = require('yeoman-generator');
const path = require('path');

module.exports = class extends Generator {
  async prompting() {
    // Pergunte se o usuário deseja responder à primeira pergunta
    const askProjectName = await this.prompt({
      type: 'confirm',
      name: 'askProjectName',
      message: 'Você deseja responder à pergunta sobre o nome do projeto?'
    });

    if (askProjectName.askProjectName) {
      // Faça a primeira pergunta e local de salvamento
      const projectNameAnswer = await this.prompt([
        {
          type: 'input',
          name: 'projectName',
          message: 'Qual é o nome do projeto?',
          default: this.appname
        },
        {
          type: 'input',
          name: 'projectPath',
          message: 'Onde você deseja salvar o arquivo do projeto?',
          default: 'index.html'
        }
      ]);

      // Armazene as respostas como propriedades da classe
      this.projectName = projectNameAnswer.projectName;
      this.projectPath = projectNameAnswer.projectPath;
    }

    // Pergunte se o usuário deseja responder à segunda pergunta
    const askAuthorName = await this.prompt({
      type: 'confirm',
      name: 'askAuthorName',
      message: 'Você deseja responder à pergunta sobre o nome do autor?'
    });

    if (askAuthorName.askAuthorName) {
      // Faça a segunda pergunta e local de salvamento
      const authorAnswer = await this.prompt([
        {
          type: 'input',
          name: 'author',
          message: 'Qual é o nome do autor?',
          default: 'Seu nome'
        },
        {
          type: 'input',
          name: 'authorPath',
          message: 'Onde você deseja salvar o arquivo do autor?',
          default: 'author.txt'
        }
      ]);

      // Armazene as respostas como propriedades da classe
      this.author = authorAnswer.author;
      this.authorPath = authorAnswer.authorPath;
    }
  }

  writing() {
    // Copie o arquivo do projeto, se necessário
    if (this.projectName && this.projectPath) {
      this.fs.copyTpl(
        this.templatePath('index.html'),
        this.destinationPath(path.join(this.projectPath, 'index.html')),
        {
          projectName: this.projectName
        }
      );
    }

    // Copie o arquivo do autor, se necessário
    if (this.author && this.authorPath) {
      this.fs.copyTpl(
        this.templatePath('author.txt'),
        this.destinationPath(path.join(this.authorPath, 'author.txt')),
        {
          author: this.author
        }
      );
    }
  }
};