export const truncateDescription = (description: string, limit: number) => {
    const words = description.split(' ');
    return words.length > limit ? `${words.slice(0, limit).join(' ')}...` : description;
};