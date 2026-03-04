export function useRandomAvatar(userId: string, userName: string) {
    const backgroundColors = ["f4b41a", "e7e7e7", "a78bfa", "bbf7d0"];
    
    const seedString = userId || userName || "default";
    
    const charSum = seedString.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    
    const colorIndex = charSum % backgroundColors.length;
    const bgColor = backgroundColors[colorIndex];
    return {seedString, bgColor};
}