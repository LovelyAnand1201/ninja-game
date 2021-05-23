var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

let loadImage = (src, callback) => {
    let img = document.createElement("img");
    img.onload = () => callback(img);
    img.src = src;
};

let imagePath = (frameNumber, animation) => {
    return "images/" + animation + "/" + frameNumber + ".png"
};

let frames = {
    idle: [1, 2, 3, 4, 5, 6, 7, 8],
    kick: [1, 2, 3, 4, 5, 6, 7],
    punch: [1, 2, 3, 4, 5, 6, 7],
    backward: [1, 2, 3, 4, 5, 6],
    forward: [1, 2, 3, 4, 5, 6]
};

let loadImages = (callback) => {
    let images = { idle: [], kick: [], punch: [], backward: [], forward: [] };
    let imagesToLoad = 0;

    ["idle", "kick", "punch", "backward", "forward"].forEach((animation) => {
        let animationFrames = frames[animation];
        imagesToLoad = imagesToLoad + animationFrames.length;

        animationFrames.forEach((frameNumber) => {
            let path = imagePath(frameNumber, animation);

            loadImage(path, (image) => {
                images[animation][frameNumber - 1] = image;
                imagesToLoad = imagesToLoad - 1;

                if (imagesToLoad === 0) {
                    callback(images);
                }
            });
        });
    });
};

let animate = (ctx, images, animation, callback) => {
    images[animation].forEach((image, index) => {
        setTimeout(() => {
            ctx.clearRect(0, 0, 300, 300);
            ctx.drawImage(image, 30, 30, 260, 260);
        }, index * 100);
    });
    setTimeout(callback, images[animation].length * 100);
};

loadImages((images) => {
    let queueAnimations = []
    aux = () => {
        let selectedAnimation;
        if (queueAnimations.length === 0) {
            selectedAnimation = "idle"
        } else {
            selectedAnimation = queueAnimations.shift()
        }
        animate(ctx, images, selectedAnimation, aux)
    }
    aux();
    document.getElementById("kick").onclick = () => {
        queueAnimations.push("kick")
    };

    document.getElementById("punch").onclick = () => {
        queueAnimations.push("punch")
    };

    document.getElementById("backward").onclick = () => {
        queueAnimations.push("backward")
    };

    document.getElementById("forward").onclick = () => {
        queueAnimations.push("forward")
    };

    document.addEventListener("keyup", (event) => {
        const key = event.key;
        if (key === "ArrowLeft") {
            queueAnimations.push("kick")
        } else if (key === "ArrowRight") {
            queueAnimations.push("punch")
        } else if (key === "ArrowUp") {
            queueAnimations.push("backward")
        } else if (key === "ArrowDown") {
            queueAnimations.push("forward")
        }
    });
})