import {
    useEffect,
    useReducer,
    useRef,
    useState,
} from "react";

import "./App.css";

const TILE = 40;
const WIDTH = 20;
const HEIGHT = 13;

const levels = [

    {
        title: "Office Data Breach",
        theme: "office",
        story: "A multinational company discovered confidential records were leaked before a merger announcement.",
        mission: "Identify insider-assisted theft evidence.",
        walls: [{ x: 6, y: 4 }, { x: 6, y: 5 }, { x: 6, y: 6 }],
        hazards: [],
        evidence: [
            {
                id: 1,
                x: 3,
                y: 2,
                question: "Which evidence suggests insider theft?",
                options: ["Encrypted USB Device", "Coffee Receipt", "Movie Ticket", "Printer Manual"],
                answer: 0,
            },
            {
                id: 2,
                x: 15,
                y: 8,
                question: "Which evidence indicates suspicious remote access?",
                options: ["VPN Login From Foreign IP", "Music Playlist", "Travel Ticket", "Wallpaper"],
                answer: 0,
            },
        ],
        enemies: [{ id: 1, type: "car", x: 10, y: 5, dir: 1 }],
    }, {
        title: "Phishing Attack",
        theme: "phishing",
        story: "Employees clicked phishing emails disguised as banking notices.",
        mission: "Identify phishing-related evidence.",
        walls: [{ x: 5, y: 3 }, { x: 5, y: 4 }, { x: 5, y: 5 }],
        hazards: [{ x: 10, y: 8 }],
        evidence: [
            {
                id: 1,
                x: 2,
                y: 2,
                question: "Which evidence indicates phishing activity?",
                options: ["Fake Banking Login Website", "Movie Ticket", "Receipt", "Printer Driver"],
                answer: 0,
            },
            {
                id: 2,
                x: 15,
                y: 7,
                question: "What commonly steals credentials?",
                options: ["Phishing Email Attachment", "Music File", "Travel Brochure", "Wallpaper"],
                answer: 0,
            },
        ],
        enemies: [{ id: 1, type: "car", x: 8, y: 5, dir: 1 }],
    },

    {
        title: "Ransomware Incident",
        theme: "hospital",
        story: "A hospital network was encrypted by ransomware attackers.",
        mission: "Recover ransomware evidence.",
        walls: [{ x: 9, y: 3 }, { x: 9, y: 4 }, { x: 9, y: 5 }],
        hazards: [{ x: 5, y: 8 }, { x: 6, y: 8 }],
        evidence: [
            {
                id: 1,
                x: 3,
                y: 3,
                question: "Which evidence indicates ransomware activity?",
                options: ["Ransom Note", "Wallpaper", "Photo Album", "Cinema Ticket"],
                answer: 0,
            },
            {
                id: 2,
                x: 14,
                y: 9,
                question: "What commonly spreads ransomware?",
                options: ["Malicious Email Attachment", "Music Playlist", "Printer Ink", "Calendar"],
                answer: 0,
            },
        ],
        enemies: [
            { id: 1, type: "car", x: 7, y: 4, dir: 1 },
            { id: 2, type: "car", x: 13, y: 7, dir: -1 },
        ],
    }, {
        title: "Social Media Stalker",
        theme: "city",
        story: "A victim was stalked using fake profiles and GPS tracking.",
        mission: "Identify stalking-related evidence.",
        walls: [{ x: 6, y: 6 }, { x: 7, y: 6 }, { x: 8, y: 6 }],
        hazards: [],
        evidence: [
            {
                id: 1,
                x: 2,
                y: 9,
                question: "Which evidence suggests cyberstalking?",
                options: ["Threatening Messages", "Movie Ticket", "Gym Card", "Restaurant Receipt"],
                answer: 0,
            },
            {
                id: 2,
                x: 16,
                y: 2,
                question: "What exposes user location data?",
                options: ["Public GPS Check-ins", "Calculator App", "Music Player", "Wallpaper"],
                answer: 0,
            },
        ],
        enemies: [{ id: 1, type: "hunter", x: 15, y: 5 }],
    },

    {
        title: "Mobile Phone Forensics",
        theme: "lab",
        story: "Forensic analysts recovered deleted mobile records linked to cybercrime.",
        mission: "Recover mobile forensic evidence.",
        walls: [{ x: 4, y: 2 }, { x: 5, y: 2 }, { x: 6, y: 2 }, { x: 10, y: 8 }, { x: 11, y: 8 }],
        hazards: [{ x: 14, y: 9 }],
        evidence: [
            {
                id: 1,
                x: 4,
                y: 4,
                question: "Which evidence is recovered during mobile forensics?",
                options: ["Deleted SMS Messages", "Wallpaper", "Poster", "Music File"],
                answer: 0,
            },
            {
                id: 2,
                x: 15,
                y: 8,
                question: "What reconstructs communication history?",
                options: ["Call Log Database", "Travel Ticket", "Food Menu", "Printer Driver"],
                answer: 0,
            },
        ],
        enemies: [
            { id: 1, type: "car", x: 8, y: 9, dir: 1 },
            { id: 2, type: "hunter", x: 15, y: 4 },
        ],
    },

    {
        title: "Dark Web Investigation",
        theme: "darkweb",
        story: "Investigators infiltrated a hidden marketplace distributing malware tools.",
        mission: "Track dark web criminal evidence.",
        walls: [{ x: 4, y: 4 }, { x: 5, y: 4 }, { x: 6, y: 4 }, { x: 12, y: 7 }, { x: 13, y: 7 }],
        hazards: [{ x: 8, y: 10 }, { x: 9, y: 10 }],
        evidence: [
            {
                id: 1,
                x: 3,
                y: 9,
                question: "Which evidence links suspects to dark web activity?",
                options: ["Encrypted Marketplace Chat Logs", "Wallpaper", "Movie Poster", "Coffee Receipt"],
                answer: 0,
            },
            {
                id: 2,
                x: 16,
                y: 3,
                question: "What is commonly sold on dark web markets?",
                options: ["Stolen Credentials", "Restaurant Coupons", "Movie Tickets", "Wallpaper Packs"],
                answer: 0,
            },
        ],
        enemies: [
            { id: 1, type: "hunter", x: 14, y: 4 },
            { id: 2, type: "hunter", x: 10, y: 8 },
        ],
    }, {
        title: "AI Deepfake Crime",
        theme: "ai",
        story: "Criminals used AI-generated deepfake videos and cloned voices.",
        mission: "Identify deepfake-related evidence.",
        walls: [{ x: 5, y: 5 }, { x: 6, y: 5 }, { x: 7, y: 5 }, { x: 12, y: 2 }, { x: 12, y: 3 }],
        hazards: [{ x: 15, y: 9 }],
        evidence: [
            {
                id: 1,
                x: 2,
                y: 3,
                question: "Which evidence indicates deepfake technology?",
                options: ["AI Generated Voice Clone", "Travel Ticket", "Email", "Menu"],
                answer: 0,
            },
            {
                id: 2,
                x: 16,
                y: 7,
                question: "What technology generates fake human faces?",
                options: ["GAN AI Models", "Calculator App", "Printer Driver", "Music Player"],
                answer: 0,
            },
        ],
        enemies: [{ id: 1, type: "tank", x: 14, y: 6 }],
    },

    {
        title: "International Cybercrime Network",
        theme: "boss",
        story: "An international cybercrime syndicate launched coordinated global attacks.",
        mission: "Destroy the cybercrime network.",
        walls: [{ x: 5, y: 1 }, { x: 5, y: 2 }, { x: 5, y: 3 }, { x: 10, y: 5 }, { x: 11, y: 5 }, { x: 12, y: 5 }],
        hazards: [{ x: 7, y: 10 }, { x: 8, y: 10 }, { x: 13, y: 2 }, { x: 13, y: 3 }],
        evidence: [
            {
                id: 1,
                x: 18,
                y: 10,
                question: "Which evidence confirms money laundering activity?",
                options: ["Cryptocurrency Transaction Chain", "Hotel Reservation", "Movie Ticket", "Food Delivery"],
                answer: 0,
            },
            {
                id: 2,
                x: 2,
                y: 10,
                question: "What technology hides criminal transactions?",
                options: ["Cryptocurrency Mixers", "Wallpaper Apps", "Travel Maps", "Photo Filters"],
                answer: 0,
            },
        ],
        enemies: [
            { id: 1, type: "tank", x: 15, y: 3 },
            { id: 2, type: "hunter", x: 10, y: 9 },
        ],
    },

];
const createInitialState = () => ({
    level: 0,
    hp: 10,
    score: 0,
    player: { x: 0, y: 0 },
    bullets: [],
    evidence: levels[0].evidence,
    enemies: levels[0].enemies,
    message: "Investigate the cybercrime case.",
    gameOver: false,
    gameWin: false,
});

function reducer(state, action) {
    switch (action.type) {
        case "MOVE_PLAYER": {
            let nx = state.player.x;
            let ny = state.player.y;
            if (action.key === "w") ny--;
            if (action.key === "s") ny++;
            if (action.key === "a") nx--;
            if (action.key === "d") nx++;
            nx = Math.max(0, Math.min(WIDTH - 1, nx));
            ny = Math.max(0, Math.min(HEIGHT - 1, ny));
            const blocked = levels[state.level].walls.some(w => w.x === nx && w.y === ny);
            if (blocked) return state;
            return { ...state, player: { x: nx, y: ny } };
        }

        case "MOVE_ENEMIES": {
            const newBullets = [...state.bullets];
            const updatedEnemies = state.enemies.map(enemy => {
                if (enemy.type === "car") {
                    let nx = enemy.x + enemy.dir;
                    let nd = enemy.dir;
                    if (nx <= 0 || nx >= WIDTH - 1) { nd *= -1; nx = enemy.x + nd; }
                    return { ...enemy, x: nx, dir: nd };
                }
                if (enemy.type === "hunter") {
                    if (Math.random() < 0.5) return enemy;
                    let nx = enemy.x;
                    let ny = enemy.y;
                    if (state.player.x > enemy.x) nx++;
                    if (state.player.x < enemy.x) nx--;
                    if (state.player.y > enemy.y) ny++;
                    if (state.player.y < enemy.y) ny--;
                    return { ...enemy, x: nx, y: ny };
                }
                if (enemy.type === "tank") {
                    let nx = enemy.x;
                    let ny = enemy.y;
                    const dir = Math.floor(Math.random() * 4);
                    if (dir === 0) nx++;
                    if (dir === 1) nx--;
                    if (dir === 2) ny++;
                    if (dir === 3) ny--;
                    if (Math.random() < 0.25) {
                        let dx = 0;
                        let dy = 0;
                        if (Math.abs(state.player.x - enemy.x) > Math.abs(state.player.y - enemy.y)) {
                            dx = state.player.x > enemy.x ? 1 : -1;
                        } else {
                            dy = state.player.y > enemy.y ? 1 : -1;
                        }
                        newBullets.push({ x: enemy.x, y: enemy.y, dx, dy });
                    }
                    return { ...enemy, x: nx, y: ny };
                }
                return enemy;
            });

            const updatedBullets = newBullets.map(b => ({ ...b, x: b.x + b.dx, y: b.y + b.dy })).filter(b => b.x >= 0 && b.x < WIDTH && b.y >= 0 && b.y < HEIGHT);
            return { ...state, enemies: updatedEnemies, bullets: updatedBullets };
        }

        case "TAKE_DAMAGE": {
            const newHp = Math.max(state.hp - 1, 0);
            return {

                ...state,

                hp: newHp,

                player: {
                    x: 0,
                    y: 0,
                },

                message:
                "You were hit by an enemy! HP -1",

                gameOver: newHp <= 0,

            };
        }

        case "ANSWER_QUESTION": {
            const correct = action.answer === action.correct;
            const updatedEvidence = state.evidence.filter(e => e.id !== action.evidenceId);
            return {
                ...state,
                hp: correct ? state.hp : Math.max(state.hp - 1, 0),
                score: correct ? state.score + 30 : state.score,
                evidence: updatedEvidence,
                message:
                    correct
                        ? "Correct Evidence! +30 Score"
                        : "Incorrect Forensic Analysis! HP -1",
                gameOver: !correct && state.hp - 1 <= 0,
            };
        } case "NEXT_LEVEL": {
            const next = state.level + 1;
            if (next >= levels.length) {
                return { ...state, gameWin: true };
            }
            return {
                ...state,
                level: next,
                evidence: levels[next].evidence,
                enemies: levels[next].enemies,
                bullets: [],
                player: { x: 0, y: 0 },
            };
        }

        case "RESET_GAME":
            return createInitialState();

        default:
            return state;
    }
}

function App() {

    const [state, dispatch] = useReducer(reducer, createInitialState());
    const [question, setQuestion] = useState(null);
    const [showTutorial, setShowTutorial] =
        useState(true);
    const collisionCooldown = useRef(false);
    const level = levels[state.level];

    useEffect(() => {
        const move = e => {
            const key = e.key.toLowerCase();
            if (["w", "a", "s", "d"].includes(key)) {
                dispatch({ type: "MOVE_PLAYER", key });
            }
        };
        window.addEventListener("keydown", move);
        return () => window.removeEventListener("keydown", move);
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            dispatch({ type: "MOVE_ENEMIES" });
        }, 500);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        if (collisionCooldown.current) return;
        const hitEnemy = state.enemies.some(e => e.x === state.player.x && e.y === state.player.y);
        const hitBullet = state.bullets.some(b => b.x === state.player.x && b.y === state.player.y);
        const hitHazard = level.hazards.some(h => h.x === state.player.x && h.y === state.player.y);
        if (hitEnemy || hitBullet || hitHazard) {
            collisionCooldown.current = true;
            dispatch({ type: "TAKE_DAMAGE" });
            setTimeout(() => { collisionCooldown.current = false; }, 1000);
        }
    }, [state.player, state.enemies, state.bullets]);

    useEffect(() => {
        const found = state.evidence.find(e => e.x === state.player.x && e.y === state.player.y);
        if (found) { setQuestion(found); }
    }, [state.player]);

    const answerQuestion = answer => {
        dispatch({ type: "ANSWER_QUESTION", answer, correct: question.answer, evidenceId: question.id });
        setQuestion(null);
        if (state.evidence.length <= 1) {
            setTimeout(() => { dispatch({ type: "NEXT_LEVEL" }); }, 1000);
        }
    }; return (
        <div className={`gameContainer ${level.theme}`}>
            <h1>Cyber Forensics Escape</h1>
            <div className="stats">
                <p>HP: {state.hp}/10</p>
                <p>Score: {state.score}</p>
                <p>Level: {state.level + 1}</p>
            </div>
            <div className="storyBox">
                <h2>{level.title}</h2>
                <p>{level.story}</p>
                <p>{level.mission}</p>
            </div>
            <div
                className={
                    state.message.includes("+30")
                        ? "messageBox goodMessage"
                        : state.message.includes("HP -1")
                            ? "messageBox badMessage"
                            : "messageBox"
                }
            >

                {state.message}

            </div>
            <div
                className="board"
                style={{
                    width: WIDTH * TILE,
                    height: HEIGHT * TILE
                }}
            >
                {Array.from({ length: WIDTH * HEIGHT }).map((_, i) => <div key={i} className="tile" />)}
                {level.walls.map((w, i) => <div key={i} className="wall" style={{ left: w.x * TILE, top: w.y * TILE }}>🧱</div>)}
                {level.hazards.map((h, i) => <div key={i} className="hazard" style={{ left: h.x * TILE, top: h.y * TILE }}>⚡</div>)}
                {state.evidence.map(e => <div key={e.id} className="evidence" style={{ left: e.x * TILE, top: e.y * TILE }}>🔍</div>)}
                {state.enemies.map(enemy => <div key={enemy.id} className="enemy" style={{ left: enemy.x * TILE, top: enemy.y * TILE }}>{enemy.type === "tank" ? "🤖" : enemy.type === "hunter" ? "👾" : "🚘"}</div>)}
                {state.bullets.map((b, i) => <div key={i} className="bullet" style={{ left: b.x * TILE, top: b.y * TILE }}>🔥</div>)}
                <div className="player" style={{ left: state.player.x * TILE, top: state.player.y * TILE }}>🕵️</div>
            </div>

            {question && (
                <div className="popup">
                    <div className="popupBox">
                        <h2>Digital Evidence Analysis</h2>
                        <p>{question.question}</p>
                        <div className="buttons">
                            {question.options.map((op, index) => <button key={index} onClick={() => answerQuestion(index)}>{op}</button>)}
                        </div>
                    </div>
                </div>
            )}

            {state.gameOver && (
                <div className="popup">
                    <div className="popupBox">
                        <h1>Mission Failed</h1>
                        <button onClick={() => dispatch({ type: "RESET_GAME" })}>Restart</button>
                    </div>
                </div>
            )}

            {state.gameWin && (
                <div className="popup">
                    <div className="popupBox">
                        <h1>Global Cybercrime Network Destroyed</h1>
                        <p>Final Score: {state.score}</p>
                        <button onClick={() => dispatch({ type: "RESET_GAME" })}>Play Again</button>
                    </div>
                </div>
            )}

        </div>
    );
}

export default App;