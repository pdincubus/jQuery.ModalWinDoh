# jquery.ModalWinDoh plugin

A "lightbox" type modal window plugin for jQuery. Currently only for opening images bigger!

This is going to be slightly more complicated than your average modal window plugin to set up, but with good reason.

I've built in "preOpen", "postOpen", "preClose" and "postClose" triggers as well as a callback option which will give you LOTS of flexibility to enhance the basics.

## Basic setup

First, you're going to need some HTML. A link which we'll use to trigger the modal opening, and below that is the scaffold of our actual modal win d'oh.

```html
<a href="img/8478551008_ecbdec0cfe_o.jpg" class="modalWinDoh">Open modal</a>

<div class="modalWinDohContainer">
    <div class="content">
        <img src="" alt="">
    </div>
    <span class="close">&times;</span>
</div>
```

## Initialise the plugin

Now that's done, we need to initialise the plugin, and if we want them add the necessary 'on' triggers too.

```javascript
$('.modalWinDohContainer').modalWinDoh({
    overlayAnimationSpeed       : 1000,
    overlayEasing               : 'easeInOutExpo',
    modalAnimationSpeed         : 500,
    modalEasing                 : 'linear'
}).on('modalWinDoh.preOpen', function() {
    console.log('preOpen');
}).on('modalWinDoh.postOpen', function() {
    console.log('postOpen');
}).on('modalWinDoh.preClose', function() {
    console.log('preClose');
}).on('modalWinDoh.postClose', function() {
    console.log('postClose');
});
```

or you could chain the 'on' stuff the nicer way:

```javascript
$('.modalWinDohContainer').modalWinDoh({
    overlayAnimationSpeed       : 1000,
    overlayEasing               : 'easeInOutExpo',
    modalAnimationSpeed         : 500,
    modalEasing                 : 'linear'
}).on({
    'modalWinDoh.preOpen': function() {
        console.log('preOpen');
    },
    'modalWinDoh.postOpen': function() {
        console.log('postOpen');
    },
    'modalWinDoh.preClose': function() {
        console.log('preClose');
    },
    'modalWinDoh.postClose': function() {
        console.log('postClose');
    }
});
```

## Events to open and close the modal

Next, we're going to need to set the basics out for how to open our modal window:

```javascript
$('.modalWinDoh').on('click', function(evt) {
    evt.preventDefault();
    var that = $(this);

    $('.modalWinDohContainer').modalWinDoh('open', function() {
        this.find('img').attr('src', that.attr('href')).css({
            maxWidth: $(window).width(),
            maxHeight: $(window).height()
        });
    });
});
```

And some stuff for closing by clicking the 'close' button we've added to our scaffoldingness. And because we can, we can also do a keyUp check so that pressing escape will trigger the modal close method.

```javascript
$('.close, #modalWinDohOverlay').on('click', function(evt) {
    evt.preventDefault();

    $('.modalWinDohContainer').modalWinDoh('close', function() {
        this.find('img').attr('src', '');
    });
});

$(window).on('keyup', function(evt) {
    if(evt.keyCode == 27) {
        $('.modalWinDohContainer').modalWinDoh('close', function() {
            this.find('img').attr('src', '');
        });
    }
});
```

Everything else is down to you. Do what you want with it. But here's some CSS which might help a little...

```css
#modalWinDohOverlay {
    display: none;
    /* http://www.visualcsstools.com/ an excellent gradient generator, give it some love */
    background-image: -webkit-gradient(radial, 50% 50%, 0, 50% 50%, 114, color-stop(30%, #808080), color-stop(100%, #000000));
    background-image: -webkit-radial-gradient(center center, farthest-side circle, #808080 30%, #000000 100%);
    background-image: -moz-radial-gradient(center center, farthest-side circle, #808080 30%, #000000 100%);
    background-image: -ms-radial-gradient(center center, farthest-side circle, #808080 30%, #000000 100%);
    background-image: -o-radial-gradient(center center, farthest-side circle, #808080 30%, #000000 100%);
    background-image: radial-gradient(farthest-side circle at center center, #808080 30%, #000000 100%);
}

.modalWinDohContainer {
    display: none;
}

.modalWinDohContainer .content {
    position: relative;
    max-width: 100%;
    max-height: 100%;
}

.modalWinDohContainer .content img {
    max-width: 100%;
    max-height: 100%;
    vertical-align: bottom;
}

.modalWinDohContainer .close {
    display: block;
    position: absolute;
    top: 0px;
    right: 0px;
    background: red;
    color: #fff;
    text-align: center;
    padding: 10px;
    cursor: pointer;
}
```

# Disclaimer and stuff

I wrote this because I needed it for something. You might or might not need it. If you use it and it eats your hamster, sure, I'm really sorry about your hamster but don't say I didn't warn you!

I've only tested this is Chrome and Firefox.