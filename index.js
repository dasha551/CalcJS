const calculator = document.querySelector(".calculator");
let history = [];
let tempNumber = "";
let operationType = "";
let isPercent = false
let isEqual = false

calculator.addEventListener("click", (event) => {
    const target = event.target;
    if (target.classList.contains("calculator__col")) {
        const data = target.dataset.type
        operationTypeHandling(data)
        // console.log(tempNumber)

        renderTotal(tempNumber)


        renderHistory(history)





    }
})

// обработка кравиш нажатых на калькуляторе
function operationTypeHandling(data) {
    if (data >= 0) {
        operationType = "number";
        tempNumber = tempNumber===0 ? data : tempNumber + data

    } else if (data === "float") {
        operationType = "number";
        if (!/\./.test(tempNumber)) {
            if (tempNumber) {
                tempNumber = tempNumber + ".";
            } else {
                tempNumber = "0."
            }
        }
    } else if (data === "delete" && operationType === "number") {
        tempNumber = tempNumber.substring(0, tempNumber.length - 1)
        // tempNumber = tempNumber ? tempNumber: "0"
        isPercent = false
    } else if ( ["+", "-", "/", "*"].includes(data) && tempNumber) {
        operationType = data;
        history.push(tempNumber, operationType);
        tempNumber = "";
    } else if (data==="clear"){
        history = []
        tempNumber="0"
        isPercent = false
    }else if (data === "%") {
        history.push(tempNumber)
        isPercent=true
        isEqual=false
        tempNumber = calculate(history, isPercent, isEqual)
        history=[]
    }else if (data === "=") {
        history.push(tempNumber)
        isEqual = true
        tempNumber = calculate(history, isPercent, isEqual)
        history=[]
        isPercent=false
    }
}
// отрисовка текущего значения на экране калькулятора
function renderTotal(value) {
    const totalBlock = calculator.querySelector(".calculator__total");
    totalBlock.innerHTML = value
}


// Формирование html кода и вывода блока истории операций
function renderHistory(historyArray) {
    const historyBlock = calculator.querySelector(".calculator__history");
    let htmlElements = ""

    historyArray.forEach((item) => {
        if (item >= 0) {
            htmlElements = htmlElements + `&nbsp;<span>${item}</span>`
        } else if (["+", "-", "/", "*", "%"].includes(item)) {
            item = item === "*" ? "×" : item === "/" ? "÷" :item
            htmlElements = htmlElements + `&nbsp;<strong>${item}</strong>`
        }
    })
    historyBlock.innerHTML = htmlElements
}
// подсчет значения
function calculate(historyArray, isPercent, isEqual) {
    let total = 0
    historyArray.forEach((item, idx) => {
        item = parseFloat(item) >=0 ? parseFloat(item) : item
        if (idx===0){
            total=item
        }else if (idx - 2 >= 0 && isPercent && idx ===historyArray.length-3){
            const x = total
            const operation = historyArray[idx-1]
                const n = item
            if (!isEqual){
                total = calculatePercent(x, operation,n)
            }else {
                
            }
        }else if (idx - 2 >= 0) {
            const prevItem=historyArray[idx - 1]
            if (item >= 0) {
                if ( prevItem === "+") {
                    total = total + item
                }else if (prevItem==="-"){
                    total = total - item
                }else if (prevItem==="*"){
                    total=total*item
                }else if (prevItem==="/"){
                    total=total/item
                }else if (prevItem==="%"){
                    total=total / 100 * item
                }
            }
        }
        
    })
    return String(total)
} 



function calculatePercent(x, operation, n){
    let total
    if (["+", "-"].includes(operation)){
        total= x*(n/100)
    }else if (["*", "/"].includes(operation)){
        total = n/100
    }
    return total
}

function calculatePercentWhenPushEqual(x, operation, n){
    let total 
    if (operation ==="+"){
        total = x + (n/100 *x)
    }
    return total
}




const theme = document.querySelector(".theme");
theme.onclick = () => {
    if (theme.classList.contains("theme_dark")){
        theme.classList.remove("theme_dark")
        calculator.classList.add("calculator_dark")
    }else{
        theme.classList.add("theme_dark")
        calculator.classList.remove("calculator_dark")

    }

}