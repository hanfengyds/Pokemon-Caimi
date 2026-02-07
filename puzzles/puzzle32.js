// 谜题32数据 - 排序题
const puzzle32 = {
    id: 32,
    name: "饮料排序",
    type: "sequence",
    typeCost: 2,
    types: ["特殊"],
    sequenceData: {
        image: "登山客.png",
        question: "我爬山爬到一半，我的宝可梦渴的只剩一半血了，帮我看看这些饮料哪个最好！钱不是问题！",
        items: [
            { id: 1, name: "果汁牛奶", image: "果汁牛奶.png" },
            { id: 2, name: "美味之水", image: "美味之水.png" },
            { id: 3, name: "劲爽汽水", image: "劲爽汽水.png" },
            { id: 4, name: "哞哞鲜奶", image: "哞哞鲜奶.png" }
        ],
        correctOrder: [2, 3, 1, 4],
        correctScore: 7
    },
    pokedexImage: "assets/Pokedex/32.png",
    gifImage: "assets/Pokedex/32.png"
};