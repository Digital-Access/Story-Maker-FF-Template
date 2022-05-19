const config = {
    title: "Text Adventure",
    instruction: "Test your knowledge by playing through the fllowing story and see where the adventure takes you!",
    image: "https://a.storyblok.com/f/112136/373x445/175f800354/lucia-8.png",
    background: "https://a.storyblok.com/f/112136/1920x1409/5ba98e7f92/texture-bg-5efdcf3715f790-74747584-606d864d1b22d1-55861802.jpg",
    background_color: "#25517B",
    end_image: "https://a.storyblok.com/f/112136/205x150/12867bb205/sporting-hero.png",
    end_text: "Well Done! Click the “Next Video” button to proceed now.",
}

const textElement = document.getElementById('textElement');
const optionBtnsElement = document.getElementById('optionBtns');
const option1 = document.getElementById('option1');
const option2 = document.getElementById('option2');
const option3 = document.getElementById('option3');
const option4 = document.getElementById('option4');
const mainContainer = document.getElementById('container');
const endContainer = document.getElementById('endContainer');
const endImg = document.getElementById('endImg');
const endText = document.getElementById('endMessage');
const titleContainer = document.getElementById('titleContainer');
const titleText = document.getElementById('title');
const titleImg = document.getElementById('titleImage');
const instructionText = document.getElementById('instructionText');
const body = document.querySelector('body');

body.style.backgroundImage = `url(${config.background})`
titleImage.src = config.image;
titleText.textContent = config.title;
instructionText.textContent = config.instruction;

let state = {};

const startGame = () => {
    state = {};
    showTextNode(1)
}

const showTextNode = (textNodeIndex) => {
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex);
    textElement.innerText = textNode.text;
    while (optionBtnsElement.firstChild) {
        optionBtnsElement.removeChild(optionBtnsElement.firstChild);
    }
    textNode.options.forEach(option => {
        if (showOption(option)) {
            const button = document.createElement('button');
            button.classList.add('btn');
            button.innerText = option.text;
            button.addEventListener('click', () => selectOption(option))
            optionBtnsElement.appendChild(button)
        }
    })
}

const showOption = (option) => {
    return option.requiredState == null || option.requiredState(state);
}

const selectOption = (option) => {
    const nextTextNodeId = option.nextText;
    if (nextTextNodeId <= 0) {
        startGame()
    } else if (nextTextNodeId === 'endGame') {
        endGame()
    }
    state = Object.assign(state, option.setState);
    showTextNode(nextTextNodeId)
}

const endGame = () => {
    mainContainer.style.display = 'none';
    endContainer.style.display = 'flex';
    endText.textContent = config.end_text;
    endImg.src = config.end_image;
    titleContainer.style.display = 'none';
}

const textNodes = [{
        id: 1,
        text: 'You wake up in a strange place and see a jar of blue goo near you.',
        options: [{
                text: 'Take goo.',
                setState: {
                    id1Option1: true
                },
                nextText: 2
            },
            {
                text: 'Leave it.',
                setState: {
                    id1Option2: true
                },
                nextText: 2
            }
        ]
    },
    {
        id: 2,
        text: 'You venture forth in search of answers to where you are when you come across a merchant.',
        options: [{
                text: 'Trade the goo for a sword.',
                requiredState: (currentState) => currentState.id1Option1,
                setState: {
                    id1Option1: false,
                    id2Option1: true
                },
                nextText: 3
            },
            {
                text: 'Trade the goo for a shield.',
                requiredState: (currentState) => currentState.id1Option1,
                setState: {
                    id1Option1: false,
                    id2Option2: true
                },
                nextText: 3
            },
            {
                text: 'Ignore the merchant',
                requiredState: (currentState) => currentState.id1Option1,
                setState: {
                    id1Option1: false,
                    id2Option3: true
                },
                nextText: 3
            },
            {
                text: 'Buy a sword',
                requiredState: (currentState) => currentState.id1Option2,
                setState: {
                    id1Option1: false,
                    id2Option4: true
                },
                nextText: 3
            }
        ]
    },
    {
        id: 3,
        text: 'After Leaving the merchant you start to feel tired and stumble upon a small town next to a dangerous looking castle.',
        options: [{
                text: 'Explore the castle',
                nextText: 4
            },
            {
                text: 'Find a room to sleep at in the town',
                nextText: 5
            },
            {
                text: 'Find some hay in a stable to sleep in',
                nextText: 6
            }
        ]
    },
    {
        id: 4,
        text: 'You are so tired that you fall asleep while exploring the castle and are killed by a terrible ogre in your sleep.',
        options: [{
            text: 'Restart',
            nextText: -1
        }]
    },
    {
        id: 5,
        text: 'Without any money to buy a room you break into the nearest inn and fall asleep. After a few hours of sleep the owner of the inn finds you and has the town guard lock you in a cell.',
        options: [{
            text: 'Restart',
            nextText: -1
        }]
    },
    {
        id: 6,
        text: 'You wake up well rested and full of energy ready to explore the nearby castle.',
        options: [{
            text: 'Explore the castle',
            nextText: 7
        }]
    },
    {
        id: 7,
        text: 'While exploring the castle you come across a horrible monster in your path.',
        options: [{
                text: 'Try to run',
                nextText: 8
            },
            {
                text: 'Attack it with your sword',
                requiredState: (currentState) => currentState.id2Option1,
                nextText: 9
            },
            {
                text: 'Hide behind your shield',
                requiredState: (currentState) => currentState.id2Option2,
                nextText: 10
            },
            {
                text: 'Throw the blue goo at it',
                requiredState: (currentState) => currentState.id2Option3,
                nextText: 11
            },
            {
                text: 'Attack it with your sword',
                requiredState: (currentState) => currentState.id2Option4,
                nextText: 9
            }
        ]
    },
    {
        id: 8,
        text: 'Your attempts to run are in vain and the monster easily catches.',
        options: [{
            text: 'Restart',
            nextText: -1
        }]
    },
    {
        id: 9,
        text: 'You foolishly thought this monster could be slain with a single sword.',
        options: [{
            text: 'Restart',
            nextText: -1
        }]
    },
    {
        id: 10,
        text: 'The monster laughed as you hid behind your shield and ate you.',
        options: [{
            text: 'Restart',
            nextText: -1
        }]
    },
    {
        id: 11,
        text: 'You threw your jar of goo at the monster and it exploded. After the dust settled you saw the monster was destroyed. Seeing your victory you decide to claim this castle as your and live out the rest of your days there.',
        options: [{
                text: 'Congratulations. Play Again.',
                nextText: -1
            },
            {
                text: 'Congratulations. Finish',
                nextText: 'endGame'
            }
        ]
    }
]

startGame();