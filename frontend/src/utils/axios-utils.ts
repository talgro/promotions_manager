
const DATE_REGEX = /\d{4}-\d{2}-\d{2}/;
const parseDatesRecursive = (data: any) => {
    Object.keys(data).forEach(function(k) {
        if (DATE_REGEX.test(data[k])) {
            data[k] = new Date(data[k]).toLocaleString(undefined, {
                year: '2-digit',
                month: '2-digit',
                day: '2-digit'
            });
        } else if (
            typeof data[k] === "object" &&
            data[k] !== null &&
            data[k] !== undefined
        ) {
            parseDatesRecursive(data[k]);
        }
    });
};

export const parseDatesInNestedObject = (data: any) => {
    parseDatesRecursive(data);
    return data;
};