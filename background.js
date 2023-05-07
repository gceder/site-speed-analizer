// background.js

// Se ejecuta cuando se instala la extensión 
chrome.runtime.onInstalled.addListener(() => {
});

// Escucha click en el ícono de la extensión 
chrome.action.onClicked.addListener(async tab => {
  // Obtener la página web actual
  let url = tab.url
  
  // Analizar el rendimiento de la página
  const lighthouseResults = await analyzePage(url)
  
  // Generar un informe PDF con los resultados 
  const pdf = generateReport(lighthouseResults)
  
  // Descargar el PDF
  chrome.downloads.download({
    url: URL.createObjectURL(pdf),
    filename: "report.pdf"
  });
});

// Analiza el rendimiento de la página mediante Lighthouse
async function analyzePage(url) {
  const options = {
    logLevel: 'info',
    output: 'json',
    onlyCategories: ['performance'],
  }
  const runnerResult = await lighthouse(url, options) 
  return runnerResult.lhr
}

// Genera un informe PDF con los resultados de Lighthouse
function generateReport(lighthouseResults) {
  const pdf = lighthouseResultsToJSPDF(lighthouseResults)
  return pdf.output('blob')
}
