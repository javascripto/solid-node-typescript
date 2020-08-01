
# Anotações


### Por que ter um diretório entity ao invés de model?

- Um model geralmente está ligado ao banco de dados, mas a aplicação pode ter entidades que não tem representação em nenhuma tabela do banco

### Por que gerar o id na classe e não no banco?

- O banco de dados pertence à camada de infraestrutura da aplicação, no postgres por exemplo a geração do uuid depende de uma extensão estar habilitada, talvez um dia pode ser que a aplicação rode em um banco que não tenha essa extensão habilitada ou não tenha um auto_increment para gerar um id.

### O que são repositories?

- Repositórios são classes específicas para fazer a ligação das funcionalidades da aplicação com o banco de dados

### Feature by package e diretório useCases

`Feature by package` é uma abordagem diferente para se estruturar diretórios por features. Diferente da abordagem `Packaged by Layer` - onde cada tipo de classe fica em um diretório separado -, no feature by package todas as classes que tem ligação com uma funcionalidade da aplicação ficam juntas no mesmo pacote criando na aplicação varios pacotes independentes, auto contidos, mais fáceis de se entender e menos propenso a erros.

Nesta aplicação de exemplo foi citado um diretório `useCases` baseado nos diagramas de caso de uso - que são ações que determinado usuário pode realizar dentro da aplicação - onde
cada caso de uso pode ser considerado uma funcionalidade.

Exemplo:

Na feature de criar um usuário, todos arquivos relacionados a essa funcionalidade ficam no mesmo diretório

```
src/useCases
└── CreateUser
   ├── CreateUserController.ts
   ├── CreateUserDTO.ts
   ├── CreateUserUseCase.spec.ts
   ├── CreateUserUseCase.ts
   └── index.ts
```

### Observações

- Como servidor de e-mails foi usado o MailTrap que é um servidor falso para execução de testes. para que sejam enviados e-mails após a criação do usuário é necessário criar um arquivo `.env` e adicionar credenciais de uma conta no MailTrap
- As abstrações usadas na aplicação foram criadas para dois tipos de dependências externas (banco de dados, e email) onde foi definido interfaces que podem ser usadas para implementar classes que fazem o trabalho real seguindo o contrato definido. As classes implementadas usaram o mailtrap como servidor de email e a memória da máquina como banco de dados falso na classe do repositório. Com isso, a aplicação passou a depender de abstrações ao invés de implementações com base nos princípios `SOLID`.

### SOLID

- `S`ingle Responsability Principle - Cada classe na aplicação teve a responsabilidade de fazer apenas uma coisa

- `O`pen/Closed principle - Classes são abertas para extensão e fechadas para modificação. Usando o UsersRepository como exemplo, foi definido um contrato de implementação na interfaces IUsersRepository para que no futuro NÃO seja necessário alterar a assinatura dos métodos desses contratos, mas podemos estender a interface com novos métodos. A classe ficou fechada para alteração mas ficou aberta para extensão.

- `L`iskov Substituition Principle - Como a aplicação depende de interfaces ao invés de implementações, podemos substituir as classes de repository e email por outras diferentes desde que respeitem o contrato das interfaces. Podemos usar um Postgres ou MySQL ao invés do banco de dados em memória e o MailChimp ou SendGrid no lugar do MailTrap por exemplo, basta criarmos novas implementações com base na mesma interface.

- `I`nterface Segregation - Ao invés de criar uma interface única para o `CreateUserUseCase` com os métodos `createUser` e `sendEmail`, foram criadas duas interfaces separadas e específicas para o `Repository` e para o `servidor de email` que podem ser injetadas e utilizadas no `CreateUserUseCase`. Segundo o princípio da segregação de interfaces, muitas interfaces específicas são melhores do que uma interface geral pois interfaces que possuem muitos comportamentos são difíceis de se manter e evoluir, portanto devem ser evitadas.

- `D`ependency Inversion Principle - Dependa de abstrações e não de implementações. A aplicação foi feita primeiramente baseado em interfaces  que representariam o `Repository` e o `servidor de e-mail`. Só depois as implementações foram feitas permitindo que sejam desenvolvidas com o banco de dados e servidor de e-mail que o desenvolvedor quiser. Seguindo o princípio de Inversão de dependência, as classes podem ser substituidas como no princípio de substituição de Liskov.
