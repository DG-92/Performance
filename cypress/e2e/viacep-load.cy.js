const cepsValidos = [
  '01001000', '30140071', '30140000', '20271110', '30150904', '30110000',
  '01310930', '69900970', '68460000', '40010000', '99999999'
];

function getRandomCEP() {
  const index = Math.floor(Math.random() * cepsValidos.length);
  return cepsValidos[index];
}

describe('Teste de Performance ViaCEP', () => {
  for (let i = 0; i < 100; i++) {
    it(`Consulta CEP ${i + 1}`, () => {
      const cep = getRandomCEP();
      const thinkTime = Math.floor(Math.random() * 900) + 100;
      cy.wait(thinkTime);
      cy.request({
        method: 'GET',
        url: `https://viacep.com.br/ws/${cep}/json/`,
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.be.oneOf([200, 400]);
        if (response.status === 200) {
          expect(response.body).to.have.property('cep');
        } else {
          cy.log(`Erro esperado para o CEP inválido: ${cep}`);
        }
      });
    });
  }
});
