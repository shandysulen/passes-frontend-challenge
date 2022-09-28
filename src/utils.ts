export const formatLikes = (numLikes: number) => {
    if (numLikes < 1000) {
        return numLikes;
    }

    return `${(numLikes / 1000).toFixed(1)}K`;
};