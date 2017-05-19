$(function(){

  // https://github.com/phamtrisi/airapi/blob/master/api/search.js
  $("#search_query").submit(function(event){
    event.preventDefault();
    var search_query = {};
    var guests = $('input[name="guests"]').val()
    var page = $('input[name="page"]').val()
    var location = $('input[name="location"]').val()
    var price_min = $('input[name="price_min"]').val()
    var price_max = $('input[name="price_max"]').val()
    var min_bedrooms = $('input[name="min_bedrooms"]').val()
    var min_bathrooms = $('input[name="min_bathrooms"]').val()
    var min_beds = $('input[name="min_beds"]').val()
    var superhost = $('input[name="superhost"]:checked').val()
    var keywords = $('input[name="keywords"]').val()
    var ib = $('input[name="ib"]:checked').val()
    search_query.guests = guests
    search_query.page = page
    search_query.location = location
    search_query.price_min = price_min
    search_query.price_max = price_max
    search_query.min_bedrooms = min_bedrooms
    search_query.min_bathrooms = min_bathrooms
    search_query.min_beds = min_beds
    search_query.superhost = superhost
    search_query.keywords = keywords
    search_query.ib = ib

    $.ajax({
      url: "/api",
      data: search_query,
      success: function(data){
        renderResults(data);
      },
      error: function(err, status){
        console.log(err, status)
      }
    })

  })

  function renderResults(input){
      // console.log(input)
      input = JSON.parse(input)
      data = input.results_json.search_results;
      metadata = input.results_json.metadata;

      // var div_metadata = $('<div>');
      // div_metadata.append($('<h3>').text("Metadata"))
      // for(var key in metadata){
      //   div_metadata.append($('<p>').text(key + ": " + JSON.stringify(metadata[key])))
      // }
      // $("#metadata").html(div_metadata);

      var result_wrap = $('<div>')
      data.forEach(function(item, i){
        var listing = item.listing;
        var pricing_quote = item.pricing_quote;
        var viewed_at = item.viewed_at;

        var div_listing = $('<div>')
        var div_pricing_quote = $('<div>')
        var div_viewed_at = $('<div>');

        var div_all = $('<div>').append('<hr>')

        for (var key in listing){
          div_listing.append($('<p>').text(key + ": " + JSON.stringify(listing[key]) ));
        }
        div_all.append($('<h3>').text('Listing'));
        div_all .append(div_listing)

        for (var key in pricing_quote){
          div_pricing_quote.append($('<p>').text(key + ": " + JSON.stringify(pricing_quote[key]) ));
        }
        div_all.append($('<h3>').text('Pricing Quote'));
        div_all .append(div_pricing_quote)

        div_viewed_at.append($('<h3>').text('Viewed At'));
        div_viewed_at.append($('<p>').text( JSON.stringify(viewed_at)));
        div_all.append(div_viewed_at)


        result_wrap.append(div_all)

      })
      $("#results").html(result_wrap)
  }

})
