export function convertDurationToTimeString(duration: number){
    const hours =  Math.floor(duration / 3600); //arredondar pro menor numero q sobra da divisao
    const minutes = Math.floor((duration % 3600) / 60); 
    const seconds = duration % 60;

    const timeString = [hours,minutes,seconds]
        .map(unit => String(unit).padStart(2,'0')) //caso retorne apenas 1 caracter, adiciona 0 na frente
        .join(":")
        return timeString;

}

export function convertDurationToTimeStringMin(duration: number){
    const hours =  Math.floor(duration / 3600); //arredondar pro menor numero q sobra da divisao
    const minutes = Math.floor((duration % 3600) / 60); 
    const seconds = duration % 60;

    const timeString = [minutes,seconds]
        .map(unit => String(unit).padStart(2,'0')) //caso retorne apenas 1 caracter, adiciona 0 na frente
        .join(":")
        return timeString;

}