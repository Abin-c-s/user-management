export const calculateAge = (dateofbirth) => {
    if(!dateofbirth)return ""
    const BrithDate = new Date(dateofbirth);
    const today = new Date()
    let age = today.getFullYear() - BrithDate.getFullYear()
    const monthDiff = today.getMonth() - BrithDate.getMonth()
    if(monthDiff<0 ||(monthDiff === 0 && today.getDate()<BrithDate.getDate())){
        age--;
    }
    return `${age} years`
    
}