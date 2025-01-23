import { defin_backend } from "../declarations/defin_backend";
import { defin_frontend } from "../declarations/defin_frontend";

window.addEventListener("load",async function(){
    //console.log("finished loading");
    const currentAmount = await defin_backend.checkBalance();
    this.document.getElementById("value").innerText = Math.round(currentAmount*100)/100;
});

document.querySelector("form").addEventListener("submit", async function(event){
    event.preventDefault()
    //console.log("Submitted.");

    const button = event.target.querySelector("#submit-btn");

    const inputAmount = parseFloat(document.getElementById("input-amount").value);
    const outputAmount = parseFloat(document.getElementById("withdrawal-amount").value);

    button.setAttribute("disabled",true);

    if (document.getElementById("input-amount").value.length != 0) {
        await defin_backend.topUp(inputAmount);
    }
    
    if (document.getElementById("withdrawal-amount").value.length != 0) {
        await defin_backend.withdraw(outputAmount);
    }

    await defin_backend.compound();

    const currentAmount = await defin_backend.checkBalance();
    document.getElementById("value").innerText = Math.round(currentAmount*100)/100;

    document.getElementById("input-amount").value = "";
    document.getElementById("withdrawal-amount").value = "";
    button.removeAttribute("disabled");

})