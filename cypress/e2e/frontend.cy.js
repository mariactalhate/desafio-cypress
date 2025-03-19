describe('template spec', () => {
  before(() => {
    Cypress.config('baseUrl', 'https://front.serverest.dev')
  })

  it('Deve acessar login e validar elementos da página', () => {
    cy.visit('/') // acessa página inicial
    cy.url().should('contain', '/login') // valida direcionamento para página de login
    cy.getByAttr('div', 'class', 'login-page container').should('be.visible') // valida elemento container
    cy.get('h1').should('have.text', 'Login') // valida elemento h1
    cy.getByAttr('input', 'data-testid', 'email').should('be.visible').and('have.attr', 'placeholder', 'Digite seu email').and('not.be.disabled') // valida input de email
    cy.getByAttr('input', 'data-testid', 'senha').should('be.visible').and('have.attr', 'placeholder', 'Digite sua senha').and('not.be.disabled') // valida input de senha
    cy.getByAttr('button', 'data-testid', 'entrar').should('be.visible').and('have.text', 'Entrar').and('not.be.disabled') // valida botão Entrar
    cy.getByAttr('small', 'class', 'message form-text').should('have.text', 'Não é cadastrado?Cadastre-se').and('be.visible') // Valida texto small
    cy.getByAttr('a', 'data-testid', 'cadastrar').should('have.text', 'Cadastre-se').and('have.attr', 'class', 'btn btn-link').and('not.be.disabled') // valida link de redirecionamento para cadastro
  })

  it('Deve realizar fluxo de cadastro com sucesso', () => {
    cy.dataGenerator().then(data => {
      cy.visit('/login') // acessa página de login
      cy.getByAttr('a', 'data-testid', 'cadastrar').click() // clica em link de Cadastre-se
      cy.url().should('contain', '/cadastrarusuarios') // valida url da página de cadastro
      cy.getByAttr('input', 'data-testid', 'nome').type(data.nome) // preenche input de nome
      cy.getByAttr('input', 'data-testid', 'email').type(data.email) //preenche input de email
      cy.getByAttr('input', 'data-testid', 'password').type(data.password) // preenche input de senha
      cy.getByAttr('button', 'data-testid', 'cadastrar').click() // clica no botão Cadastrar
      cy.get('.alert').should('be.visible').and('contain', 'Cadastro realizado com sucesso') // valida alerta de sucesso
      }) 
  })

  it('Deve realizar login com sucesso', () =>{
    cy.fixture('dadosLogin.json').then(fixture => { // busca dados de usuários da fixture dadosLogin.json
      cy.intercept('POST', 'https://serverest.dev/login').as('requestLogin') // intercepta request de Login
      cy.visit('/login') // acessa página de login
      cy.getByAttr('input', 'data-testid', 'email').type(fixture.email) // preenche input de email
      cy.getByAttr('input', 'data-testid', 'senha').type(fixture.password) // preenche input de senha
      cy.getByAttr('button', 'data-testid', 'entrar').click() // clica no botão de entrar
      cy.wait('@requestLogin') // aguarda request de login
      cy.url().should('contain', '/home') // valida redirecionamento para homepage
    })
  })
})