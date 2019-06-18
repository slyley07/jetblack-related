let parts = [
  {
    'name': 'Essentials',
    'heading': 'Your life essentials<span class="unbold">&mdash;</span><br />one text away.',
    'text': 'After your cataloging appointment, we&rsquo;ll know all your go-to essentials to make shopping a snap. No more lists or running out last-minute. Simply text us when you&rsquo;re running low and we&rsquo;ll take it from there.',
  },
  {
    'name': 'Returns',
    'heading': 'Return items<span class="unbold">&mdash;</span><br />exactly when you need to.',
    'text': 'Jetblack offers fast and free courier delivery (or shipping to a destination!) so you minimize your carbon footprint. Did something not work out? Simply text us and we&rsquo;ll pick it up&mdash;for free.',
  },
  {
    'name': 'TakeaPic',
    'heading': 'Take and send us a pic<span class="unbold">&mdash;</span><br />we&rsquo;ll find it.',
    'text': 'Whether it&rsquo;s a shirt you saw at your favorite department store or a new cooking set for sale online, don&rsquo;t worry about spending time going through a lengthy checkout process. Simply text us your screenshot and we&rsquo;ll find it.',
  },
  {
    'name': 'TrustUs',
    'heading': 'Trust us<span class="unbold">&mdash;</span><br />our members know best.',
    'text': 'Jetblack&rsquo;s picks are powered by our members&mdash;busy New Yorkers, just like you, who know their stuff inside and out. All of our picks are curated with people like you in mind.',
  },
  {
    'name': 'PartiesGifts',
    'heading': 'Parties and gifts<span class="unbold">&mdash;</span><br />made seriously simple.',
    'text': 'Our gifting specialists have found the best presents for every age, gender, and interest. Each one comes gift wrapped and can be delivered to you or the guest of honor. Hosting a party? J has you covered with party themes to choose from, complete with pre-assembled goodie bags.',
  }
];

const path = './public/imgs/';
let index = 0;
let $ = (item) => {
  return document.getElementById(item);
}

let changeInfo = (i) => {
  index = i;
  let part = parts[index];
  let icon = path + 'icons/' + index + '_' + part.name + '.svg';
  let img = path + index + '_Mobile_' + part.name + '.png';

  $('carousel-icon').src = icon;
  $('carousel-heading').innerHTML = part.heading;
  $('carousel-img').src = img;

  if (index === 0) {
    $('left-arrow').style.display = 'none';
  } else if (index === 4) {
    $('right-arrow').style.display = 'none';
  } else {
    $('left-arrow').style.display = 'block';
    $('right-arrow').style.display = 'block';
  }

  changeDot(index);
}

let changeDot = (index) => {
    for (let i = 0; i < parts.length; i++) {
      if (document.getElementsByClassName('dot').length < parts.length) {
        $('carousel-dots').innerHTML += '<img src="' + path + 'icons/Dot_Outlined.svg" class="dot" onclick="changeInfo(' + i + ')" alt="">';
      } else {
        document.getElementsByClassName('dot')[i].src = path + 'icons/Dot_Outlined.svg';
      }
    }

  document.getElementsByClassName('dot')[index].src = path + 'icons/Dot_Filled.svg'
}

let mover = (dir) => {
  if (dir === 'right') {
    index++;
    changeInfo(index);
  } else if (dir === 'left') {
    index--;
    changeInfo(index);
  }
}

let w = window.innerWidth;


let resizer = (w) => {

  document.getElementById('imgs').innerHTML = '';

  if (w < 641) {
    changeInfo(index);
  } else {

    for (let [i, part] of parts.entries()) {
      let icon = path + 'icons/' + i + '_' + part.name + '.svg';
      let img = path + i + '_Desktop_' + part.name + '.png'

      document.getElementById('imgs').innerHTML += '<div class="block"><img src=' + icon + ' class="block-icon"><h2 class="block-h ' + part.name + '">' + part.heading + '</h2><p class="block-p ' + part.name + '-p">' + part.text + '</p><img class="block-img ' + part.name + '-img" src="' + img + '" alt=""></div>';
    }
  }
}

var myEfficientFn = debounce(function() {
  w = window.innerWidth;
	resizer(w);
}, 250);

function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

window.addEventListener('resize', myEfficientFn);


// window.onresize = function(e) {
//
//     resizer(w);
// }
resizer(w);
