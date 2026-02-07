// 谜题2数据
const puzzle2 = {
    id: 2,
    name: "堵拦熊",
    aliases: ["堵拦熊", "拦路熊", "堵路熊"],
    types: ["恶", "一般"],
    typeCost: 4,
    hints: [
        {
            type: "text",
            title: "司机",
            content: "上次我路过，没想到它的嗓门比喇叭都大",
            cost: 1
        },
        {
            type: "text",
            title: "训练师1",
            content: "硬要说的话，它其实并不适合对战，基础素质上不得台面，还不如自己的老表弟有活整",
            cost: 2
        },
        {
            type: "image",
            title: "生物学者",
            content: "Puzzle File/2/生物学者.png",
            text: "也许它的某个形态，在动物界中是以这个为原型的",
            cost: 5
        },
        {
            type: "text",
            title: "训练师2",
            content: "我曾经在其他地方看到过和他长得很像的宝可梦，但是他更大更高",
            cost: 1
        },
        {
            type: "image",
            title: "医生",
            content: "Puzzle File/2/医生.png",
            text: "这个小家伙上次来我这儿，身体都被烧伤了，结果斗志不降反增，真是个怪苗子",
            cost: 1
        }
    ],
    pokedexImage: "assets/Pokedex/2.png",
    gifImage: "assets/Pokedex/2.gif"
};