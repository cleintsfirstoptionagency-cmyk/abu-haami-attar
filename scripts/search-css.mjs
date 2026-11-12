async function searchCss() {
  const res = await fetch('http://localhost:3000');
  const html = await res.text();
  const cssMatches = html.match(/href="(\/_next\/static\/css\/[^"]+)"/g) || [];
  if (cssMatches.length > 0) {
    const path = cssMatches[0].slice(6, -1);
    const cssRes = await fetch('http://localhost:3000' + path);
    const cssText = await cssRes.text();
    console.log('Includes max-w-7xl:', cssText.includes('max-w-7xl'));
    console.log('Includes bg-amber:', cssText.includes('amber'));
    console.log('Includes flex:', cssText.includes('flex'));
    console.log('Includes grid:', cssText.includes('grid'));
  }
}
searchCss();

