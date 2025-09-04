(function ($) {
    "use strict";

    // Split Text
    function bwsplit_text() {
        setTimeout(function () {
            var splitTextElements = $(".sec-title__title, .sec-title__tagline, .page-header__title");
            if (splitTextElements.length === 0) return;
            gsap.registerPlugin(SplitText);
            splitTextElements.each(function (index, element) {
                var splitElement = new SplitText(element, {
                    type: "chars, words", // "chars, words, lines"
                });

                gsap.set(element, {
                    perspective: 400
                });

                if ($(element).hasClass("bw-split-in-fade")) {
                    gsap.set(splitElement.chars, {
                        opacity: 0,
                        ease: "Back.easeOut"
                    });
                }
                if ($(element).hasClass("bw-split-in-right")) {
                    gsap.set(splitElement.chars, {
                        opacity: 0,
                        x: "20",
                        ease: "Back.easeOut"
                    });
                }
                if ($(element).hasClass("bw-split-in-left")) {
                    gsap.set(splitElement.chars, {
                        opacity: 0,
                        x: "-20",
                        ease: "Back.easeOut"
                    });
                }
                if ($(element).hasClass("bw-split-in-up")) {
                    gsap.set(splitElement.chars, {
                        opacity: 0,
                        y: "80",
                        duration: .6,
                        scale: 1,
                        stagger: 0.01,
                        transformOrigin: "0% 50% -50",
                        ease: "Back.back"
                    });
                }
                if ($(element).hasClass("bw-split-in-up-fast")) {
                    gsap.set(splitElement.chars, {
                        opacity: 0,
                        y: "-10",
                        duration: .4,
                        scale: 1,
                        stagger: 0.01,
                        transformOrigin: "0% 50% -50",
                        ease: "Back.back"
                    });
                }
                if ($(element).hasClass("bw-split-in-down")) {
                    gsap.set(splitElement.chars, {
                        opacity: 0,
                        y: "-20",
                        ease: "circ.out"
                    });
                }
                if ($(element).hasClass("bw-split-in-rotate")) {
                    gsap.set(splitElement.chars, {
                        opacity: 0,
                        rotateX: "50deg",
                        ease: "circ.out"
                    });
                }
                if ($(element).hasClass("bw-split-in-scale")) {
                    gsap.set(splitElement.chars, {
                        opacity: 0,
                        rotateX: "50deg",
                        ease: "circ.out"
                    });
                }
                element.anim = gsap.to(splitElement.chars, {
                    scrollTrigger: {
                        trigger: element,
                        toggleActions: "restart pause resume reverse",
                        start: "top 90%"
                    },
                    x: "0",
                    y: "0",
                    rotateX: "0",
                    scale: 1,
                    opacity: 1,
                    duration: 1.2,
                    stagger: 0.02
                });
            });
        }, 200);
    }

    function video_image() {
        gsap.registerPlugin(ScrollTrigger);
        const tl = gsap.timeline({
            ease: "none"
        });
        tl.from(".video img", {
            scale: 0.8,
            duration: 1,
            transformOrigin: "center center"
        }).to({}, {
            duration: 1
        });
        ScrollTrigger.create({
            trigger: ".video",
            start: "center center",
            end: "+=100%",
            pin: true,
            animation: tl,
            scrub: 0.88,
            pinSpacing: false
        });
    }

    function imageSlider() {
        // সব button select করো
        const buttons = document.querySelectorAll(".property-views__button button");

        // প্রত্যেকটা বাটনের জন্য event add করো
        buttons.forEach(button => {
            button.addEventListener("click", function () {
            const direction = this.getAttribute("data-direction");
            nextImage(direction);
            });
        });
        const items = document.querySelectorAll(".property-views__item");
        let currentIndex = 0;

        // Init: শুধু প্রথম ইমেজ দেখানো হবে
        items.forEach((el, i) => {
            gsap.set(el, {
                x: 0,
                y: 0,
                autoAlpha: i === 0 ? 1 : 0,
                zIndex: i === 0 ? 1 : 0
            });
        });

        function nextImage(direction) {
            const total = items.length;
            const nextIndex = (currentIndex + 1) % total;

            const current = items[currentIndex];
            const next = items[nextIndex];

            let fromVars = {},
                toVars = {};

            switch (direction) {
                case 'left':
                    fromVars = {
                        x: '-100%'
                    };
                    toVars = {
                        x: '100%'
                    };
                    break;
                case 'right':
                    fromVars = {
                        x: '100%'
                    };
                    toVars = {
                        x: '-100%'
                    };
                    break;
                case 'top':
                    fromVars = {
                        y: '-100%'
                    };
                    toVars = {
                        y: '100%'
                    };
                    break;
                case 'bottom':
                    fromVars = {
                        y: '100%'
                    };
                    toVars = {
                        y: '-100%'
                    };
                    break;
            }

            // next item animate in
            gsap.set(next, {
                ...fromVars,
                autoAlpha: 1,
                zIndex: 1
            });
            gsap.to(next, {
                duration: 0.8,
                x: 0,
                y: 0,
                ease: "power3.out"
            });

            // current item animate out
            gsap.to(current, {
                duration: 0.8,
                ...toVars,
                ease: "power3.in",
                onComplete: () => {
                    gsap.set(current, {
                        autoAlpha: 0,
                        x: 0,
                        y: 0,
                        zIndex: 0
                    });
                    currentIndex = nextIndex;
                }
            });
        }
    }

    $(window).on("load", function () {
        bwsplit_text();
        video_image();
        imageSlider();
    });

})(jQuery);