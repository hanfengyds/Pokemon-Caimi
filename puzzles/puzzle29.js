// 谜题29数据 - 选择题
const puzzle29 = {
    id: 29,
    name: "爆音怪",
    type: "judgment",
    typeCost: 2,
    types: ["特殊"],
    judgmentData: {
        image: "爆音怪.png",
        question: "当我使用高音后，以下哪个道具可以让我的特攻提高一级？",
        options: [
            { id: "A", image: "爽喉喷雾.png" },
            { id: "B", image: "伤药.png" },
            { id: "C", image: "匿声喷雾.png" },
            { id: "D", image: "白银喷雾.png" }
        ],
        correctAnswer: "A",
        correctScore: 3,
        wrongScore: 3
    },
    pokedexImage: "assets/Pokedex/29.png",
    gifImage: "assets/Pokedex/29.png"
};