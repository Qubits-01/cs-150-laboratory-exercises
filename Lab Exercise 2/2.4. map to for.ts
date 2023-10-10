console.log([...Array(3)].map((_, r) => [...Array(5)].map((_, c) => r * 5 + c)));

console.log(
    (() => {
        let output: number[][] = [];
        for(let r = 0; r < 3; r++) {
            let temp: number[] = [];
            for (let c = 0; c < 5; c++) {
                temp.push(r * 5 + c);
            }
        
            output.push(temp);
        }
        
        return output;
    })()
);

export {};
