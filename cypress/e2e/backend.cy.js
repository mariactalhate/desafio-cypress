import { expect } from "chai"

describe('template spec', () => {

  before(() => {
    Cypress.config('baseUrl', 'https://serverest.dev/')
  })

  it('Deve validar busca de usuários', () => {
    cy.makeRequest('GET', '/usuarios').then(response => {  // realiza requisição
      cy.log(JSON.stringify(response.body.usuarios[0]))
      expect(response.status).to.eq(200) // valida status 200
      // valida dados do corpo da resposta
      expect(response.body).to.be.an('Object')
      expect(response.body).to.haveOwnProperty('quantidade').that.is.a('number')
      expect(response.body).to.haveOwnProperty('usuarios').that.is.an('Array')
      expect(response.body.usuarios[0]).to.haveOwnProperty('nome').that.is.a('string')
      expect(response.body.usuarios[0]).to.haveOwnProperty('email').that.is.a('string')
      expect(response.body.usuarios[0]).to.haveOwnProperty('password').that.is.a('string')
      expect(response.body.usuarios[0]).to.haveOwnProperty('administrador').that.is.a('string')
      expect(response.body.usuarios[0]).to.haveOwnProperty('_id').that.is.a('string')
    })
  })

  it('Deve validar criação de usuário', () => {
    cy.dataGenerator().then(data => { // inicializa dados
      cy.makeRequest('POST', '/usuarios', data).then(response => { // realiza requisição
        cy.log(JSON.stringify(response.body))
        expect(response.status).to.eq(201) // valida status 200
        // valida dados do corpo da resposta
        expect(response.body).to.be.an('Object')
        expect(response.body).to.have.property('message', 'Cadastro realizado com sucesso')
        expect(response.body).to.haveOwnProperty('_id').that.is.a('string')
      })
    })
  })

  it('Deve validar deleção de usuario', () => {
    cy.returnUserId().then(id => { // cria novo usuário e armazena ID
      cy.makeRequest('DELETE', `/usuarios/${id}`).then(response =>{ // envia requisição de deleção
        cy.log(JSON.stringify(response.body))
        expect(response.status).to.eq(200) // valida status 200
        // valida dados de corpo da resposta
        expect(response.body).to.be.an('Object')
        expect(response.body).to.have.property('message', 'Registro excluído com sucesso')
      })
    })
  })



})