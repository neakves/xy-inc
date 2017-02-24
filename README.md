# xy-inc

O produto xy-inc foi desenvolvido a fim de proporcionar agilidade no desenvolvimento de aplicativos mobile.
O desenvolvedor mobile pode criar todos modelos do aplicativo a ser desenvolvido através de um formulário simples.
Ao incluir novo modelo toda estrutura de acesso a base de dados é gerada no servidor e persistida na base de dados, permitindo que o CRUD para este modelo possa ser executado através de requisições Rest.

# Pré-requisitos para Execução:
  1) Instacia do banco de dados MongoDb rodando na porta 27017
  2) Servidor Node.js instalado

# Execução: 
 
 Para iniciar a aplicação basta navegar até o diretório raiz, que contem o arquivo package.json, e executar o comando:
 
 *npm start
 
 O sistema pode ser acesso no browser no endereço http://localhost:3000
 
 Os testes são executados pelo comando 
 
 *npm test
 
## Back-end:

O backend foi desenvolvido em Node.js, pois o processo de build utiliza a mesma linguagem, JavaScript, o que não acontece com ferramentas como como Ant ou Maven que não suportam logica de programação e são escritas em XML.
Com o Node.js as consultas a base de dados podem ser escritas em javaScript, diferente de Java em que as consultas são escritas em SQL, forçando em alguns casos a necessidade de que outro profissional especialista em SQL escreva as consultas.
A base de dados escolhida foi o MongoDB que é não relacional e armazena documentos em coleções. Nele as estruturas dos objetos são simples e armazenadas no formato [JSON].
Outra vantagem do Node.js é o fato do JSON ser parte da fundação do JavaScript eliminando a necessidade de bibliotecas para seu uso tanto na comunicação do web service com a aplicação quanto no armazenamento dos documentos no [MongoDB].
 
## Front-end:

No frontend foi utlizado o framework AngularJs que possui suporte MVC e MVVM geranção separação de responsabilidades dos recursos. Alem disso, com AngularJs o desenvolvimento é mais rápido pois precisa de menos código comparado por exemplo com JQuery.
Alem do AgularJS foi empregado o Twitter Bootstrap que agiliza o desenvolvimento eliminando processos trabalhosos, alem de ser responsivo. 
