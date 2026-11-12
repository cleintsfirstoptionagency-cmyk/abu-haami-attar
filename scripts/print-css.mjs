async function printCss() {
  const res = await fetch('http://localhost:3000');
  const html = await res.text();
  const cssMatches = html.match(/href="(\/_next\/static\/css\/[^"]+)"/g) || [];
  if (cssMatches.length > 0) {
    const path = cssMatches[0].slice(6, -1);
    const cssRes = await fetch('http://localhost:3000' + path);
    const cssText = await cssRes.text();
    console.log('FIRST 500 CHARS OF CSS:');
    console.log(cssText.slice(0, 500));
    console.log('\nLAST 500 CHARS OF CSS:');
    console.log(cssText.slice(-500));
  }
}
printCss();

