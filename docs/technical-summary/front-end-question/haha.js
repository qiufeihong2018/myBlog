var  arr = [
    { "id" : "1001" , "name" : "值1" , "value" : "111" },
    { "id" : "1001" , "name" : "值1" , "value" : "11111" },
    { "id" : "1002" , "name" : "值2" , "value" : "25462" },
    { "id" : "1002" , "name" : "值2" , "value" : "23131" },
    { "id" : "1002" , "name" : "值2" , "value" : "2315432" },
    { "id" : "1003" , "name" : "值3" , "value" : "333333" }
];

var  map = {},
    dest = [];
for ( var  i = 0; i < arr.length; i++){
    var  ai = arr[i];
    if (!map[ai.id]){
        dest.push({
            id: ai.id,
            name: ai.name,
            valueMap: [ai.value]
        });
        map[ai.id] = ai;
    } else {
        for ( var  j = 0; j < dest.length; j++){
            var  dj = dest[j];
            if (dj.id == ai.id){
                dj.valueMap.push(ai.value);
                break ;
            }
        }
    }
}

console.log(dest);
// [ { id: '1001', name: '值1', valueMap: [ '111', '11111' ] },
//   { id: '1002',
//     name: '值2',
//     valueMap: [ '25462', '23131', '2315432' ] },
//   { id: '1003', name: '值3', valueMap: [ '333333' ] } ]