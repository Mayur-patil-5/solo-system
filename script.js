// ======================================
// 1. WELCOME SCREEN TRANSITION
// ======================================

const welcomeScreen = document.getElementById("welcomeScreen");
const dashboardScreen = document.getElementById("dashboardScreen");
const acceptButton = document.getElementById("acceptButton");

acceptButton.addEventListener("click", function () {

    welcomeScreen.classList.add("glitch");

    setTimeout(function () {
        welcomeScreen.style.display = "none";

        dashboardScreen.classList.remove("hidden");
        dashboardScreen.classList.add("reveal");

    }, 500);

});


// ======================================
// 2. PLAYER DATA
// ======================================

const defaultPlayer = {
    name: "MAYUR",
    level: 1,
    rank: "E",

    hp: 100,
    maxHp: 100,

    mp: 100,
    maxMp: 100,

    xp: 120,
    xpRequired: 500,

    stats: {
        str: 10,
        agi: 10,
        vit: 10,
        int: 10,
        sen: 10
    },

    availablePoints: 5
};


// ======================================
// 3. LOAD SAVED PLAYER DATA
// ======================================

let player;

const savedPlayer = localStorage.getItem("soloPlayer");

if (savedPlayer) {
    player = JSON.parse(savedPlayer);
} else {
    player = structuredClone(defaultPlayer);
}


// ======================================
// 4. SAVE PLAYER DATA
// ======================================

function savePlayer() {
    localStorage.setItem("soloPlayer", JSON.stringify(player));
}


// ======================================
// 5. DISPLAY PLAYER INFORMATION
// ======================================

function updateDashboard() {

    document.getElementById("playerName").textContent =
        player.name;

    document.getElementById("playerLevel").textContent =
        player.level;

    document.getElementById("hunterRank").textContent =
        player.rank;

    // HP
    document.getElementById("hpText").textContent =
        `${player.hp} / ${player.maxHp}`;

    document.getElementById("hpBar").style.width =
        `${(player.hp / player.maxHp) * 100}%`;

    // MP
    document.getElementById("mpText").textContent =
        `${player.mp} / ${player.maxMp}`;

    document.getElementById("mpBar").style.width =
        `${(player.mp / player.maxMp) * 100}%`;

    // XP
    document.getElementById("xpText").textContent =
        `${player.xp} / ${player.xpRequired} XP`;

    document.getElementById("xpBar").style.width =
        `${(player.xp / player.xpRequired) * 100}%`;

    // STATS
    document.getElementById("strValue").textContent =
        player.stats.str;

    document.getElementById("agiValue").textContent =
        player.stats.agi;

    document.getElementById("vitValue").textContent =
        player.stats.vit;

    document.getElementById("intValue").textContent =
        player.stats.int;

    document.getElementById("senValue").textContent =
        player.stats.sen;

    // AVAILABLE POINTS
    document.getElementById("pointsValue").textContent =
        player.availablePoints;

    savePlayer();
}


// ======================================
// 6. INCREASE PLAYER ATTRIBUTES
// ======================================

const statButtons = document.querySelectorAll("[data-stat]");

statButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const statName = button.dataset.stat;

        if (player.availablePoints > 0) {

            player.stats[statName]++;

            player.availablePoints--;

            updateDashboard();

        } else {

            alert("You don't have enough stat points!");

        }

    });

});


// ======================================
// 7. LEVEL UP SYSTEM
// ======================================

const levelUpButton = document.getElementById("levelUpButton");

levelUpButton.addEventListener("click", function () {

    if (player.xp >= player.xpRequired) {

        player.xp -= player.xpRequired;

        player.level++;

        player.xpRequired = Math.floor(
            player.xpRequired * 1.5
        );

        player.availablePoints += 5;

        player.hp = player.maxHp;
        player.mp = player.maxMp;

        updateDashboard();

        alert("LEVEL UP! You have earned 5 stat points.");

    } else {

        alert(
            `You need ${player.xpRequired - player.xp} more XP to level up!`
        );

    }

});


// ======================================
// 8. RESET PLAYER (OPTIONAL)
// ======================================

function resetPlayer() {

    localStorage.removeItem("soloPlayer");

    player = structuredClone(defaultPlayer);

    updateDashboard();

}


// ======================================
// 9. ORIGINAL ANIMATED NEURON NETWORK
// ======================================

(function () {

    const NS = "http://www.w3.org/2000/svg";

    let seed = 1;

    const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;


    function rnd() {
        seed = (seed * 16807) % 2147483647;
        return (seed - 1) / 2147483646;
    }


    function el(name, attrs, parent) {

        const element = document.createElementNS(NS, name);

        for (const key in attrs) {
            element.setAttribute(key, attrs[key]);
        }

        parent.appendChild(element);

        return element;
    }


    function f(number) {
        return number.toFixed(1);
    }


    function Web(id, x, y, w, h, count, dist, pulses, initialSeed) {

        seed = initialSeed;

        const group = document.getElementById(id);

        const nodes = [];
        const bend = [];

        const far = el("path", {
            fill: "none",
            stroke: "#5aaeff",
            "stroke-width": .5,
            "stroke-opacity": .35
        }, group);

        const near = el("path", {
            fill: "none",
            stroke: "#9fd8ff",
            "stroke-width": .7,
            "stroke-opacity": .8
        }, group);

        const dend = el("path", {
            fill: "none",
            stroke: "#9fd8ff",
            "stroke-width": .5,
            "stroke-opacity": .6
        }, group);


        // CREATE NODES

        for (let i = 0; i < count; i++) {

            const node = {
                x: x + rnd() * w,
                y: y + rnd() * h,

                vx: (rnd() - .5) * .3,
                vy: (rnd() - .5) * .3,

                r: .7 + rnd() * 1.6,

                dx: 0,
                dy: 0
            };

            const angle = rnd() * 6.283;
            const length = 3 + rnd() * 6;

            node.dx = Math.cos(angle) * length;
            node.dy = Math.sin(angle) * length;


            if (node.r > 1.8) {

                node.halo = el("circle", {
                    r: node.r * 2.6,
                    fill: "#3d8bff",
                    "fill-opacity": .35,
                    class: "pulse"
                }, group);

                node.halo.style.animationDelay =
                    (-rnd() * 3) + "s";

            }


            node.dot = el("circle", {
                r: node.r,
                fill: "#dff2ff"
            }, group);

            nodes.push(node);

            bend.push([]);

        }


        // CONNECTION CURVES

        for (let i = 0; i < count; i++) {

            for (let j = 0; j < count; j++) {

                bend[i][j] = (rnd() - .5) * .6;

            }

        }


        // LIGHT SIGNALS

        const signals = [];

        for (let i = 0; i < pulses; i++) {

            signals.push({

                a: Math.floor(rnd() * count),
                b: -1,

                t: 0,

                speed: .008 + rnd() * .01,

                halo: el("circle", {
                    r: 4,
                    fill: "#5ab4ff",
                    "fill-opacity": .5
                }, group),

                dot: el("circle", {
                    r: 1.7,
                    fill: "#ffffff"
                }, group)

            });

        }


        // FIND NEIGHBOUR NODE

        function neighbour(a) {

            const list = [];

            for (let k = 0; k < count; k++) {

                if (k === a) continue;

                const dx = nodes[a].x - nodes[k].x;
                const dy = nodes[a].y - nodes[k].y;

                if (dx * dx + dy * dy < dist * dist) {
                    list.push(k);
                }

            }

            return list.length
                ? list[Math.floor(Math.random() * list.length)]
                : -1;

        }


        // ANIMATION FRAME

        function step(dt) {

            let dFar = "";
            let dNear = "";
            let dDend = "";


            // MOVE NODES

            for (let k = 0; k < count; k++) {

                const p = nodes[k];

                p.x += p.vx * dt;
                p.y += p.vy * dt;


                if (p.x < x) {
                    p.x = x;
                    p.vx = Math.abs(p.vx);
                }

                if (p.x > x + w) {
                    p.x = x + w;
                    p.vx = -Math.abs(p.vx);
                }

                if (p.y < y) {
                    p.y = y;
                    p.vy = Math.abs(p.vy);
                }

                if (p.y > y + h) {
                    p.y = y + h;
                    p.vy = -Math.abs(p.vy);
                }


                p.dot.setAttribute("cx", f(p.x));
                p.dot.setAttribute("cy", f(p.y));


                if (p.halo) {

                    p.halo.setAttribute("cx", f(p.x));
                    p.halo.setAttribute("cy", f(p.y));

                }


                dDend +=
                    "M" + f(p.x) + " " + f(p.y) +
                    "l" + f(p.dx) + " " + f(p.dy);

            }


            // CONNECT NODES

            for (let k = 0; k < count; k++) {

                for (let m = k + 1; m < count; m++) {

                    const A = nodes[k];
                    const B = nodes[m];

                    const dx = B.x - A.x;
                    const dy = B.y - A.y;

                    const distance = dx * dx + dy * dy;


                    if (distance < dist * dist) {

                        const c = bend[k][m];

                        const segment =
                            "M" + f(A.x) + " " + f(A.y) +
                            "Q" +
                            f((A.x + B.x) / 2 - dy * c) +
                            " " +
                            f((A.y + B.y) / 2 + dx * c) +
                            " " +
                            f(B.x) + " " + f(B.y);


                        if (distance < dist * dist * .3) {
                            dNear += segment;
                        } else {
                            dFar += segment;
                        }

                    }

                }

            }


            far.setAttribute("d", dFar);
            near.setAttribute("d", dNear);
            dend.setAttribute("d", dDend);


            // MOVE SIGNALS

            signals.forEach(function (q) {

                if (q.b < 0) {

                    q.b = neighbour(q.a);
                    q.t = 0;

                    if (q.b < 0) {
                        q.a = Math.floor(Math.random() * count);
                        return;
                    }

                }


                const A = nodes[q.a];
                const B = nodes[q.b];

                const dx = B.x - A.x;
                const dy = B.y - A.y;


                if (dx * dx + dy * dy > dist * dist) {
                    q.b = -1;
                    return;
                }


                q.t += q.speed * dt;


                if (q.t >= 1) {
                    q.a = q.b;
                    q.b = -1;
                    return;
                }


                const c =
                    bend[Math.min(q.a, q.b)][Math.max(q.a, q.b)] *
                    (q.a < q.b ? 1 : -1);

                const mx = (A.x + B.x) / 2 - dy * c;
                const my = (A.y + B.y) / 2 + dx * c;

                const u = 1 - q.t;

                const px =
                    u * u * A.x +
                    2 * u * q.t * mx +
                    q.t * q.t * B.x;

                const py =
                    u * u * A.y +
                    2 * u * q.t * my +
                    q.t * q.t * B.y;


                q.dot.setAttribute("cx", f(px));
                q.dot.setAttribute("cy", f(py));

                q.halo.setAttribute("cx", f(px));
                q.halo.setAttribute("cy", f(py));

            });

        }


        step(0);


        // START ANIMATION

        if (reduce) return;

        let last = performance.now();

        function loop(now) {

            if (!document.body.contains(group)) return;

            const dt = Math.min((now - last) / 16.67, 3);

            last = now;

            step(dt);

            requestAnimationFrame(loop);

        }

        requestAnimationFrame(loop);

    }


    // LEFT NETWORK
    Web("webL", 108, 100, 146, 327, 42, 62, 6, 11);

    // RIGHT NETWORK
    Web("webR", 708, 100, 146, 327, 42, 62, 6, 29);

})();


// ======================================
// 10. INITIALIZE DASHBOARD DATA
// ======================================

updateDashboard();