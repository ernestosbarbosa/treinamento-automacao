#language: pt 
#encoding: utf-8 
Funcionalidade: [Inicio] Navegando no site AngularJS
Como Usuário
Desejo cadastrar minhas tarefas
Para que as tenha mapeadas

Esquema do Cenário: Cadastrar lista de tarefas
  Dado que acessei a pagina inicial
  Quando preenchi <n> tarefas
  Então a lista deve exibir todos os <n> campos

Exemplos:
  | n |
  | 1 |
  | 2 |
  | 3 |
