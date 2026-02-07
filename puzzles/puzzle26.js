// 谜题26数据 - 选择题
const puzzle26 = {
    id: 26,
    name: "选择题",
    type: "judgment",
    typeCost: 2,
    types: ["特殊"],
    judgmentData: {
        image: "万能伞.png",
        question: "关于图中道具的描述，对于大多数宝可梦而言，以下哪个是错误的？",
        options: [
            { id: "A", text: "携带该道具的宝可梦，晴天下无法立刻使用日光束" },
            { id: "B", text: "携带该道具的宝可梦，雨天下使用火系技能，敌人受到的伤害不会减少" },
            { id: "C", text: "宝可梦自身并不免疫沙暴伤害，携带该道具后，依然会被沙暴袭击" },
            { id: "D", text: "宝可梦自身没有被其他因素限制恢复能力，携带该道具后，在晴天下使用晨光，恢复量不会更多" }
        ],
        correctAnswer: "B",
        correctScore: 6,
        wrongScore: 4
    },
    pokedexImage: "assets/Pokedex/26.png",
    gifImage: "assets/Pokedex/26.png"
};