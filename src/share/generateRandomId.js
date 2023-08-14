
export const generateId = (str) =>{

    let num = Math.floor((Math.random() * 100) + 1);
    let id = str + num
    return id
}