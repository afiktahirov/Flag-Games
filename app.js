const container = document.querySelector(".container");
const menu = document.querySelector(".menu");
const quizMenu =  document.querySelector(".quizMenu");
const but_play = document.querySelector("#play")
const but_options = document.querySelector("#options")
const but_libary = document.querySelector("#libary")
const but_back = document.querySelector("#backButton");
const but_next = document.querySelector("#next");
const quizMenuContent = document.createElement("div");
const spanlevel= document.querySelector("#level");
const spanScore = document.querySelector("#score");
const but_playAgain = document.createElement("button");
const optionMenu = document.querySelector(".option_menu")
const radioButtons = document.querySelectorAll('input[type="radio"]');
const but_backOption = document.querySelector(".option_menu #backButton")
const lib_content = document.querySelector(".lib_content");
const lib_menu = document.querySelector(".libary_menu");
const exit_libary_but = document.querySelector("#exit_libary_but");
 

const audioTrue = new Audio('sound/ture.wav')
const audioFail = new Audio('sound/fail.wav')
const audioEnd = new Audio("sound/gameOver.wav")

let quiz_array = [];




let mainCountry = [];
let mainCountryFlags = [];
let randomData = [];
let randomDataName =[];





let x = 0
let level = 1
let score = 0
spanScore.textContent = score;
let grade = 4;

radioButtons[1].checked = true;






but_back.addEventListener("click",()=>{
  menu.style.display = 'flex';
  quizMenu.style.display = 'none';
  
});


but_options.addEventListener("click",()=>{
    menu.style.display = 'none';
    optionMenu.style.display = 'block';
     
    
})

but_backOption.addEventListener("click",()=>{
  menu.style.display = 'flex';
  quizMenu.style.display = 'none';
  optionMenu.style.display = 'none';
});

radioButtons.forEach(button => {
  button.addEventListener('click', () => {
    grade = +(button.value);
    console.log(grade)
    radioButtons.forEach(otherButton => {
      if (otherButton !== button) {
        otherButton.checked = false;
      }
    });
  });
});



const getData =async()=>{
    quiz_array  = await fetch("https://restcountries.com/v3.1/all").then(res=>
    res.json());
    randomData = quiz_array.sort(() => 0.5 - Math.random()).slice(0, 25)
    randomDataName = quiz_array.sort(() => 0.5 - Math.random()).slice(0, 240)
    console.log(quiz_array[0].translations)

   
};



but_libary.addEventListener("click",()=>{
  menu.style.display = "none";
  lib_menu.style.display ='flex';  
  lib_content.textContent = '';

  exit_libary_but.addEventListener("click",()=>{
    lib_menu.style.display = 'none';
    menu.style.display = "flex";
});


  quiz_array.forEach((e)=>{
    
    const box = document.createElement("div");
    const img = document.createElement("img");
    const text = document.createElement("h1")
    box.classList.add("box_libary_all")
    img.setAttribute('src',e.flags.svg)
    text.textContent = e.name.common;
    box.append(img,text);
    lib_content.append(box);

  });
});



const showQuiz = ()=>{
    mainCountry = randomData[x]?.name.common;
    mainCountryFlags = randomData[x]?.flags.svg
    const otherCountries = []
    while (otherCountries.length < grade) {
      const randomIndex = Math.floor(Math.random() * randomDataName.length);
      const randomCountry = randomDataName[randomIndex].name.common;
      if (randomCountry !== mainCountry && !otherCountries.includes(randomCountry)) {
        otherCountries.push(randomCountry);
      }
    }
    const randomIndex = Math.floor(Math.random() * otherCountries.length);
    otherCountries[randomIndex] = mainCountry;
    quizMenuContent.classList.add("quizMenuContent");
    const flags = document.createElement("div");
    const flags_img = document.createElement("img");
    const quizButtons = document.createElement("div");
    quizButtons.classList.add("quizButtons");
    flags.classList.add("flags");
    flags.append(flags_img);
    quizMenuContent.append(flags,quizButtons);
    quizMenu.append(quizMenuContent);
    flags_img.setAttribute("src",mainCountryFlags)

    for(let i = 0; i < otherCountries.length; i++){
        const button = document.createElement("button");
        button.classList.add("button_f");
        button.textContent = otherCountries[i];
        quizButtons.append(button);
    
        button.addEventListener("click", (e) => {
          but_next.style.display = 'block'
            but_next.classList.remove("next_last")
            const allButtons = quizButtons.querySelectorAll("button");
            allButtons.forEach((btn) => {
              btn.disabled = true;
              if(e.target.textContent === mainCountry){
                audioTrue.play()
                button.classList.add("true");
                score++;
                spanScore.textContent = score;
              } else if (btn.textContent === mainCountry){
                btn.classList.add("true");
              }
            });
            if(e.target.textContent !== mainCountry){
              button.classList.add("false");
              audioFail.play()
            }
          });
    }
}


getData().then(showQuiz)

but_next.addEventListener("click",(e)=>{
    quizMenuContent.textContent = '';
    x++
    level++
    spanlevel.textContent = '';
    spanlevel.textContent = level;
    but_next.classList.add("next_last")
    showQuiz();

    if(x >= 25){
        quizMenu.style.display = 'none';
        audioEnd.play()
        showResult()
        
    }
    
    
})


const showResult = ()=>{
  console.log(`score${score}`);
  console.log(`level${level}`);
  console.log(level/score);

  const showRDiv = document.createElement("div");
  showRDiv.classList.add("showRDiv");
  
  const scoreText = document.createElement("h3");
  // const levelText = document.createElement("h3");
  scoreText.classList.add("scoreText");
  // levelText.classList.add("levelText");
  scoreText.textContent = `Score: ${score}`;
  // levelText.textContent = `${score}/25`;
  but_playAgain.classList.add("btn_playAgain");
  but_playAgain.textContent = "Play Again"
  showRDiv.append(scoreText,but_playAgain);
  container.append(showRDiv);
  but_playAgain.addEventListener("click",()=>{
    // showRDiv.style.display = 'none';
    // menu.style.display = 'none';
    // quizMenu.style.display = 'block';
    // quizMenuContent.textContent = '';
    // level = 1
    // spanlevel.textContent = level;
    // x = 0
    // level = 1
    // score = 0
    // spanScore.textContent = score;
    // showQuiz()
     menu.style.display = 'flex';
     showRDiv.style.display = 'none';
     x = 0
     level = 1
     score = 0
     spanScore.textContent = score;
     spanlevel.textContent ='';
     spanlevel.textContent = level;
     getData().then(showQuiz)
  });
}


quizMenu.style.display = 'none';
but_play.addEventListener("click",()=>{
     menu.style.display = 'none';
     quizMenu.style.display = 'block';
     quizMenuContent.textContent = '';
     x = 0
     level = 1
     score = 0
     spanScore.textContent = score;
     spanlevel.textContent ='';
     spanlevel.textContent = level;
     getData().then(showQuiz)
})






