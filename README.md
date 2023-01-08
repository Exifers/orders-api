# Run the project

```bash
pnpm i && pnpm start
```

Open [http://localhost:3000](http://localhost:3000)

# Example requests

```bash
# Create an order
curl -i -X POST -H 'Content-type:application/json' -d '{"id":"AAFFF3I","name":"Christmas Gift","amount":200}' http://localhost:3000/orders

# Add a payer
curl -i -X POST -H 'Content-type:application/json' -d '{"name":"John","email":"john.doe@gmail.com"}' http://localhost:3000/orders/AAFFF3I/add-payer

# Retrieve order
curl -i http://localhost:3000/orders/AAFFF3I
```