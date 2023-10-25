/*
* Test cases 1, 2, and 3 are easy (around 1-3 minutes).
*
* Test cases 4, and 5 are a little bit tricky since the problem is
* about the '\n' character. It is very hard to debug since the expected
* and actual result are "almost" the same (around 5-7 minutes).
*
* Test case 6: 30 mins in and I can't figure it out. The expected and
* actual output are the same (I think). But I think it has something to do
* with "hidden" characters such as '\n'
* Also, how come my code works for sing(3) but not for sing(99)?
*
* I think refactoring this code further to make some parts of the code
* less redundant would sacrifice readability, so I will leave it this way.
*
* Update: Test 6 is not sing(99) but sing() instead. I am so dumb. All
* that wasted time...
*/

export function verse(index: number): string {
    let msg = `${index} bottle${index > 1 ? 's' : ''} of beer on the wall, ${index} bottle${index > 1 ? 's' : ''} of beer.\n` +
        `Take one down and pass it around, ${index - 1} bottle${(index - 1) > 1 ? 's' : ''} of beer on the wall.\n`;

    if (index === 1) {
        msg = `1 bottle of beer on the wall, 1 bottle of beer.\n` +
            `Take it down and pass it around, no more bottles of beer on the wall.\n`;
    }

    if (index === 0) {
        msg = `No more bottles of beer on the wall, no more bottles of beer.\n` +
            `Go to the store and buy some more, 99 bottles of beer on the wall.\n`;
    }

    return msg;
}

export function sing(
    initialBottlesCount: number = 99,
    takeDownCount: number = 0
): string {
    let song = '';
    for (let i = initialBottlesCount; i >= takeDownCount; i--) {
        if (i === takeDownCount) {
            song += verse(i);
        } else {
            song += verse(i) + '\n';
        }
    }

    return song.trim() + '\n';
}