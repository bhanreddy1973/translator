const giveText = document.querySelector(".give-text"),
takeText = document.querySelector(".take-text"),
selectTag = document.querySelectorAll("select"),
exchangeIcon = document.querySelector(".exchange"),
translateBtn = document.querySelector("button"),
icons = document.querySelectorAll(".row");
const countries = {"en-GB":"English","hi-IN":"Hindi","ne-NP":"Nepali","te-IN":"Telugu"};
selectTag.forEach((tag, id) => {
    for(let coun_code in countries){
        let selected;
        if(id==0 && coun_code == "en-GB"){
            selected = "selected";
        }
        else if(id==1 && coun_code=="hi-IN"){
            selected = "selected";
        }
        let option = '<option value='+coun_code+'>'+countries[coun_code]+'</option>';
        tag.insertAdjacentHTML("beforeend", option);
    }
});
exchangeIcon.addEventListener("click",() => {
    let temptext = giveText.value,
    templang = selectTag[0].value;
    giveText.value = takeText.value,
    selectTag[0].value = selectTag[1].value;
    takeText.value = temptext,
    selectTag[1].value = templang;
});
translateBtn.addEventListener("click", () =>{
    let text = giveText.value,
    translateGive = selectTag[0].value,
    translateTake = selectTag[1].value;
    if(!text) return;
    takeText.setAttribute("placeholder", "Translating...")
    let apiUrl = 'https://api.mymemory.translated.net/get?q='+text+'&langpair='+translateGive+'|'+translateTake;
    fetch(apiUrl).then(res => res.json()).then(data => {
        console.log(data);
        takeText.value = data.responseData.translatedText;
        takeText.setAttribute("placeholder", "Translation")

    });
});

icons.forEach(icon => {
    icon.addEventListener("click", ({target}) => {
        if(target.classList.contains("fa-copy")){
            if(target.id == "give"){
                navigator.clipboard.writeText(giveText.value);
            }
            else{
                navigator.clipboard.writeText(takeText.value);
            }
        }else{
            let utterance;
            if(target.id == "give"){
                utterance = new SpeechSynthesisUtterance(giveText.value);
                utterance.lang = selectTag[0].value;
            }
            else{
                utterance = new SpeechSynthesisUtterance(takeText.value);
                utterance.lang = selectTag[1].value;
            }
            speechSynthesis.speak(utterance);
        }
    });
});