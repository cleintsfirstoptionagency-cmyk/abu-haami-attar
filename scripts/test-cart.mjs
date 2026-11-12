const domain = 'ezf1x7-pn.myshopify.com';
const token = '328fc62ab37c1638401420595cd651c2';
const endpoint = `https://${domain}/api/2024-04/graphql.json`;

const mutation = `
  mutation {
    cartCreate(input: {}) {
      cart {
        id
        checkoutUrl
      }
      userErrors {
        field
        message
      }
    }
  }
`;

const res = await fetch(endpoint, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-Shopify-Storefront-Access-Token': token
  },
  body: JSON.stringify({ query: mutation })
});

const data = await res.json();
console.log('CART CREATED SUCCESSFULLY!');
console.log('Checkout URL:', data.data?.cartCreate?.cart?.checkoutUrl);

