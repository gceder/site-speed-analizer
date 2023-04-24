chrome.declarativeNetRequest.onHeadersReceived.addListener(function(details) {
  if (chrome.declarativeNetRequest) {
    // Get the URL of the current request.
    var url = details.url;

    // Analyze the speed performance of the website.
    var lighthouse = new Lighthouse();
    lighthouse.run(url).then(function(result) {
      // Get the performance metrics.
      var performanceMetrics = result.performance;
      // Get the recommendations.
      var recommendations = result.categories.performance.remediations;

      // Create a PDF with the results.
      var pdf = new PDF();
      pdf.addPage(new Paragraph("Website Speed Analyzer"));
      pdf.addPage(new Paragraph("Performance Metrics"));
      for (var key in performanceMetrics) {
        pdf.addParagraph(key + ": " + performanceMetrics[key]);
      }
      pdf.addPage(new Paragraph("Recommendations"));
      for (var key in recommendations) {
        pdf.addParagraph(key + ": " + recommendations[key]);
      }

      // Save the PDF to the user's downloads folder.
      pdf.save("website-speed-analyzer.pdf");
    });
  }
});
