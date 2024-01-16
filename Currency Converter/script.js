let base_url = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies"

const dropDown = document.querySelectorAll(".dropDown select");
const btn = document.querySelector("button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

window.addEventListener("load", () => {
    updateExchangeRate();
})

for(let select of dropDown){
    for(let currecyCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currecyCode;
        newOption.value = currecyCode;
        if(select.name == "from" && currecyCode == "USD"){
            newOption.selected = "selected";
        }
        if(select.name == "to" && currecyCode == "INR"){
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    })
}

const updateFlag = (ele) => {
    // console.log(ele);
    let currecyCode = ele.value;
    // console.log(currecyCode);
    let countryCode = countryList[currecyCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let newImg = ele.parentElement.querySelector("img");
    newImg.src = newSrc;
}

btn.addEventListener("click", (eve) => {
    eve.preventDefault();
    updateExchangeRate();
})

const updateExchangeRate = async () => {
    let amount = document.querySelector(".amount");
    let amountVal = amount.value;
    if(amountVal == "" || amountVal < 1){
        amountVal = 1;
        amount.value = "1";
    }
    // console.log(amountVal);
    // console.log(fromCurr.value, toCurr.value);
    const url = `${base_url}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    let response = await fetch(url);
    // console.log(response);
    let data = await response.json();
    // console.log(data);
    let rate = data[toCurr.value.toLowerCase()];
    // console.log(rate);
    let finalAmount = amountVal*rate;
    msg.innerText = `${amountVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
    // console.log(msg.innerText);
}