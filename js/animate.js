$(document).ready(function(){
  const resolver = {
    resolve: function resolve(options, callback) {
    // The string to resolve
    const resolveString = options.resolveString || options.element.getAttribute('data-target-resolver');
    const combinedOptions = Object.assign({}, options, {resolveString: resolveString});
    
    function getRandomInteger(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    
    function randomCharacter(characters) {
      return characters[getRandomInteger(0, characters.length - 1)];
    };
    
    function doRandomiserEffect(options, callback) {
      const characters = options.characters;
      const timeout = options.timeout;
      const element = options.element;
      const partialString = options.partialString;

      let iterations = options.iterations;

      setTimeout(() => {
        if (iterations >= 0) {
          const nextOptions = Object.assign({}, options, {iterations: iterations - 1});

          // Ensures partialString without the random character as the final state.
          if (iterations === 0) {
            element.textContent = partialString;
          } else {
            // Replaces the last character of partialString with a random character
            element.textContent = partialString.substring(0, partialString.length - 1) + randomCharacter(characters);
          }

          doRandomiserEffect(nextOptions, callback)
        } else if (typeof callback === "function") {
          callback(); 
        }
      }, options.timeout);
    };
    
    function doResolverEffect(options, callback) {
      const resolveString = options.resolveString;
      const characters = options.characters;
      const offset = options.offset;
      const partialString = resolveString.substring(0, offset);
      const combinedOptions = Object.assign({}, options, {partialString: partialString});

      doRandomiserEffect(combinedOptions, () => {
        const nextOptions = Object.assign({}, options, {offset: offset + 1});

        if (offset <= resolveString.length) {
          doResolverEffect(nextOptions, callback);
        } else if (typeof callback === "function") {
          callback();
        }
      });
    };

    doResolverEffect(combinedOptions, callback);
  } 

};

/* Some GLaDOS quotes from Portal 2 chapter 9: The Part Where He Kills You
 * Source: http://theportalwiki.com/wiki/GLaDOS_voice_lines#Chapter_9:_The_Part_Where_He_Kills_You
 */
 const strings = ["Делаем Cайты"];

 let counter = 0;

 const options = {
  // Initial position
  offset: 1,
  // Timeout between each random character
  timeout: 4,
  // Number of random characters to show
  iterations: 10,
  // Random characters to pick from
  characters: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'x', 'y', 'x', '#', '%', '&', '-', '+', '_', '?', '/', '\\', '='],
  // String to resolve
  resolveString: strings[counter],
  // The element

  element: document.querySelector('[data-target-resolver]')
};
// Callback function when resolve completes
function callback() {
  setTimeout(() => {

    counter ++;
    
    if (counter >= strings.length) {
      counter = 0;
    }
    
    let nextOptions = Object.assign({}, options, {resolveString: strings[counter]});
    resolver.resolve(nextOptions, callback);
  }, 1000);

  $("#resol").html('<div class="title">'+strings+'</div>');
}  
resolver.resolve(options, callback); 



  // variables
  var $header_top = $('.header-top');
  var $nav = $('nav');

  // toggle menu 
  $header_top.on('click', function() {
    $(this).parent().parent().toggleClass('open-menu');
  });

  $nav.on("click", "a", function () {
    $header_top.removeClass('open-menu');
  });



  // fullpage customization
  $('#fullpage').fullpage({
    sectionsColor: ['#B8AE9C', '#348899', '#F2AE72', '#5C832F', '#B8B89F','#F2AE72', '#5C832F', '#B8B89F', '#5C832F', '#B8B89F'],
    sectionSelector: '.vertical-scrolling',
    slideSelector: '.horizontal-scrolling',
    navigation: true,
    slidesNavigation: true,
    css3: true,
    controlArrows: false,
    anchors: ['sec1', 'sec2', 'sec3', 'sec4', 'sec5', 'sec6', 'sec7', 'sec8','sec9','sec10'],
    menu: '#menu',

    

    onLeave: function(index, nextIndex, direction) {
      if(index == 5) {
        $('#fp-nav').show();
      }
    },

    afterSlideLoad: function( anchorLink, index, slideAnchor, slideIndex) {
      if(anchorLink == 'fifthSection' && slideIndex == 1) {
        $.fn.fullpage.setAllowScrolling(false, 'up');
      }

    },

    onSlideLeave: function( anchorLink, index, slideIndex, direction) {
      if(anchorLink == 'fifthSection' && slideIndex == 1) {
        $.fn.fullpage.setAllowScrolling(true, 'up');
      }
    } 
  });

  var header = $(".header-top, #menu, .phone-top");
  var footer = $("footer");
  var right_nav = $("#fp-nav ul");
  var line = $(".home .line");
  var text = $(".home .description");

  var del = 800;
  var pixels = 10;

  header.css({"opacity":0, "margin-top":-pixels});
  header.delay(1000).animate({opacity:1,"margin-top":0},del);

  footer.css({"opacity":0, "padding-bottom":50+pixels});
  footer.delay(1400).animate({opacity:1,"padding-bottom":50},del);

  right_nav.css({"opacity":0, "margin-top":-pixels});
  right_nav.delay(1100).animate({opacity:1, "margin-top":0},del);

  line.css({"opacity":0, "width":40});
  text.css({"opacity":0});
  text.css({"margin-top":-pixels});
  line.animate({opacity:1, "width":80},del,function(){
    text.animate({"opacity":1, "margin-top":0},del);
  });

});