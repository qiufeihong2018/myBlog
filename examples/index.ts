const a: [number, number] = [1212, 32323]

function B([one, two]: [number, number]) {
    console.log(one)
    console.log(two)
}

B(a)