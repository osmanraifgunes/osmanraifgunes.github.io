const puppeteer = require('puppeteer');
const path = require('path');

async function convertHtmlToPdf() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();
    
    // Set the HTML file path
    const htmlPath = path.join(__dirname, 'index.html');
    const htmlUrl = `file://${htmlPath}`;
    
    // Navigate to the HTML file
    await page.goto(htmlUrl, {
      waitUntil: ['networkidle0', 'domcontentloaded'],
      timeout: 30000
    });

    // Wait for fonts to load
    await page.evaluateHandle('document.fonts.ready');

    // Generate PDF
    const pdf = await page.pdf({
      path: 'osman_raif_gunes_resume_cv.pdf',
      format: 'A4',
      printBackground: true,
      margin: {
        top: '20mm',
        bottom: '20mm',
        left: '15mm',
        right: '15mm'
      },
      displayHeaderFooter: false,
      preferCSSPageSize: true
    });

    console.log('✅ PDF generated successfully: osman_raif_gunes_resume_cv.pdf');
    
  } catch (error) {
    console.error('❌ Error generating PDF:', error);
  } finally {
    await browser.close();
  }
}

convertHtmlToPdf();
