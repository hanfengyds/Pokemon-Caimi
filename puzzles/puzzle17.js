// 谜题17数据
const puzzle17 = {
    id: 17,
    name: "组合题",
    aliases: ["组合题"],
    types: ["水", "电", "飞行", "龙"],
    typeCost: 3,
    hints: [
        {
            type: "text",
            title: "游戏规则",
            text: "按照顺序拼出：鳃鱼龙、雷鸟海兽、鳃鱼海兽、雷鸟龙。每个池子放两个图片，对了加1分，错了扣1分，最后提交答案。",
            cost: 1
        }
    ],
    pokedexImage: "assets/Pokedex/17.png",
    combinationItems: [
        { name: "鱼龙", image: "鱼龙.png" },
        { name: "雷鸟", image: "雷鸟.png" },
        { name: "海兽", image: "海兽.png" },
        { name: "剑龙", image: "剑龙.png" }
    ],
    combinationTargets: [
        { name: "鳃鱼龙", components: ["鱼龙", "剑龙"], image: "鳃鱼龙.png" },
        { name: "雷鸟海兽", components: ["雷鸟", "海兽"], image: "雷鸟海兽.png" },
        { name: "鳃鱼海兽", components: ["鱼龙", "海兽"], image: "鳃鱼海兽.png" },
        { name: "雷鸟龙", components: ["雷鸟", "剑龙"], image: "雷鸟龙.png" }
    ]
};