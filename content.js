window.onload = function() {
var products = [];
var product_link_array = [];
const Http = new XMLHttpRequest();
var url='https://www.amazon.com/gp/cart/view.html?ref=nav_cart';
var domParser = new DOMParser();
Http.open("GET", url);

Http.onload = function () {
  console.log('DONE', Http.readyState);
  var htmlString = Http.responseText;
  var docElement = domParser.parseFromString(htmlString, "text/html").documentElement;
  var links = docElement.getElementsByTagName('a');
  var re = new RegExp("^.*/gp/product.*title.*$");
  var products = [];
  for(var i = 0; i< links.length; i++){
    if (re.test(links[i].href) && !product_link_array.includes(links[i].href)){
      product_link_array.push(links[i].href);
      console.log(links[i].href);
    }
  }
  for (var i = 0; i < product_link_array.length; i++) {
    console.log('iterazione ' + i);
    var url = product_link_array[i];
    let request = new XMLHttpRequest();
    request.open("GET", url);
    request.onload = function() {
      Product_domParser = new DOMParser();
      var htmlString = request.responseText;
      var ProductElement = Product_domParser.parseFromString(htmlString, "text/html").documentElement;
    
      span = ProductElement.getElementsByTagName("span");
      for(var j = 0; j< span.length; j++){
        if(span[j].id == 'productTitle'){
          console.log(span[j].id);
          if (!products.includes(span[j].innerHTML.trim())){
            document.write('<li class="list-group-item list-group-item-warning">' + span[j].innerHTML.trim() + '  <strong>Purchased!</strong> <span class=\"glyphicon glyphicon-ok\"></span></li>')
          }
        }
      }
    }
    request.send();
  }
};

document.write(`
<!doctype html>
<html lang="en">
  <head>
    <link rel=\"stylesheet\" href=\"https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css\" integrity=\"sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u\" crossorigin=\"anonymous\">
  </head>
  <body>
    <div class="container">
    <h4>after the purchase, go back to <a href="https://amazon.com"> Amazon.com </a> (Remember to empty your shopping cart or else you'll pretend to do the same things!)</h4>
    <br><br><br><br>
    <h2>products you have purchased</h2>
    <ul class=\"list-group\">
    `);
Http.send();
}