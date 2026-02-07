// 谜题23数据 - 选择题
const puzzle23 = {
    id: 23,
    name: "烈空坐",
    aliases: ["烈空坐"],
    types: ["龙", "飞行"],
    typeCost: 3,
    type: "judgment",
    judgmentData: {
        image: "烈空坐.png",
        question: "哪个是该宝可梦的现译名？",
        options: [
            { id: "A", text: "裂空座" },
            { id: "B", text: "烈空坐" },
            { id: "C", text: "裂空坐" },
            { id: "D", text: "烈空座" }
        ],
        correctAnswer: "B",
        correctScore: 2,
        wrongScore: 3
    },
    pokedexImage: "assets/Pokedex/23.png",
    gifImage: "assets/Pokedex/23.gif"
};