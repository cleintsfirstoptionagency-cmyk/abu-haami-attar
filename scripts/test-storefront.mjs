const domain = 'ezf1x7-pn.myshopify.com';
const token = '328fc62ab37c1638401420595cd651c2';
const endpoint = `https://${domain}/api/2024-04/graphql.json`;

console.log('Testing Storefront API connection to:', domain);

const query = `
  query {
    shop {
      name
      paymentSettings {
        currencyCode
      }
    }
    products(first: 10) {
      edges {
        node {
          id
          title
          handle
          availableForSale
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
        }
      }
    }
  }
`;

try {
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': token
    },
    body: JSON.stringify({ query })
  });

  const data = await res.json();
  console.log('\n--- STOREFRONT API RESPONSE ---');
  console.log(JSON.stringify(data, null, 2));
} catch (err) {
  console.error('Error fetching Storefront API:', err);
}

