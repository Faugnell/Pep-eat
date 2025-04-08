export function isValidMongoId(str:string) {
    const regex = /^[a-z0-9]+$/;
    return (regex.test(str) && str.length === 24);
}
