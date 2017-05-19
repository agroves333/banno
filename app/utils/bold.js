export default function bold(query, string) {
    const re = new RegExp('(\s?)(' + query +')(\s?)', 'gi')
    return (string.charAt(0).toUpperCase() + string.slice(1)).replace(re, '$1<b>$2</b>$3');
}