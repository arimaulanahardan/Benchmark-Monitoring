export function formatNumber(number: number) {
    const isNegative = number < 0;
    number = Math.abs(number); 
    if (number < 1000) {
        return isNegative ? '-' + number.toString() : number.toString();
    } else {
        const suffixes = ['', 'k', 'M', 'B', 'T'];
        const suffixIndex = Math.floor(Math.log10(number) / 3);
        const shortNumber = (number / Math.pow(1000, suffixIndex)).toFixed(0);
        return (isNegative ? '-' : '') + shortNumber + suffixes[suffixIndex];
    }
}
