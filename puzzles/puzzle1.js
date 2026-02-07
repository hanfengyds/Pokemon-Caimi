// 谜题1数据
const puzzle1 = {
    id: 1,
    name: "班基拉斯",
    aliases: ["班吉拉斯", "班基拉斯", "老班", "班主任", "沙漠暴君"],
    types: ["岩石", "恶"],
    typeCost: 8,
    hints: [
        {
            type: "text",
            title: "算命先生",
            content: "观其掌纹，事业线深藏而后发，如江河暗涌终成澎湃；面相似宝库晚开乃纳乾坤，签文有云：'松柏经冬方见翠，明珠出海不争晖'，是个\"大器晚成\"的命理",
            cost: 3
        },
        {
            type: "text",
            title: "社交分析师",
            content: "它虽然长得凶，但是害怕暴力",
            cost: 2
        },
        {
            type: "audio",
            title: "声音采集师",
            content: "Puzzle File/1/叫声.mp3",
            text: "我偶然录下过它的声音，你...要不要听一听？",
            cost: 1
        },
        {
            type: "image",
            title: "画像师",
            content: "Puzzle File/1/画像.png",
            text: "我上次画地图，不小心按照它的轮廓画进去了，不过一般人可看不出来~",
            cost: 2
        },
        {
            type: "text",
            title: "路人",
            content: "烦死了，它一来我就得戴口罩",
            cost: 3
        },
        {
            type: "image",
            title: "吃货",
            content: "Puzzle File/1/吃货.png",
            text: "我好几次以为它给我带好吃的了",
            cost: 1
        }
    ],
    pokedexImage: "assets/Pokedex/1.png",
    gifImage: "assets/Pokedex/1.gif"
};
