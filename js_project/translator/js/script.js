const fromText = document.querySelector(".from-text")
const toText = document.querySelector(".to-text");
const exchange = document.querySelector(".exchange");

const selectTag = document.querySelectorAll("select");

const translateBtn = document.querySelector("button");

const icons = document.querySelectorAll(".row i")


selectTag.forEach((tag,id) =>{
    for (const country_code in countries) {
        //  console.log(countries[country_code]);

        // select english by default as from language hindi from language 
        let selected;
        if(id==0 && country_code=="en-GB"){
            selected = "selected";
        }
        else if(id==1 && country_code=="hi-IN"){
            selected = "selected";
        }
         let option = `<option value="${country_code}" ${selected}>${countries[country_code]}`
         tag.insertAdjacentHTML("beforeend",option);  // dding option tag inside select tag 
    }
});

exchange.addEventListener("click",()=>{
    let tempText = fromText.value,
    templang = selectTag[0].value;
    fromText.value = toText.value;
    selectTag[0].value = selectTag[1].value;
    toText.value = tempText;
    selectTag[1].value = templang;
})

translateBtn.addEventListener("click",()=>{
    let text = fromText.value,
    translateFrom = selectTag[0].value, // getting from select tagvalue 
    translateTo = selectTag[1].value; // getting  toselect  tagvalue
    // console.log(text);
    // console.log(translateFrom)
    // console.log(translateTo);

    if(!text)return;
    toText.setAttribute("Placeholder","Translating.....")

   
    let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`

    // fetching api response and returning it with parsing into js obj 
    // and in another then method reciving that obj  
    fetch(apiUrl).then(res => res.json()).then(data=>{ 
        // console.log(data);
        toText.value = data.responseData.translatedText;
        toText.setAttribute("Placeholder","Translating.....")

    });
})



icons.forEach(icon=>{
    icon.addEventListener("click",({target})=>{
        console.log(target);
        if(target.classList.contains("fa-copy")){
            if(target.id=="from"){
                navigator.clipboard.writeText(fromText.value);
                console.log("from copy icons clicked ")
            }
            else{
                navigator.clipboard.writeText(toText.value);
                console.log("from copy icon clicked")
            }
        }
        else{

            let utterance;
            if(target.id=="from"){
                utterance = new SpeechSynthesisUtterance(fromText.value);
                utterance.lang = selectTag[0].value;
            }
            else{
                utterance = new SpeechSynthesisUtterance(toText.value);
                utterance.lang = selectTag[1].value;
            }
            speechSynthesis.speak(utterance)
            console.log("from speech icon clicked")
        }
    })
})


 