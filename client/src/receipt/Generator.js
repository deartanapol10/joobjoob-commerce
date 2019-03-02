var fs = require("fs");
var pdf = require("html-pdf");
var html = fs.readFileSync("./SellerReceipt", "utf8");

pdf.create(html).toFile("./businesscard.pdf", function(err, res) {
   if (err) return console.log(err);
   console.log(res); // { filename: '/app/businesscard.pdf' }
});
