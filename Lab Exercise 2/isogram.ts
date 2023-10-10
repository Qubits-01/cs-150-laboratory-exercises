export function isIsogram(input: string): boolean {
    input = input.trim().toLowerCase();

    
    const knownChars: string[] = [];
    for (const char of input) {
      console.log(char);

      if (knownChars.includes(char)) {
        return false;
      }

      if (!(char ===  ' ' || char === '-')) {
        knownChars.push(char);
      }
    }

    return true;
  }
  
console.log(isIsogram('Isograms'));
