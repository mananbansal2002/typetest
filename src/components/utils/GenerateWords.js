import {generate} from 'random-words';

export function generateAdvancedWordsSet(count, options) {
    let wordsSet = generate(count);

    const modifiedWordsSet = [];

    wordsSet.forEach(word => {
        if (options.caps && Math.random() > 0.5) {
            word = word.charAt(0).toUpperCase() + word.slice(1);
        }

        let punctuatedWord = word;

        if (options.punctuation && Math.random() > 0.7) {
            const punctuationTypes = ['.', ',', ';', ':', '?', '!', '"', "'"];
            const randomPunctuation = punctuationTypes[Math.floor(Math.random() * punctuationTypes.length)];
            
            if (randomPunctuation === '"' || randomPunctuation === "'") {
                punctuatedWord = Math.random() > 0.5 ? `"${punctuatedWord}"` : `'${punctuatedWord}'`;
            } else {
                punctuatedWord += randomPunctuation;
            }
        }

        modifiedWordsSet.push(punctuatedWord);
    });

    // Insert numbers as separate words randomly
    if (options.numbers) {
        const numberOfNumbers = Math.floor(Math.random() * (count / 5)) + 1; // Up to 20% of the words
        for (let i = 0; i < numberOfNumbers; i++) {
            const position = Math.floor(Math.random() * modifiedWordsSet.length);
            const number = Math.floor(Math.random() * 100); // Insert a random number
            modifiedWordsSet.splice(position, 0, number.toString());
        }
    }

    // Insert dashes as separate words randomly if punctuation is enabled
    if (options.punctuation) {
        const numberOfDashes = Math.floor(Math.random() * (count / 5)) + 1; // Up to 20% of the words
        for (let i = 0; i < numberOfDashes; i++) {
            const position = Math.floor(Math.random() * (modifiedWordsSet.length - 2)) + 1;
            modifiedWordsSet.splice(position, 0, '-');
        }
    }

    return modifiedWordsSet;
}
