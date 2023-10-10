export function hey(message: string): string {
    // Remove leading or trailing whitespace/s.
    message = message.trim();

    // Check if it is a 'silence.'
    if (message.length === 0) {
      return "Fine. Be that way!";
    }

    // RegEx for any letters (alphabetical characters), while
    // excluding any numbers (digits) and underscores.
    let regex: RegExp = /[^\W\d_]+/g;


    // Check if it is a 'yell.'
    let isEndQuestionMark = message.endsWith('?');
    if (regex.test(message) && message === message.toUpperCase()) {
        return isEndQuestionMark ? "Calm down, I know what I'm doing!" : "Whoa, chill out!";
    }

    // Check if it is a 'question.'
    if (isEndQuestionMark) {
        return "Sure.";
    }

    // Otherwise, return 'whatever.'
    return "Whatever.";
  }

// console.log(hey('Tom-ay-to, tom-aaaah-to.'));
