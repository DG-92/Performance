#!/bin/bash

TOTAL_USERS=50
RAMP_UP=1800
STEADY=3600

INTERVAL=$(($RAMP_UP / $TOTAL_USERS))

for ((i=1; i<=$TOTAL_USERS; i++)); do
  echo "Iniciando usuário $i"
  npx cypress run --spec cypress/e2e/viacep-load.cy.js --reporter mochawesome &
  sleep $INTERVAL
done

wait
