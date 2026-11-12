async function check() {
  const res = await fetch('http://localhost:3000');
  const html = await res.text();
  console.log('HTML Length:', html.length);
  
  // check title and body tags
  const hasTitle = html.includes('<title>');
  console.log('Has Title:', hasTitle);

  // find stylesheets
  const cssMatches = html.match(/href="(\/_next\/static\/css\/[^"]+)"/g) || [];
  console.log('CSS Links found:', cssMatches);

  for (const match of cssMatches) {
    const path = match.slice(6, -1);
    const cssRes = await fetch('http://localhost:3000' + path);
    const cssText = await cssRes.text();
    console.log(`CSS (${path}) length:`, cssText.length);
    console.log(`Contains tailwind utility classes?`, cssText.includes('.flex') || cssText.includes('.grid') || cssText.includes('.bg-'));
  }

  // check if any unrendered code or errors
  if (html.includes('Error:') || html.includes('Unhandled Runtime Error')) {
    console.log('Found error in HTML!');
  }
}
check();

