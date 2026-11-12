const domain = 'ezf1x7-pn.myshopify.com';
const token = '328fc62ab37c1638401420595cd651c2';
const endpoint = `https://${domain}/api/2024-04/graphql.json`;

const query = `
  query {
    product(id: "gid://shopify/Product/9799679672579") {
      id
      title
      description
      handle
      featuredImage {
        url
        altText
      }
      variants(first: 5) {
        edges {
          node {
            id
            title
            price {
              amount
              currencyCode
            }
            availableForSale
          }
        }
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
  body: JSON.stringify({ query })
});

const data = await res.json();
console.log(JSON.stringify(data, null, 2));

