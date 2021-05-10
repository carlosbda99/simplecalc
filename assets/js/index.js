const keysAccepted = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '0',
    '.',
    '*',
    '/',
    '-',
    "+",
    'Escape',
    'Enter',
    'Backspace'
]

const soma = function(elements){
    let total = 0
    elements.forEach(element => {
        total += parseFloat(element)
    })
    return total
}

const subtrai = function(elements){
    let total = 0
    for (i = 0; i < elements.length; i++){
        total = i == 0 ? parseFloat(elements[i]) : total-parseFloat(elements[i])
    }
    return total
}

const divide = function(elements) {
    let total = 0
    for (i = 0; i < elements.length; i++){
        total = i == 0 ? parseFloat(elements[i]) : total/parseFloat(elements[i])
    }
    return total
}

const multiplica = function(elements) {
    let total = 0
    for (i = 0; i < elements.length; i++){
        total = i == 0 ? parseFloat(elements[i]) : total*parseFloat(elements[i])
    }
    return total
}

const ac = function() {
    document.getElementById('result').innerHTML = ''
    document.getElementById('current-operation').innerHTML = 0
}

const c = function() {
    document.getElementById('current-operation').textContent = document.getElementById('current-operation').textContent.slice(0,-1)
}

const addChar = function(char){
    operation = document.getElementById('current-operation')
    operation.textContent = operation.textContent=='0' ? char : operation.textContent + char
}

const calcula = function(){
    let operationEl = document.getElementById('current-operation').textContent
    let operation = document.getElementById('current-operation').textContent.split(/([0-9]*[.]?[0-9]*)/)


    if (operation.includes('/') || operation.includes('*')){
        while (operation.includes('/')){
            let tempRes = parseFloat(operation[operation.indexOf('/')-1]) / parseFloat(operation[operation.indexOf('/')+1])
            operation.splice(operation.indexOf('/')-1, 3, tempRes)
          }
          while (operation.includes('*')){
            tempRes = parseFloat(operation[operation.indexOf('*')-1]) * parseFloat(operation[operation.indexOf('*')+1])
            operation.splice(operation.indexOf('*')-1, 3, tempRes)
          }
    }
    
    while (operation.includes('-') || operation.includes('+')){
        for (i = 0; i < operation.length; i++){
            if (i == 0) {
                if (operation[i] == '+' || operation[i] == '-') continue 
            }
            else if (operation[i] == '+'){
                let tempRes = parseFloat(operation[i-1]) + parseFloat(operation[i+1])
                operation.splice(i-1, 3, String(tempRes))
            } else if (operation[i] == '-'){
                let tempRes = parseFloat(operation[i-1]) - parseFloat(operation[i+1])
                operation.splice(i-1, 3, String(tempRes))
            }
        }
    }

    document.getElementById('result').textContent = operationEl + " = " + operation[1]
    return document.getElementById('current-operation').textContent = '0'
}

document.addEventListener('keyup', (event) => {
    if (keysAccepted.includes(event.key)) {
        operation = document.getElementById('current-operation')
        if (event.key == 'Enter') calcula()
        else if (event.key == 'Backspace') c()
        else if (event.key == 'Escape') ac() 
        else addChar(event.key)
    }
})



