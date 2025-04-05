import * as R from "ramda";

const stringToArray = R.split("");

/* Question 1 */
const vowels: string[] = ['a', 'e', 'i', 'o', 'u'];

export const countVowels: (str: string) => number = (str: string) => {
    const strArray: string[] = stringToArray(str);
    const filteredArray: string[] = R.filter((char: string) => R.includes(R.toLower(char),vowels), strArray);
    return filteredArray.length;
};

/* Question 2 */
export const isPalindrome: (str: string) => boolean = (str: string) => {
    if (str.length === 0 || str.length === 1) {
        return true;
    }

    else {
        // Filter out non-alphabetic characters and convert to lowercase
        const f = R.pipe(R.toLower, stringToArray, R.filter((char: string) => char.match(/[a-z]/) !== null), R.join(""))
        const filteredString: string = f(str);
        return filteredString[0] === filteredString[filteredString.length - 1] && isPalindrome(filteredString.slice(1, filteredString.length - 1));
    }
};

/* Question 3 */
export type WordTree = {
    root: string;
    children: WordTree[];
}

export const treeToSentence: (wt: WordTree) => string = (wt: WordTree) => {
    if (wt.children.length === 0) {
        return wt.root;
    }

    else {
        return wt.root + wt.children.reduce((res: string, element: WordTree) => res += " " + treeToSentence(element), "");
    }
};

