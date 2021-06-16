/*
* Copyright 2021 EagleOnGitHub
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*     http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
let canvas = document.getElementById("a");
let ctx = canvas.getContext("2d");
let size = 20;
let tile = 20;
let fps = 6;
let segments = [];
let position = { x: size / 2, y: size / 2 };
let length = 1;
let last_time = Date.now();
function random_food_position() {
    return {
        x: Math.floor(Math.random() * size),
        y: Math.floor(Math.random() * size),
    };
}
let food_position = random_food_position();
let direction = { x: 1, y: 0 };
function didGameEnd() {
    for (let i = 4; i < segments.length; i++) {
        const didCollide =
            segments[i].x === segments[0].x && segments[i].y === segments[0].y;
        if (didCollide) return true;
    }
    return false;
}

function draw() {
    ctx.clearRect(0, 0, size * tile, size * tile);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, size * tile, size * tile);
    ctx.fillStyle = "limegreen";
    segments.forEach(function (segment) {
        ctx.fillRect(segment.x * tile, segment.y * tile, tile, tile);
    });
    ctx.fillStyle = "rgb(255, 0, 0)";
    ctx.fillRect(food_position.x * tile, food_position.y * tile, tile, tile);
}

function end_game(message) {
    alert(message);
    throw new Error("Game over.");
}

function move() {
    position = { x: position.x + direction.x, y: position.y + direction.y };
    ["x", "y"].forEach((direction) => {
        while (position[direction] < 0) position[direction] += size;
        while (position[direction] >= size) position[direction] -= size;
    });
    segments.push(position);
    if (didGameEnd()) {
        end_game("You lost!");
    }
    while (segments.length > length) segments.shift();
    if (position.x === food_position.x && position.y === food_position.y) {
        length++;
        document.getElementById("b").innerHTML = length;
        food_position = random_food_position();
        segments.forEach((item) => {
            if (food_position.x == item.x && food_position.y == item.y) {
                food_position = random_food_position();
            }
        });
    }
}

document.addEventListener("keydown", (e) => {
    let key = e.code;
    if (key == "KeyA") {
        if (direction.x === 0) {
            direction = { x: -1, y: 0 };
        }
    }
    if (key == "ArrowLeft") {
        if (direction.x === 0) {
            direction = { x: -1, y: 0 };
        }
    }
    if (key == "KeyS") {
        if (direction.y === 0) {
            direction = { x: 0, y: 1 };
        }
    }
    if (key == "ArrowDown") {
        if (direction.y === 0) {
            direction = { x: 0, y: 1 };
        }
    }
    if (key == "KeyD") {
        if (direction.x === 0) {
            direction = { x: 1, y: 0 };
        }
    }
    if (key == "ArrowRight") {
        if (direction.x === 0) {
            direction = { x: 1, y: 0 };
        }
    }
    if (key == "KeyW") {
        if (direction.y === 0) {
            direction = { x: 0, y: -1 };
        }
    }
    if (key == "ArrowUp") {
        if (direction.y === 0) {
            direction = { x: 0, y: -1 };
        }
    }
});

function loop(win) {
    let fps_interval = 1000 / fps;
    let current_time = Date.now();
    let elapsed = current_time - last_time;
    win.requestAnimationFrame(() => {
        if (elapsed > fps_interval) {
            move();
            draw();
            last_time = current_time - (elapsed % fps_interval);
        }
        loop(win);
    });
}

loop(window);
