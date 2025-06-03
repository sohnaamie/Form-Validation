function flatten(arr){
    const newArray = [];

    for (const item of arr){
        if (Array.isArray(item)){
            newArray.push(...flatten(item));
        }else{
            newArray.push(item);
        }
    }
    return newArray;
}
console.log(flatten([1, [2, [3, 4]], 5]));