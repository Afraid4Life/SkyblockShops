const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const config = require('./config.json')
const token = config.token;
var OrderNumber

// bot command settings things
const prefix = config.prefix;

// Make Life Easier Functions \\
//sleep command
let Statuses = ["Skyblock", ".help"]

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}
//Format numbers
function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

function mstoseconds(number) {
    return number * 1000
}
function mstominutes(number) {
    return number * 60000
}
function mstohours(number) {
    return number * 3600000
}

client.on('ready', () => {
    console.log(`i'm on`)
    setInterval(function () {
        let status = Statuses[Math.floor(Math.random() * Statuses.length)]
        client.user.setActivity(`${status}`, { type: 'PLAYING' });
        console.log(status)
    }, mstoseconds(15))
})
client.on('message', async message => {
    let args = message.content.substring(prefix.length).split(" ");
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;
    if (!message.guild) return;
    if (!message.member) message.member = await message.guild.fetchMember(message);
    const cmd = args.shift().toLowerCase();
    if (cmd.length == 0) return;

    //ping
    if (message.content === prefix + "ping") {
        message.channel.send({
            embed: {
                color: 65280,
                description: `:ping_pong: Pong! ${Math.round(client.ws.ping)} ms`
            }
        })

    }
    if (message.content === prefix + "help") {
        const author = message.author
        const helpMessage = new Discord.MessageEmbed()
            .setAuthor(`${author.tag}`, author.displayAvatarURL())
            .setColor(`#00FF00`)
            .addField("Misc", ".help | Shows the list of commands with descriptions\n .ping | Shows the bots response time")
            .addField("Shops", ".shop | Shows the list of shops\n.sync | Opens Synctional's Skyblock shop\n .2sync | Synctionals second page to his shop\n .noah | Opens Noah's Skyblock shop\n .boney | Opens Boney's Skyblock Shop")
            .setTimestamp(message.createdAt)
        message.channel.send(helpMessage)

    }

    if (message.content.startsWith(prefix + 'shop')) {
        const author = message.author
        const SkyblockOrder = new Discord.MessageEmbed()
            .setAuthor(`${author.tag}`, author.displayAvatarURL())
            .setColor("RANDOM")
            .addField("Shops", ".sync\n .2sync | Synctional's Second Page of his Shop \n.noah\n.boney")
            .setTimestamp(message.createdAt)
        message.channel.send(SkyblockOrder)
    };
    // Suggestions
    if (message.content.startsWith(prefix + 'sync')) {

        const guilds = client.guilds.cache.array()
        const eleven = message.guild.emojis.cache.find(emoji => emoji.name === '11');
        const twelve = message.guild.emojis.cache.find(emoji => emoji.name === '12');
        const thirteen = message.guild.emojis.cache.find(emoji => emoji.name === '13');
        const generateEmbed = start => {
            const current = guilds.slice(start, start + 1)

            const embed = new Discord.MessageEmbed()
                .setAuthor(`${author.tag}`, author.displayAvatarURL())
                .setColor("RANDOM")
                .setTitle(`Synctional's SkyBlock Shop! 1/2`)
                .addField("Coins Shop", "**__GROUP FUNDS ONLY or shirt (30% tax)__**\n1️⃣ 10M coins = 30 robux\n2️⃣ 20M coins = 50 robux\n3️⃣ 40M coins = 100 robux\n 4️⃣ 100M coins = 200 robux\n 5️⃣ 250M = 500 robux\n 6️⃣ 500M coins = 750 robux\n7️⃣ 1B = 1k Robux\n8️⃣ 5B = 5k robux\n9️⃣ 10B = 10k robux\n🔟 20B = 20k Robux")
                .addField("Seeds", "**__GROUP FUNDS ONLY or shirt (30% tax)__**\n🥭 100 Berry Seeds = 50 robux\n🍓 500 Berry Seeds = 220 robux\n🍐 1000 Berry Seeds = 450 robux **Best Selling**")
                .setFooter("Do not react until all reactions are added. Your purchase will not be counted")
            return embed
        }

        const author = message.author

        const page2 = new Discord.MessageEmbed()
            .setAuthor(`${author.tag}`, author.displayAvatarURL())
            .setColor("RANDOM")
            .setTitle(`Synctional's SkyBlock Shop!`)
            .setDescription("If you")

        const page3 = new Discord.MessageEmbed()
            .setAuthor(`${author.tag}`, author.displayAvatarURL())
            .setColor(`#00FF00`)
            .setTitle(`Synctional's SkyBlock Shop!`)
            .setDescription(`Order has been sent to Synctional's trusted sellers.`)
            .setFooter("If you think this was a mistake please type .mistake")

        const syncShop2 = new Discord.MessageEmbed()
            .setAuthor(`${author.tag}`, author.displayAvatarURL())
            .setColor("RANDOM")
            .setTitle(`Synctional's SkyBlock Shop! 2/2`)
            .addField("Pixel Art Designs", `**__DM What you need built, and an offer.__**\n👨 Mario\n💀 Sans\n👾 Pacman\n🤡 Pringles Logo\n🔤 Block Letter Text of your choice\n🐸 Pepe`)
        message.channel.send(generateEmbed(0)).then(message => {
            message.react('1️⃣')
            message.react('2️⃣')
            message.react('3️⃣')
            message.react('4️⃣')
            message.react('5️⃣')
            message.react('6️⃣')
            message.react('7️⃣')
            message.react('8️⃣')
            message.react('9️⃣')
            message.react('🔟')
            message.react('🥭')
            message.react('🍓')
            message.react('🍐')

            const collector = message.createReactionCollector(
                (reaction, user) => ['1️⃣'].includes(reaction.emoji.name) && user.id === author.id,
                { time: mstominutes(1) }
            )
            const checkcollector = message.createReactionCollector(
                (reaction, user) => ['1️⃣'].includes(reaction.emoji.name) && user.id === author.id,
                { time: mstoseconds(30) }
            )
            checkcollector.on('collect', reaction => {
                message.reactions.removeAll().then(async () => {
                    reaction.emoji.name === '1️⃣'
                    message.edit(page3)
                    OrderNumber = Math.floor(Math.random()*999999999+1)
                    const OrderEmbed = new Discord.MessageEmbed()
                    .setAuthor(`${author.tag}`, author.displayAvatarURL())
                    .setColor(`#00FF00`)
                    .addField("Order Number",`${OrderNumber}`)
                    message.channel.send(OrderEmbed)
                    var shoporders = client.channels.cache.get("715035099963457647")
                    const SkyblockOrder = new Discord.MessageEmbed()
                        .setAuthor(`${author.tag}`, author.displayAvatarURL())
                        .setTitle("✅ New Order!")
                        .setColor(`#00FF00`)
                        .addField("User", `<@${author.id}>`)
                        .addField("Purchased", "10M coins = 30 robux")
                        .addField("Order Number",`${OrderNumber}`)
                        .setTimestamp(message.createdAt)
                    shoporders.send(`<@&722079939943465091>`, SkyblockOrder)
                })
            })




            //Shop Item 2
            const collector2 = message.createReactionCollector(
                (reaction, user) => ['2️⃣'].includes(reaction.emoji.name) && user.id === author.id,
                { time: mstominutes(1) }
            )
            const checkcollector2 = message.createReactionCollector(
                (reaction, user) => ['2️⃣'].includes(reaction.emoji.name) && user.id === author.id,
                { time: mstoseconds(30) }
            )
            checkcollector2.on('collect', reaction => {
                message.reactions.removeAll().then(async () => {
                    reaction.emoji.name === '2️⃣'
                    message.edit(page3)
                    OrderNumber = Math.floor(Math.random()*999999999+1)
                    const OrderEmbed = new Discord.MessageEmbed()
                    .setAuthor(`${author.tag}`, author.displayAvatarURL())
                    .setColor(`#00FF00`)
                    .addField("Order Number",`${OrderNumber}`)
                    message.channel.send(OrderEmbed)
                    var shoporders = client.channels.cache.get("715035099963457647")
                    const SkyblockOrder = new Discord.MessageEmbed()
                        .setAuthor(`${author.tag}`, author.displayAvatarURL())
                        .setTitle("✅ New Order!")
                        .setColor(`#00FF00`)
                        .addField("User", `<@${author.id}>`)
                        .addField("Purchased", "20M coins = 50 robux")
                        .addField("Order Number",`${OrderNumber}`)
                        .setTimestamp(message.createdAt)
                    shoporders.send(`<@&722079939943465091>`, SkyblockOrder)
                })
            })




            //shop item 3
            const collector3 = message.createReactionCollector(
                (reaction, user) => ['3️⃣'].includes(reaction.emoji.name) && user.id === author.id,
                { time: mstominutes(1) }
            )
            const checkcollector3 = message.createReactionCollector(
                (reaction, user) => ['3️⃣'].includes(reaction.emoji.name) && user.id === author.id,
                { time: mstoseconds(30) }
            )
            checkcollector3.on('collect', reaction => {
                message.reactions.removeAll().then(async () => {
                    reaction.emoji.name === '3️⃣'
                    message.edit(page3)
                    OrderNumber = Math.floor(Math.random()*999999999+1)
                    const OrderEmbed = new Discord.MessageEmbed()
                    .setAuthor(`${author.tag}`, author.displayAvatarURL())
                    .setColor(`#00FF00`)
                    .addField("Order Number",`${OrderNumber}`)
                    message.channel.send(OrderEmbed)
                    var shoporders = client.channels.cache.get("715035099963457647")
                    const SkyblockOrder = new Discord.MessageEmbed()
                        .setAuthor(`${author.tag}`, author.displayAvatarURL())
                        .setTitle("✅ New Order!")
                        .setColor(`#00FF00`)
                        .addField("User", `<@${author.id}>`)
                        .addField("Purchased", "40M coins = 100 robux")
                        .addField("Order Number",`${OrderNumber}`)
                        .setTimestamp(message.createdAt)
                    shoporders.send(`<@&722079939943465091>`, SkyblockOrder)
                })
            })




            //shop item 4
            const collector4 = message.createReactionCollector(
                (reaction, user) => ['4️⃣'].includes(reaction.emoji.name) && user.id === author.id,
                { time: mstominutes(1) }
            )
            const checkcollector4 = message.createReactionCollector(
                (reaction, user) => ['4️⃣'].includes(reaction.emoji.name) && user.id === author.id,
                { time: mstoseconds(30) }
            )
            checkcollector4.on('collect', reaction => {
                message.reactions.removeAll().then(async () => {
                    reaction.emoji.name === '4️⃣'
                    OrderNumber = Math.floor(Math.random()*999999999+1)
                    const OrderEmbed = new Discord.MessageEmbed()
                    .setAuthor(`${author.tag}`, author.displayAvatarURL())
                    .setColor(`#00FF00`)
                    .addField("Order Number",`${OrderNumber}`)
                    message.channel.send(OrderEmbed)
                    message.edit(page3)
                    var shoporders = client.channels.cache.get("715035099963457647")
                    const SkyblockOrder = new Discord.MessageEmbed()
                        .setAuthor(`${author.tag}`, author.displayAvatarURL())
                        .setTitle("✅ New Order!")
                        .setColor(`#00FF00`)
                        .addField("User", `<@${author.id}>`)
                        .addField("Purchased", "100M coins = 200 robux")
                        .addField("Order Number",`${OrderNumber}`)
                        .setTimestamp(message.createdAt)
                    shoporders.send(`<@&722079939943465091>`, SkyblockOrder)
                })
            })



            //shop item 5
            const collector5 = message.createReactionCollector(
                (reaction, user) => ['5️⃣'].includes(reaction.emoji.name) && user.id === author.id,
                { time: mstominutes(1) }
            )
            const checkcollector5 = message.createReactionCollector(
                (reaction, user) => ['5️⃣'].includes(reaction.emoji.name) && user.id === author.id,
                { time: mstoseconds(30) }
            )
            checkcollector5.on('collect', reaction => {
                message.reactions.removeAll().then(async () => {
                    reaction.emoji.name === '5️⃣'
                    OrderNumber = Math.floor(Math.random()*999999999+1)
                    const OrderEmbed = new Discord.MessageEmbed()
                    .setAuthor(`${author.tag}`, author.displayAvatarURL())
                    .setColor(`#00FF00`)
                    .addField("Order Number",`${OrderNumber}`)
                    message.channel.send(OrderEmbed)
                    message.edit(page3)
                    var shoporders = client.channels.cache.get("715035099963457647")
                    const SkyblockOrder = new Discord.MessageEmbed()
                        .setAuthor(`${author.tag}`, author.displayAvatarURL())
                        .setTitle("✅ New Order!")
                        .setColor(`#00FF00`)
                        .addField("User", `<@${author.id}>`)
                        .addField("Purchased", "250M = 500 robux")
                        .addField("Order Number",`${OrderNumber}`)
                        .setTimestamp(message.createdAt)
                    shoporders.send(`<@&722079939943465091>`, SkyblockOrder)
                })
            })



            //shop item 6
            const collector6 = message.createReactionCollector(
                (reaction, user) => ['6️⃣'].includes(reaction.emoji.name) && user.id === author.id,
                { time: mstominutes(1) }
            )
            const checkcollector6 = message.createReactionCollector(
                (reaction, user) => ['6️⃣'].includes(reaction.emoji.name) && user.id === author.id,
                { time: mstoseconds(30) }
            )
            checkcollector6.on('collect', reaction => {
                message.reactions.removeAll().then(async () => {
                    reaction.emoji.name === '6️⃣'
                    message.edit(page3)
                    OrderNumber = Math.floor(Math.random()*999999999+1)
                    const OrderEmbed = new Discord.MessageEmbed()
                    .setAuthor(`${author.tag}`, author.displayAvatarURL())
                    .setColor(`#00FF00`)
                    .addField("Order Number",`${OrderNumber}`)
                    message.channel.send(OrderEmbed)
                    var shoporders = client.channels.cache.get("715035099963457647")
                    const SkyblockOrder = new Discord.MessageEmbed()
                        .setAuthor(`${author.tag}`, author.displayAvatarURL())
                        .setTitle("✅ New Order!")
                        .setColor(`#00FF00`)
                        .addField("User", `<@${author.id}>`)
                        .addField("Purchased", "500M coins = 1k robux")
                        .addField("Order Number",`${OrderNumber}`)
                        .setTimestamp(message.createdAt)
                    shoporders.send(`<@&722079939943465091>`, SkyblockOrder)
                })
            })



            //shop item 7
            const collector7 = message.createReactionCollector(
                (reaction, user) => ['7️⃣'].includes(reaction.emoji.name) && user.id === author.id,
                { time: mstominutes(1) }
            )
            const checkcollector7 = message.createReactionCollector(
                (reaction, user) => ['7️⃣'].includes(reaction.emoji.name) && user.id === author.id,
                { time: mstoseconds(30) }
            )
            checkcollector7.on('collect', reaction => {
                message.reactions.removeAll().then(async () => {
                    reaction.emoji.name === '7️⃣'
                    message.edit(page3)
                    OrderNumber = Math.floor(Math.random()*999999999+1)
                    const OrderEmbed = new Discord.MessageEmbed()
                    .setAuthor(`${author.tag}`, author.displayAvatarURL())
                    .setColor(`#00FF00`)
                    .addField("Order Number",`${OrderNumber}`)
                    message.channel.send(OrderEmbed)
                    var shoporders = client.channels.cache.get("715035099963457647")
                    const SkyblockOrder = new Discord.MessageEmbed()
                        .setAuthor(`${author.tag}`, author.displayAvatarURL())
                        .setTitle("✅ New Order!")
                        .setColor(`#00FF00`)
                        .addField("User", `<@${author.id}>`)
                        .addField("Purchased", "1B Coins = 1k Robux")
                        .addField("Order Number",`${OrderNumber}`)
                        .setTimestamp(message.createdAt)
                    shoporders.send(`<@&722079939943465091>`, SkyblockOrder)
                })
            })



            //shop item 8
            const collector8 = message.createReactionCollector(
                (reaction, user) => ['8️⃣'].includes(reaction.emoji.name) && user.id === author.id,
                { time: mstominutes(1) }
            )
            const checkcollector8 = message.createReactionCollector(
                (reaction, user) => ['8️⃣'].includes(reaction.emoji.name) && user.id === author.id,
                { time: mstoseconds(30) }
            )
            checkcollector8.on('collect', reaction => {
                message.reactions.removeAll().then(async () => {
                    reaction.emoji.name === '8️⃣'
                    message.edit(page3)
                    OrderNumber = Math.floor(Math.random()*999999999+1)
                    const OrderEmbed = new Discord.MessageEmbed()
                    .setAuthor(`${author.tag}`, author.displayAvatarURL())
                    .setColor(`#00FF00`)
                    .addField("Order Number",`${OrderNumber}`)
                    message.channel.send(OrderEmbed)
                    var shoporders = client.channels.cache.get("715035099963457647")
                    const SkyblockOrder = new Discord.MessageEmbed()
                        .setAuthor(`${author.tag}`, author.displayAvatarURL())
                        .setTitle("✅ New Order!")
                        .setColor(`#00FF00`)
                        .addField("User", `<@${author.id}>`)
                        .addField("Purchased", "5B coins = 5k robux")
                        .addField("Order Number",`${OrderNumber}`)
                        .setTimestamp(message.createdAt)
                    shoporders.send(`<@&722079939943465091>`, SkyblockOrder)
                })
            })



            //shop item 9
            const collector9 = message.createReactionCollector(
                (reaction, user) => ['9️⃣'].includes(reaction.emoji.name) && user.id === author.id,
                { time: mstominutes(1) }
            )
            const checkcollector9 = message.createReactionCollector(
                (reaction, user) => ['9️⃣'].includes(reaction.emoji.name) && user.id === author.id,
                { time: mstoseconds(30) }
            )
            checkcollector9.on('collect', reaction => {
                message.reactions.removeAll().then(async () => {
                    reaction.emoji.name === '9️⃣'
                    message.edit(page3)
                    OrderNumber = Math.floor(Math.random()*999999999+1)
                    const OrderEmbed = new Discord.MessageEmbed()
                    .setAuthor(`${author.tag}`, author.displayAvatarURL())
                    .setColor(`#00FF00`)
                    .addField("Order Number",`${OrderNumber}`)
                    message.channel.send(OrderEmbed)
                    var shoporders = client.channels.cache.get("715035099963457647")
                    const SkyblockOrder = new Discord.MessageEmbed()
                        .setAuthor(`${author.tag}`, author.displayAvatarURL())
                        .setTitle("✅ New Order!")
                        .setColor(`#00FF00`)
                        .addField("User", `<@${author.id}>`)
                        .addField("Purchased", "10B coins = 10k robux")
                        .addField("Order Number",`${OrderNumber}`)
                        .setTimestamp(message.createdAt)
                    shoporders.send(`<@&722079939943465091>`, SkyblockOrder)
                })
            })
            const collector20 = message.createReactionCollector(
                (reaction, user) => ['🔟'].includes(reaction.emoji.name) && user.id === author.id,
                { time: mstominutes(1) }
            )
            const checkcollector20 = message.createReactionCollector(
                (reaction, user) => ['🔟'].includes(reaction.emoji.name) && user.id === author.id,
                { time: mstoseconds(30) }
            )
            checkcollector20.on('collect', reaction => {
                message.reactions.removeAll().then(async () => {
                    reaction.emoji.name === '🔟'
                    message.edit(page3)
                    OrderNumber = Math.floor(Math.random()*999999999+1)
                    const OrderEmbed = new Discord.MessageEmbed()
                    .setAuthor(`${author.tag}`, author.displayAvatarURL())
                    .setColor(`#00FF00`)
                    .addField("Order Number",`${OrderNumber}`)
                    message.channel.send(OrderEmbed)
                    var shoporders = client.channels.cache.get("715035099963457647")
                    const SkyblockOrder = new Discord.MessageEmbed()
                        .setAuthor(`${author.tag}`, author.displayAvatarURL())
                        .setTitle("✅ New Order!")
                        .setColor(`#00FF00`)
                        .addField("User", `<@${author.id}>`)
                        .addField("Purchased", "20B = 20k Robux")
                        .addField("Order Number",`${OrderNumber}`)
                        .setTimestamp(message.createdAt)
                    shoporders.send(`<@&722079939943465091>`, SkyblockOrder)
                })
            })
            const collector10 = message.createReactionCollector(
                (reaction, user) => ['🍓'].includes(reaction.emoji.name) && user.id === author.id,
                { time: mstominutes(1) }
            )
            const checkcollector10 = message.createReactionCollector(
                (reaction, user) => ['🍓'].includes(reaction.emoji.name) && user.id === author.id,
                { time: mstoseconds(30) }
            )
            collector10.on('collect', reaction => {
                message.reactions.removeAll().then(async () => {
                    reaction.emoji.name === '🍓'
                    message.edit(page3)
                    OrderNumber = Math.floor(Math.random()*999999999+1)
                    const OrderEmbed = new Discord.MessageEmbed()
                    .setAuthor(`${author.tag}`, author.displayAvatarURL())
                    .setColor(`#00FF00`)
                    .addField("Order Number",`${OrderNumber}`)
                    message.channel.send(OrderEmbed)
                    var shoporders = client.channels.cache.get("715035099963457647")
                    const SkyblockOrder = new Discord.MessageEmbed()
                        .setAuthor(`${author.tag}`, author.displayAvatarURL())
                        .setTitle("✅ New Order!")
                        .setColor(`#00FF00`)
                        .addField("User", `<@${author.id}>`)
                        .addField("Purchased", "500 Berry Seeds = 220 robux")
                        .addField("Order Number",`${OrderNumber}`)
                        .setTimestamp(message.createdAt)
                    shoporders.send(`<@&722079939943465091>`, SkyblockOrder)
                })
            })
            const collector11 = message.createReactionCollector(
                (reaction, user) => ['🍐'].includes(reaction.emoji.name) && user.id === author.id,
                { time: mstominutes(1) }
            )
            const checkcollector11  = message.createReactionCollector(
                (reaction, user) => ['🍐'].includes(reaction.emoji.name) && user.id === author.id,
                { time: mstoseconds(30) }
            )
            collector11 .on('collect', reaction => {
                message.reactions.removeAll().then(async () => {
                    reaction.emoji.name === '🍐'
                    message.edit(page3)
                    OrderNumber = Math.floor(Math.random()*999999999+1)
                    const OrderEmbed = new Discord.MessageEmbed()
                    .setAuthor(`${author.tag}`, author.displayAvatarURL())
                    .setColor(`#00FF00`)
                    .addField("Order Number",`${OrderNumber}`)
                    message.channel.send(OrderEmbed)
                    var shoporders = client.channels.cache.get("715035099963457647")
                    const SkyblockOrder = new Discord.MessageEmbed()
                        .setAuthor(`${author.tag}`, author.displayAvatarURL())
                        .setTitle("✅ New Order!")
                        .setColor(`#00FF00`)
                        .addField("User", `<@${author.id}>`)
                        .addField("Purchased", "1000 Berry Seeds = 450 robux")
                        .addField("Order Number",`${OrderNumber}`)
                        .setTimestamp(message.createdAt)
                    shoporders.send(`<@&722079939943465091>`, SkyblockOrder)
                })
            })
            const collector12 = message.createReactionCollector(
                (reaction, user) => ['🥭'].includes(reaction.emoji.name) && user.id === author.id,
                { time: mstominutes(1) }
            )
            const checkcollector12 = message.createReactionCollector(
                (reaction, user) => ['🥭'].includes(reaction.emoji.name) && user.id === author.id,
                { time: mstoseconds(30) }
            )
            collector12.on('collect', reaction => {
                message.reactions.removeAll().then(async () => {
                    reaction.emoji.name === '🥭'
                    message.edit(page3)
                    OrderNumber = Math.floor(Math.random()*999999999+1)
                    const OrderEmbed = new Discord.MessageEmbed()
                    .setAuthor(`${author.tag}`, author.displayAvatarURL())
                    .setColor(`#00FF00`)
                    .addField("Order Number",`${OrderNumber}`)
                    message.channel.send(OrderEmbed)
                    var shoporders = client.channels.cache.get("715035099963457647")
                    const SkyblockOrder = new Discord.MessageEmbed()
                        .setAuthor(`${author.tag}`, author.displayAvatarURL())
                        .setTitle("✅ New Order!")
                        .setColor(`#00FF00`)
                        .addField("User", `<@${author.id}>`)
                        .addField("Purchased", "100 Berry Seeds = 50 robux")
                        .addField("Order Number",`${OrderNumber}`)
                        .setTimestamp(message.createdAt)
                    shoporders.send(`<@&722079939943465091>`, SkyblockOrder)
                })
            })
        })
    }





    // shop noah



    if (message.content.startsWith(prefix + 'noah')) {

        const guilds = client.guilds.cache.array()
        const eleven = message.guild.emojis.cache.find(emoji => emoji.name === '11');
        const twelve = message.guild.emojis.cache.find(emoji => emoji.name === '12');
        const thirteen = message.guild.emojis.cache.find(emoji => emoji.name === '13');
        const generateEmbed = start => {
            const current = guilds.slice(start, start + 1)

            const embed = new Discord.MessageEmbed()
                .setAuthor(`${author.tag}`, author.displayAvatarURL())
                .setColor("RANDOM")
                .setTitle(`Noah's SkyBlock Shop!`)
                .addField("Coins", "**__Payment: Group funds or shirt. [Shirts will be 30% more because of roblox fees]__**\n1️⃣ 100k coins = 20 robux\n2️⃣ 500k coins = 80 robux\n3️⃣ 1m coins = 150 robux\n4️⃣5m = 600 Robux\n5️⃣10m = 1000 robux")
                .addField("Berry Seeds", "Soon")
                .addField("Platforms", "**__Payment: Group funds or shirt. [Shirts will be 30% more because of roblox fees]__**\n6️⃣ 20x20 = 30 robux\n7️⃣ 50x50 = 60 Robux\n8️⃣ 75x75 = 80 Robux\n9️⃣ 100x100 = 125 Robux\n🔟 1000x1000 = 1000 Robux\n *The prices are based on grass being used, if you want anything else prices may rise*")
            return embed
        }

        const author = message.author

        const page2 = new Discord.MessageEmbed()
            .setAuthor(`${author.tag}`, author.displayAvatarURL())
            .setColor("RANDOM")
            .setTitle(`Noah's SkyBlock Shop!`)
            .setDescription("If you")

        const page3 = new Discord.MessageEmbed()
            .setAuthor(`${author.tag}`, author.displayAvatarURL())
            .setColor(`#00FF00`)
            .setTitle(`Noah's SkyBlock Shop!`)
            .setDescription(`Order has been sent to <@705168809295740988>`)
            .setFooter("If you think this was a mistake please type .mistake")

        message.channel.send(generateEmbed(0)).then(message => {
            message.react('1️⃣')
            message.react('2️⃣')
            message.react('3️⃣')
            message.react('4️⃣')
            message.react('5️⃣')
            message.react('6️⃣')
            message.react('7️⃣')
            message.react('8️⃣')
            message.react('9️⃣')
            message.react('🔟')


            const collector = message.createReactionCollector(
                (reaction, user) => ['1️⃣'].includes(reaction.emoji.name) && user.id === author.id,
                { time: mstominutes(1) }
            )
            const checkcollector = message.createReactionCollector(
                (reaction, user) => ['1️⃣'].includes(reaction.emoji.name) && user.id === author.id,
                { time: mstoseconds(30) }
            )
            checkcollector.on('collect', reaction => {
                message.reactions.removeAll().then(async () => {
                    reaction.emoji.name === '1️⃣'
                    message.edit(page3)
                    var shoporders = client.channels.cache.get("715035099963457647")
                    const SkyblockOrder = new Discord.MessageEmbed()
                        .setAuthor(`${author.tag}`, author.displayAvatarURL())
                        .setTitle("✅ New Order!")
                        .setColor(`#00FF00`)
                        .addField("User", `<@${author.id}>`)
                        .addField("Purchased", "100K for 20 Robux")
                        .setTimestamp(message.createdAt)
                    shoporders.send(`<@705168809295740988>`, SkyblockOrder)
                })
            })




            //Shop Item 2
            const collector2 = message.createReactionCollector(
                (reaction, user) => ['2️⃣'].includes(reaction.emoji.name) && user.id === author.id,
                { time: mstominutes(1) }
            )
            const checkcollector2 = message.createReactionCollector(
                (reaction, user) => ['2️⃣'].includes(reaction.emoji.name) && user.id === author.id,
                { time: mstoseconds(30) }
            )
            checkcollector2.on('collect', reaction => {
                message.reactions.removeAll().then(async () => {
                    reaction.emoji.name === '2️⃣'
                    message.edit(page3)
                    var shoporders = client.channels.cache.get("715035099963457647")
                    const SkyblockOrder = new Discord.MessageEmbed()
                        .setAuthor(`${author.tag}`, author.displayAvatarURL())
                        .setTitle("✅ New Order!")
                        .setColor(`#00FF00`)
                        .addField("User", `<@${author.id}>`)
                        .addField("Purchased", "500K for 80 Robux")
                        .setTimestamp(message.createdAt)
                    shoporders.send(`<@705168809295740988>`, SkyblockOrder)
                })
            })




            //shop item 3
            const collector3 = message.createReactionCollector(
                (reaction, user) => ['3️⃣'].includes(reaction.emoji.name) && user.id === author.id,
                { time: mstominutes(1) }
            )
            const checkcollector3 = message.createReactionCollector(
                (reaction, user) => ['3️⃣'].includes(reaction.emoji.name) && user.id === author.id,
                { time: mstoseconds(30) }
            )
            checkcollector3.on('collect', reaction => {
                message.reactions.removeAll().then(async () => {
                    reaction.emoji.name === '3️⃣'
                    message.edit(page3)
                    var shoporders = client.channels.cache.get("715035099963457647")
                    const SkyblockOrder = new Discord.MessageEmbed()
                        .setAuthor(`${author.tag}`, author.displayAvatarURL())
                        .setTitle("✅ New Order!")
                        .setColor(`#00FF00`)
                        .addField("User", `<@${author.id}>`)
                        .addField("Purchased", "1Mil for 150 Robux")
                        .setTimestamp(message.createdAt)
                    shoporders.send(`<@705168809295740988>`, SkyblockOrder)
                })
            })




            //shop item 4
            const collector4 = message.createReactionCollector(
                (reaction, user) => ['4️⃣'].includes(reaction.emoji.name) && user.id === author.id,
                { time: mstominutes(1) }
            )
            const checkcollector4 = message.createReactionCollector(
                (reaction, user) => ['4️⃣'].includes(reaction.emoji.name) && user.id === author.id,
                { time: mstoseconds(30) }
            )
            checkcollector4.on('collect', reaction => {
                message.reactions.removeAll().then(async () => {
                    reaction.emoji.name === '4️⃣'
                    message.edit(page3)
                    var shoporders = client.channels.cache.get("715035099963457647")
                    const SkyblockOrder = new Discord.MessageEmbed()
                        .setAuthor(`${author.tag}`, author.displayAvatarURL())
                        .setTitle("✅ New Order!")
                        .setColor(`#00FF00`)
                        .addField("User", `<@${author.id}>`)
                        .addField("Purchased", "5Mil for 600 Robux")
                        .setTimestamp(message.createdAt)
                    shoporders.send(`<@705168809295740988>`, SkyblockOrder)
                })
            })



            //shop item 5
            const collector5 = message.createReactionCollector(
                (reaction, user) => ['5️⃣'].includes(reaction.emoji.name) && user.id === author.id,
                { time: mstominutes(1) }
            )
            const checkcollector5 = message.createReactionCollector(
                (reaction, user) => ['5️⃣'].includes(reaction.emoji.name) && user.id === author.id,
                { time: mstoseconds(30) }
            )
            checkcollector5.on('collect', reaction => {
                message.reactions.removeAll().then(async () => {
                    reaction.emoji.name === '5️⃣'
                    message.edit(page3)
                    var shoporders = client.channels.cache.get("715035099963457647")
                    const SkyblockOrder = new Discord.MessageEmbed()
                        .setAuthor(`${author.tag}`, author.displayAvatarURL())
                        .setTitle("✅ New Order!")
                        .setColor(`#00FF00`)
                        .addField("User", `<@${author.id}>`)
                        .addField("Purchased", "10Mil for 1000 Robux")
                        .setTimestamp(message.createdAt)
                    shoporders.send(`<@705168809295740988>`, SkyblockOrder)
                })
            })



            //shop item 6
            const collector6 = message.createReactionCollector(
                (reaction, user) => ['6️⃣'].includes(reaction.emoji.name) && user.id === author.id,
                { time: mstominutes(1) }
            )
            const checkcollector6 = message.createReactionCollector(
                (reaction, user) => ['6️⃣'].includes(reaction.emoji.name) && user.id === author.id,
                { time: mstoseconds(30) }
            )
            checkcollector6.on('collect', reaction => {
                message.reactions.removeAll().then(async () => {
                    reaction.emoji.name === '6️⃣'
                    message.edit(page3)
                    var shoporders = client.channels.cache.get("715035099963457647")
                    const SkyblockOrder = new Discord.MessageEmbed()
                        .setAuthor(`${author.tag}`, author.displayAvatarURL())
                        .setTitle("✅ New Order!")
                        .setColor(`#00FF00`)
                        .addField("User", `<@${author.id}>`)
                        .addField("Purchased", "20x20 = 30 Robux")
                        .setTimestamp(message.createdAt)
                    shoporders.send(`<@705168809295740988>`, SkyblockOrder)
                })
            })



            //shop item 7
            const collector7 = message.createReactionCollector(
                (reaction, user) => ['7️⃣'].includes(reaction.emoji.name) && user.id === author.id,
                { time: mstominutes(1) }
            )
            const checkcollector7 = message.createReactionCollector(
                (reaction, user) => ['7️⃣'].includes(reaction.emoji.name) && user.id === author.id,
                { time: mstoseconds(30) }
            )
            checkcollector7.on('collect', reaction => {
                message.reactions.removeAll().then(async () => {
                    reaction.emoji.name === '7️⃣'
                    message.edit(page3)
                    var shoporders = client.channels.cache.get("715035099963457647")
                    const SkyblockOrder = new Discord.MessageEmbed()
                        .setAuthor(`${author.tag}`, author.displayAvatarURL())
                        .setTitle("✅ New Order!")
                        .setColor(`#00FF00`)
                        .addField("User", `<@${author.id}>`)
                        .addField("Purchased", "50x50 for 60 Robux")
                        .setTimestamp(message.createdAt)
                    shoporders.send(`<@705168809295740988>`, SkyblockOrder)
                })
            })



            //shop item 8
            const collector8 = message.createReactionCollector(
                (reaction, user) => ['8️⃣'].includes(reaction.emoji.name) && user.id === author.id,
                { time: mstominutes(1) }
            )
            const checkcollector8 = message.createReactionCollector(
                (reaction, user) => ['8️⃣'].includes(reaction.emoji.name) && user.id === author.id,
                { time: mstoseconds(30) }
            )
            checkcollector8.on('collect', reaction => {
                message.reactions.removeAll().then(async () => {
                    reaction.emoji.name === '8️⃣'
                    message.edit(page3)
                    var shoporders = client.channels.cache.get("715035099963457647")
                    const SkyblockOrder = new Discord.MessageEmbed()
                        .setAuthor(`${author.tag}`, author.displayAvatarURL())
                        .setTitle("✅ New Order!")
                        .setColor(`#00FF00`)
                        .addField("User", `<@${author.id}>`)
                        .addField("Purchased", "75x75 for 80 Robux")
                        .setTimestamp(message.createdAt)
                    shoporders.send(`<@705168809295740988>`, SkyblockOrder)
                })
            })



            //shop item 9
            const collector9 = message.createReactionCollector(
                (reaction, user) => ['9️⃣'].includes(reaction.emoji.name) && user.id === author.id,
                { time: mstominutes(1) }
            )
            const checkcollector9 = message.createReactionCollector(
                (reaction, user) => ['9️⃣'].includes(reaction.emoji.name) && user.id === author.id,
                { time: mstoseconds(30) }
            )
            checkcollector9.on('collect', reaction => {
                message.reactions.removeAll().then(async () => {
                    reaction.emoji.name === '9️⃣'
                    message.edit(page3)
                    var shoporders = client.channels.cache.get("715035099963457647")
                    const SkyblockOrder = new Discord.MessageEmbed()
                        .setAuthor(`${author.tag}`, author.displayAvatarURL())
                        .setTitle("✅ New Order!")
                        .setColor(`#00FF00`)
                        .addField("User", `<@${author.id}>`)
                        .addField("Purchased", "100x100 for 125 Robux")
                        .setTimestamp(message.createdAt)
                    shoporders.send(`<@705168809295740988>`, SkyblockOrder)
                })
            })



            //shop item 10
            const collector10 = message.createReactionCollector(
                (reaction, user) => ['🔟'].includes(reaction.emoji.name) && user.id === author.id,
                { time: mstominutes(1) }
            )
            const checkcollector10 = message.createReactionCollector(
                (reaction, user) => ['🔟'].includes(reaction.emoji.name) && user.id === author.id,
                { time: mstoseconds(30) }
            )
            checkcollector10.on('collect', reaction => {
                message.reactions.removeAll().then(async () => {
                    reaction.emoji.name === '🔟'
                    message.edit(page3)
                    var shoporders = client.channels.cache.get("715035099963457647")
                    const SkyblockOrder = new Discord.MessageEmbed()
                        .setAuthor(`${author.tag}`, author.displayAvatarURL())
                        .setTitle("✅ New Order!")
                        .setColor(`#00FF00`)
                        .addField("User", `<@${author.id}>`)
                        .addField("Purchased", "1000x1000 for 1000 Robux")
                        .setTimestamp(message.createdAt)
                    shoporders.send(`<@705168809295740988>`, SkyblockOrder)
                })
            })
        })
        //shop item 13
    }
    if (message.content.startsWith(prefix + 'mistake')) {
        const author = message.author
        let args = message.content.substring(prefix.length).split(" ");
        let reason = args.join(" ").slice(8)
        if (reason == ""){
            const shopMistake = new Discord.MessageEmbed()
            .setAuthor(`${author.tag}`, author.displayAvatarURL())
            .setColor(`#cc0000`)
            .setTitle(`**Please include a order number! *This is the order number that was sent after your purchase**`)
            .setTimestamp(message.createdAt)
        message.channel.send(shopMistake)
        return;
        }
        const shopMistake = new Discord.MessageEmbed()
            .setAuthor(`${author.tag}`, author.displayAvatarURL())
            .setColor(`#cc0000`)
            .setDescription(`✅ **You have Canceled your order!**`)
            .setFooter("Please keep in mind that this message will be ignored if you have not actually purchased something.")
            .setTimestamp(message.createdAt)
        message.channel.send(shopMistake)
        var shoporderschat = client.channels.cache.get("715035099963457647")
        const shopMistake2 = new Discord.MessageEmbed()
            .setAuthor(`${author.tag}`, author.displayAvatarURL())
            .setColor(`#cc0000`)
            .setDescription(`<@${author.id}> Has cancelled their order, if there is one.`)
            .addField("Order Number", `${reason}`)
            .setTimestamp(message.createdAt)
        shoporderschat.send(shopMistake2)
    }



    if (message.content.startsWith(prefix + '2sync')) {

        const guilds = client.guilds.cache.array()
        const eleven = message.guild.emojis.cache.find(emoji => emoji.name === '11');
        const twelve = message.guild.emojis.cache.find(emoji => emoji.name === '12');
        const thirteen = message.guild.emojis.cache.find(emoji => emoji.name === '13');
        const generateEmbed = start => {
            const current = guilds.slice(start, start + 1)

            const embed = new Discord.MessageEmbed()
                .setAuthor(`${author.tag}`, author.displayAvatarURL())
                .setColor("RANDOM")
                .setTitle(`Synctional's SkyBlock Shop! 2/2`)
                .addField("Others", "**__GROUP FUNDS ONLY or shirt (30% tax)__**\n🔟 50 gold = 35 robux (cheap)\n⛏️ 1 Crystalized Iron = 35 robux\n 🔑 1 Buffalkor Key = 5 Robux\n 🔨 Glided Steel Hammer = 100 Robux\n 🎛️ Smelter = 15 robux\n ✂️ Stone Cutter = 25 robux each\n 📦 Vending Machine = 15 Robux")
                .addField("Lighting Station Items", `**__GROUP FUNDS ONLY or shirt (30% tax)__**\n🕯️ Candle = 1 robux each\n💡 Lantern = 1 robux each\n🚦 Lamp Post = 1 robux each`)
                .addField("Misc", "🔦 Torches for 25 Robux\n🧪 Test Totem for 25 Robux")
                .addField("Selling Robux", "💰 900 Robux = $10 Nitro\n💸 600 robux = $5 Amazon Gift Card\n**Selling the robux, not buying**")
                .setFooter("Do not react until all reactions are added. Your purchase will not be counted")
                return embed
        }

        const author = message.author

        const page2 = new Discord.MessageEmbed()
            .setAuthor(`${author.tag}`, author.displayAvatarURL())
            .setColor("RANDOM")
            .setTitle(`Synctional's SkyBlock Shop!`)
            .setDescription("If you")

        const page3 = new Discord.MessageEmbed()
            .setAuthor(`${author.tag}`, author.displayAvatarURL())
            .setColor(`#00FF00`)
            .setTitle(`Synctional's SkyBlock Shop!`)
            .setDescription(`Order has been sent to Synctional's trusted sellers.`)
            .setFooter("If you think this was a mistake please type .mistake")


        message.channel.send(generateEmbed(0)).then(message => {
            message.react('🔟')
            message.react('⛏️')
            message.react('🔑')
            message.react('🔨')
            message.react('🎛️')
            message.react('✂️')
            message.react('📦')
            message.react('🕯️')
            message.react('💡')
            message.react('🚦')
            message.react('🔦')
            message.react('🧪')
            message.react('💰')
            message.react('💸')



            //Shop Item 2




            //shop item 3



            //shop item 4


            //shop item 5


            //shop item 



            //shop item 7
            const collector7 = message.createReactionCollector(
                (reaction, user) => ['🔦'].includes(reaction.emoji.name) && user.id === author.id,
                { time: mstominutes(1) }
            )
            const checkcollector7 = message.createReactionCollector(
                (reaction, user) => ['🔦'].includes(reaction.emoji.name) && user.id === author.id,
                { time: mstoseconds(30) }
            )
            checkcollector7.on('collect', reaction => {
                message.reactions.removeAll().then(async () => {
                    reaction.emoji.name === '🔦'
                    OrderNumber = Math.floor(Math.random()*999999999+1)
                    const OrderEmbed = new Discord.MessageEmbed()
                    .setAuthor(`${author.tag}`, author.displayAvatarURL())
                    .setColor(`#00FF00`)
                    .addField("Order Number",`${OrderNumber}`)
                    message.channel.send(OrderEmbed)
                    message.edit(page3)
                    var shoporders = client.channels.cache.get("715035099963457647")
                    const SkyblockOrder = new Discord.MessageEmbed()
                        .setAuthor(`${author.tag}`, author.displayAvatarURL())
                        .setTitle("✅ New Order!")
                        .setColor(`#00FF00`)
                        .addField("User", `<@${author.id}>`)
                        .addField("Purchased", "Torches for 25 Robux")
                        .addField("Order Number",`${OrderNumber}`)
                        .setTimestamp(message.createdAt)
                    shoporders.send(`<@&722079939943465091>`, SkyblockOrder)
                })
            })



            //shop item 8
            const collector8 = message.createReactionCollector(
                (reaction, user) => ['🧪'].includes(reaction.emoji.name) && user.id === author.id,
                { time: mstominutes(1) }
            )
            const checkcollector8 = message.createReactionCollector(
                (reaction, user) => ['🧪'].includes(reaction.emoji.name) && user.id === author.id,
                { time: mstoseconds(30) }
            )
            checkcollector8.on('collect', reaction => {
                message.reactions.removeAll().then(async () => {
                    reaction.emoji.name === '🧪'
                    OrderNumber = Math.floor(Math.random()*999999999+1)
                    const OrderEmbed = new Discord.MessageEmbed()
                    .setAuthor(`${author.tag}`, author.displayAvatarURL())
                    .setColor(`#00FF00`)
                    .addField("Order Number",`${OrderNumber}`)
                    message.channel.send(OrderEmbed)
                    message.edit(page3)
                    var shoporders = client.channels.cache.get("715035099963457647")
                    const SkyblockOrder = new Discord.MessageEmbed()
                        .setAuthor(`${author.tag}`, author.displayAvatarURL())
                        .setTitle("✅ New Order!")
                        .setColor(`#00FF00`)
                        .addField("User", `<@${author.id}>`)
                        .addField("Purchased", "Test Totem for 25 Robux")
                        .addField("Order Number",`${OrderNumber}`)
                        .setTimestamp(message.createdAt)
                    shoporders.send(`<@&722079939943465091>`, SkyblockOrder)
                })
            })

            const collector10 = message.createReactionCollector(
                (reaction, user) => ['🔟'].includes(reaction.emoji.name) && user.id === author.id,
                { time: mstominutes(1) }
            )
            const checkcollector10 = message.createReactionCollector(
                (reaction, user) => ['🔟'].includes(reaction.emoji.name) && user.id === author.id,
                { time: mstoseconds(30) }
            )
            checkcollector10.on('collect', reaction => {
                message.reactions.removeAll().then(async () => {
                    reaction.emoji.name === '🔟'
                    OrderNumber = Math.floor(Math.random()*999999999+1)
                    const OrderEmbed = new Discord.MessageEmbed()
                    .setAuthor(`${author.tag}`, author.displayAvatarURL())
                    .setColor(`#00FF00`)
                    .addField("Order Number",`${OrderNumber}`)
                    message.channel.send(OrderEmbed)
                    message.edit(page3)
                    var shoporders = client.channels.cache.get("715035099963457647")
                    const SkyblockOrder = new Discord.MessageEmbed()
                        .setAuthor(`${author.tag}`, author.displayAvatarURL())
                        .setTitle("✅ New Order!")
                        .setColor(`#00FF00`)
                        .addField("User", `<@${author.id}>`)
                        .addField("Purchased", "Glided Steel Hammer = 100 robux (MOST OP ITEM)")
                        .addField("Order Number",`${OrderNumber}`)
                        .setTimestamp(message.createdAt)
                    shoporders.send(`<@&722079939943465091>`, SkyblockOrder)
                })
            })





            //shop item 11
            const collector11 = message.createReactionCollector(
                (reaction, user) => ['🕯️'].includes(reaction.emoji.name) && user.id === author.id,
                { time: mstominutes(1) }
            )
            const checkcollector11 = message.createReactionCollector(
                (reaction, user) => ['🕯️'].includes(reaction.emoji.name) && user.id === author.id,
                { time: mstoseconds(30) }
            )
            checkcollector11.on('collect', reaction => {
                message.reactions.removeAll().then(async () => {
                    reaction.emoji.name === '🕯️'
                    OrderNumber = Math.floor(Math.random()*999999999+1)
                    const OrderEmbed = new Discord.MessageEmbed()
                    .setAuthor(`${author.tag}`, author.displayAvatarURL())
                    .setColor(`#00FF00`)
                    .addField("Order Number",`${OrderNumber}`)
                    message.channel.send(OrderEmbed)
                    message.edit(page3)
                    var shoporders = client.channels.cache.get("715035099963457647")
                    const SkyblockOrder = new Discord.MessageEmbed()
                        .setAuthor(`${author.tag}`, author.displayAvatarURL())
                        .setTitle("✅ New Order!")
                        .setColor(`#00FF00`)
                        .addField("User", `<@${author.id}>`)
                        .addField("Purchased", "Candle = 1 robux each")
                        .addField("Order Number",`${OrderNumber}`)
                        .setTimestamp(message.createdAt)
                    shoporders.send(`<@&722079939943465091>`, SkyblockOrder)
                })
            })




            //shop item 12
            const collector12 = message.createReactionCollector(
                (reaction, user) => ['💡'].includes(reaction.emoji.name) && user.id === author.id,
                { time: mstominutes(1) }
            )
            const checkcollector12 = message.createReactionCollector(
                (reaction, user) => ['💡'].includes(reaction.emoji.name) && user.id === author.id,
                { time: mstoseconds(30) }
            )
            checkcollector12.on('collect', reaction => {
                message.reactions.removeAll().then(async () => {
                    reaction.emoji.name === '💡'
                    OrderNumber = Math.floor(Math.random()*999999999+1)
                    const OrderEmbed = new Discord.MessageEmbed()
                    .setAuthor(`${author.tag}`, author.displayAvatarURL())
                    .setColor(`#00FF00`)
                    .addField("Order Number",`${OrderNumber}`)
                    message.channel.send(OrderEmbed)
                    message.edit(page3)
                    var shoporders = client.channels.cache.get("715035099963457647")
                    const SkyblockOrder = new Discord.MessageEmbed()
                        .setAuthor(`${author.tag}`, author.displayAvatarURL())
                        .setTitle("✅ New Order!")
                        .setColor(`#00FF00`)
                        .addField("User", `<@${author.id}>`)
                        .addField("Purchased", "Lantern = 1 each")
                        .addField("Order Number",`${OrderNumber}`)
                        .setTimestamp(message.createdAt)
                    shoporders.send(`<@&722079939943465091>`, SkyblockOrder)
                })
            })




            //shop item 13
            const collector13 = message.createReactionCollector(
                (reaction, user) => ['🚦'].includes(reaction.emoji.name) && user.id === author.id,
                { time: mstominutes(1) }
            )
            const checkcollector13 = message.createReactionCollector(
                (reaction, user) => ['🚦'].includes(reaction.emoji.name) && user.id === author.id,
                { time: mstoseconds(30) }
            )
            checkcollector13.on('collect', reaction => {
                message.reactions.removeAll().then(async () => {
                    reaction.emoji.name === '🚦'
                    OrderNumber = Math.floor(Math.random()*999999999+1)
                    const OrderEmbed = new Discord.MessageEmbed()
                    .setAuthor(`${author.tag}`, author.displayAvatarURL())
                    .setColor(`#00FF00`)
                    .addField("Order Number",`${OrderNumber}`)
                    message.channel.send(OrderEmbed)
                    message.edit(page3)
                    var shoporders = client.channels.cache.get("715035099963457647")
                    const SkyblockOrder = new Discord.MessageEmbed()
                        .setAuthor(`${author.tag}`, author.displayAvatarURL())
                        .setTitle("✅ New Order!")
                        .setColor(`#00FF00`)
                        .addField("User", `<@${author.id}>`)
                        .addField("Purchased", "Lamp Post = 1 robux each")
                        .addField("Order Number",`${OrderNumber}`)
                        .setTimestamp(message.createdAt)
                    shoporders.send(`<@&722079939943465091>`, SkyblockOrder)
                })
            })
            const collector14 = message.createReactionCollector(
                (reaction, user) => ['🔑'].includes(reaction.emoji.name) && user.id === author.id,
                { time: mstominutes(1) }
            )
            const checkcollector14 = message.createReactionCollector(
                (reaction, user) => ['🔑'].includes(reaction.emoji.name) && user.id === author.id,
                { time: mstoseconds(30) }
            )
            checkcollector14.on('collect', reaction => {
                message.reactions.removeAll().then(async () => {
                    reaction.emoji.name === '🔑'
                    OrderNumber = Math.floor(Math.random()*999999999+1)
                    const OrderEmbed = new Discord.MessageEmbed()
                    .setAuthor(`${author.tag}`, author.displayAvatarURL())
                    .setColor(`#00FF00`)
                    .addField("Order Number",`${OrderNumber}`)
                    message.channel.send(OrderEmbed)
                    message.edit(page3)
                    var shoporders = client.channels.cache.get("715035099963457647")
                    const SkyblockOrder = new Discord.MessageEmbed()
                        .setAuthor(`${author.tag}`, author.displayAvatarURL())
                        .setTitle("✅ New Order!")
                        .setColor(`#00FF00`)
                        .addField("User", `<@${author.id}>`)
                        .addField("Purchased", "1 Buffalkor Key = 5 Robux")
                        .addField("Order Number",`${OrderNumber}`)
                        .setTimestamp(message.createdAt)
                    shoporders.send(`<@&722079939943465091>`, SkyblockOrder)
                })
            })
            const collector15 = message.createReactionCollector(
                (reaction, user) => ['🔨'].includes(reaction.emoji.name) && user.id === author.id,
                { time: mstominutes(1) }
            )
            const checkcollector15 = message.createReactionCollector(
                (reaction, user) => ['🔨'].includes(reaction.emoji.name) && user.id === author.id,
                { time: mstoseconds(30) }
            )
            checkcollector15.on('collect', reaction => {
                message.reactions.removeAll().then(async () => {
                    reaction.emoji.name === '🔨'
                    OrderNumber = Math.floor(Math.random()*999999999+1)
                    const OrderEmbed = new Discord.MessageEmbed()
                    .setAuthor(`${author.tag}`, author.displayAvatarURL())
                    .setColor(`#00FF00`)
                    .addField("Order Number",`${OrderNumber}`)
                    message.channel.send(OrderEmbed)
                    message.edit(page3)
                    var shoporders = client.channels.cache.get("715035099963457647")
                    const SkyblockOrder = new Discord.MessageEmbed()
                        .setAuthor(`${author.tag}`, author.displayAvatarURL())
                        .setTitle("✅ New Order!")
                        .setColor(`#00FF00`)
                        .addField("User", `<@${author.id}>`)
                        .addField("Purchased", "Glided Steel Hammer = 100 Robux")
                        .addField("Order Number",`${OrderNumber}`)
                        .setTimestamp(message.createdAt)
                    shoporders.send(`<@&722079939943465091>`, SkyblockOrder)
                })
            })
            const collector16 = message.createReactionCollector(
                (reaction, user) => ['✂️'].includes(reaction.emoji.name) && user.id === author.id,
                { time: mstominutes(1) }
            )
            const checkcollector16 = message.createReactionCollector(
                (reaction, user) => ['✂️'].includes(reaction.emoji.name) && user.id === author.id,
                { time: mstoseconds(30) }
            )
            checkcollector16.on('collect', reaction => {
                message.reactions.removeAll().then(async () => {
                    reaction.emoji.name === '✂️'
                    OrderNumber = Math.floor(Math.random()*999999999+1)
                    const OrderEmbed = new Discord.MessageEmbed()
                    .setAuthor(`${author.tag}`, author.displayAvatarURL())
                    .setColor(`#00FF00`)
                    .addField("Order Number",`${OrderNumber}`)
                    message.channel.send(OrderEmbed)
                    message.edit(page3)
                    var shoporders = client.channels.cache.get("715035099963457647")
                    const SkyblockOrder = new Discord.MessageEmbed()
                        .setAuthor(`${author.tag}`, author.displayAvatarURL())
                        .setTitle("✅ New Order!")
                        .setColor(`#00FF00`)
                        .addField("User", `<@${author.id}>`)
                        .addField("Purchased", "Stone Cutter = 25 robux each")
                        .addField("Order Number",`${OrderNumber}`)
                        .setTimestamp(message.createdAt)
                    shoporders.send(`<@&722079939943465091>`, SkyblockOrder)
                })
            })
            const collector17 = message.createReactionCollector(
                (reaction, user) => ['🎛️'].includes(reaction.emoji.name) && user.id === author.id,
                { time: mstominutes(1) }
            )
            const checkcollector17 = message.createReactionCollector(
                (reaction, user) => ['🎛️'].includes(reaction.emoji.name) && user.id === author.id,
                { time: mstoseconds(30) }
            )
            checkcollector17.on('collect', reaction => {
                message.reactions.removeAll().then(async () => {
                    reaction.emoji.name === '🎛️'
                    OrderNumber = Math.floor(Math.random()*999999999+1)
                    const OrderEmbed = new Discord.MessageEmbed()
                    .setAuthor(`${author.tag}`, author.displayAvatarURL())
                    .setColor(`#00FF00`)
                    .addField("Order Number",`${OrderNumber}`)
                    message.channel.send(OrderEmbed)
                    message.edit(page3)
                    var shoporders = client.channels.cache.get("715035099963457647")
                    const SkyblockOrder = new Discord.MessageEmbed()
                        .setAuthor(`${author.tag}`, author.displayAvatarURL())
                        .setTitle("✅ New Order!")
                        .setColor(`#00FF00`)
                        .addField("User", `<@${author.id}>`)
                        .addField("Purchased", "Smelter = 15 robux")
                        .addField("Order Number",`${OrderNumber}`)
                        .setTimestamp(message.createdAt)
                    shoporders.send(`<@&722079939943465091>`, SkyblockOrder)
                })
            })
            const collector999 = message.createReactionCollector(
                (reaction, user) => ['⛏️'].includes(reaction.emoji.name) && user.id === author.id,
                { time: mstominutes(1) }
            )
            const checkcollector999 = message.createReactionCollector(
                (reaction, user) => ['⛏️'].includes(reaction.emoji.name) && user.id === author.id,
                { time: mstoseconds(30) }
            )
            collector999.on('collect', reaction => {
                message.reactions.removeAll().then(async () => {
                    reaction.emoji.name === '⛏️'
                    OrderNumber = Math.floor(Math.random()*999999999+1)
                    const OrderEmbed = new Discord.MessageEmbed()
                    .setAuthor(`${author.tag}`, author.displayAvatarURL())
                    .setColor(`#00FF00`)
                    .addField("Order Number",`${OrderNumber}`)
                    message.channel.send(OrderEmbed)
                    message.edit(page3)
                    var shoporders = client.channels.cache.get("715035099963457647")
                    const SkyblockOrder = new Discord.MessageEmbed()
                        .setAuthor(`${author.tag}`, author.displayAvatarURL())
                        .setTitle("✅ New Order!")
                        .setColor(`#00FF00`)
                        .addField("User", `<@${author.id}>`)
                        .addField("Purchased", "1 Crystalized Iron for 35 Robux")
                        .addField("Order Number",`${OrderNumber}`)
                        .setTimestamp(message.createdAt)
                    shoporders.send(`<@&722079939943465091>`, SkyblockOrder)
                })
            })
            const collector1k = message.createReactionCollector(
                (reaction, user) => ['📦'].includes(reaction.emoji.name) && user.id === author.id,
                { time: mstominutes(1) }
            )
            const checkcollector1k = message.createReactionCollector(
                (reaction, user) => ['📦'].includes(reaction.emoji.name) && user.id === author.id,
                { time: mstoseconds(30) }
            )
            collector1k.on('collect', reaction => {
                message.reactions.removeAll().then(async () => {
                    reaction.emoji.name === '📦'
                    OrderNumber = Math.floor(Math.random()*999999999+1)
                    const OrderEmbed = new Discord.MessageEmbed()
                    .setAuthor(`${author.tag}`, author.displayAvatarURL())
                    .setColor(`#00FF00`)
                    .addField("Order Number",`${OrderNumber}`)
                    message.channel.send(OrderEmbed)
                    message.edit(page3)
                    var shoporders = client.channels.cache.get("715035099963457647")
                    const SkyblockOrder = new Discord.MessageEmbed()
                        .setAuthor(`${author.tag}`, author.displayAvatarURL())
                        .setTitle("✅ New Order!")
                        .setColor(`#00FF00`)
                        .addField("User", `<@${author.id}>`)
                        .addField("Purchased", " Vending Machine for 15 Robux")
                        .addField("Order Number",`${OrderNumber}`)
                        .setTimestamp(message.createdAt)
                    shoporders.send(`<@&722079939943465091>`, SkyblockOrder)
                })
            })
            const collector2k = message.createReactionCollector(
                (reaction, user) => ['💰'].includes(reaction.emoji.name) && user.id === author.id,
                { time: mstominutes(1) }
            )
            const checkcollector2k = message.createReactionCollector(
                (reaction, user) => ['💰'].includes(reaction.emoji.name) && user.id === author.id,
                { time: mstoseconds(30) }
            )
            collector2k.on('collect', reaction => {
                message.reactions.removeAll().then(async () => {
                    reaction.emoji.name === '💰'
                    OrderNumber = Math.floor(Math.random()*999999999+1)
                    const OrderEmbed = new Discord.MessageEmbed()
                    .setAuthor(`${author.tag}`, author.displayAvatarURL())
                    .setColor(`#00FF00`)
                    .addField("Order Number",`${OrderNumber}`)
                    message.channel.send(OrderEmbed)
                    message.edit(page3)
                    var shoporders = client.channels.cache.get("715035099963457647")
                    const SkyblockOrder = new Discord.MessageEmbed()
                        .setAuthor(`${author.tag}`, author.displayAvatarURL())
                        .setTitle("✅ New Order!")
                        .setColor(`#00FF00`)
                        .addField("User", `<@${author.id}>`)
                        .addField("Purchased", "900 Robux for $10 Nitro")
                        .addField("Order Number",`${OrderNumber}`)
                        .setTimestamp(message.createdAt)
                    shoporders.send(`<@&722079939943465091>`, SkyblockOrder)
                })
            })
            const collector3k = message.createReactionCollector(
                (reaction, user) => ['💸'].includes(reaction.emoji.name) && user.id === author.id,
                { time: mstominutes(1) }
            )
            const checkcollector3k = message.createReactionCollector(
                (reaction, user) => ['💸'].includes(reaction.emoji.name) && user.id === author.id,
                { time: mstoseconds(30) }
            )
            collector3k.on('collect', reaction => {
                message.reactions.removeAll().then(async () => {
                    reaction.emoji.name === '💸'
                    OrderNumber = Math.floor(Math.random()*999999999+1)
                    const OrderEmbed = new Discord.MessageEmbed()
                    .setAuthor(`${author.tag}`, author.displayAvatarURL())
                    .setColor(`#00FF00`)
                    .addField("Order Number",`${OrderNumber}`)
                    message.channel.send(OrderEmbed)
                    message.edit(page3)
                    var shoporders = client.channels.cache.get("715035099963457647")
                    const SkyblockOrder = new Discord.MessageEmbed()
                        .setAuthor(`${author.tag}`, author.displayAvatarURL())
                        .setTitle("✅ New Order!")
                        .setColor(`#00FF00`)
                        .addField("User", `<@${author.id}>`)
                        .addField("Purchased", "600 robux for $5 Amazon Gift Card")
                        .addField("Order Number",`${OrderNumber}`)
                        .setTimestamp(message.createdAt)
                    shoporders.send(`<@&722079939943465091>`, SkyblockOrder)
                })
            })
        });
    }
    if (message.content.startsWith(prefix + 'boney')) {

        const guilds = client.guilds.cache.array()
        const eleven = message.guild.emojis.cache.find(emoji => emoji.name === '11');
        const twelve = message.guild.emojis.cache.find(emoji => emoji.name === '12');
        const thirteen = message.guild.emojis.cache.find(emoji => emoji.name === '13');
        const generateEmbed = start => {
            const current = guilds.slice(start, start + 1)

            const embed = new Discord.MessageEmbed()
                .setAuthor(`${author.tag}`, author.displayAvatarURL())
                .setColor("RANDOM")
                .setTitle(`Boneys's SkyBlock Shop!`)
                .addField("Coins", "1️⃣ 10,000,000 = 5 Robux \n2️⃣ 20,000,000 = 10 robux \n 3️⃣ 50,000,000 = 45 robux\n 4️⃣ 100,000,000 = 85 robux\n 5️⃣ 100,000,000 = 85 robux\n6️⃣ 500,000,000 = 185 robux\n7️⃣ 1,000,000,000 = 400 Robux\n8️⃣ 5,000,000,000 = 1700 Robux\n9️⃣ 40,000,000,000 = 13000 Robux\n🔟 100,000,000,000 = 28000 Robux")
                .setFooter("Do not react until all reactions are added. Your purchase will not be counted")
                return embed
        }

        const author = message.author

        const page2 = new Discord.MessageEmbed()
            .setAuthor(`${author.tag}`, author.displayAvatarURL())
            .setColor("RANDOM")
            .setTitle(`Boney's SkyBlock Shop!`)
            .setDescription("If you")

        const page3 = new Discord.MessageEmbed()
            .setAuthor(`${author.tag}`, author.displayAvatarURL())
            .setColor(`#00FF00`)
            .setTitle(`Boney's SkyBlock Shop!`)
            .setDescription(`Order has been sent to <@704733558052225106>`)
            .setFooter("If you think this was a mistake please type .mistake")


        message.channel.send(generateEmbed(0)).then(message => {
            message.react('1️⃣')
            message.react('2️⃣')
            message.react('3️⃣')
            message.react('4️⃣')
            message.react('5️⃣')
            message.react('6️⃣')
            message.react('7️⃣')
            message.react('8️⃣')
            message.react('9️⃣')
            message.react('🔟')



            //Shop Item 2




            //shop item 3



            //shop item 4


            //shop item 5


            //shop item 



            //shop item 7
            const collector7 = message.createReactionCollector(
                (reaction, user) => ['1️⃣'].includes(reaction.emoji.name) && user.id === author.id,
                { time: mstominutes(1) }
            )
            const checkcollector7 = message.createReactionCollector(
                (reaction, user) => ['1️⃣'].includes(reaction.emoji.name) && user.id === author.id,
                { time: mstoseconds(30) }
            )
            checkcollector7.on('collect', reaction => {
                message.reactions.removeAll().then(async () => {
                    reaction.emoji.name === '1️⃣'
                    OrderNumber = Math.floor(Math.random()*999999999+1)
                    const OrderEmbed = new Discord.MessageEmbed()
                    .setAuthor(`${author.tag}`, author.displayAvatarURL())
                    .setColor(`#00FF00`)
                    .addField("Order Number",`${OrderNumber}`)
                    message.channel.send(OrderEmbed)
                    message.edit(page3)
                    var shoporders = client.channels.cache.get("715035099963457647")
                    const SkyblockOrder = new Discord.MessageEmbed()
                        .setAuthor(`${author.tag}`, author.displayAvatarURL())
                        .setTitle("✅ New Order!")
                        .setColor(`#00FF00`)
                        .addField("User", `<@${author.id}>`)
                        .addField("Purchased", "10,000,000 = 5 robux")
                        .addField("Order Number",`${OrderNumber}`)
                        .setTimestamp(message.createdAt)
                    shoporders.send(`<@704733558052225106>`, SkyblockOrder)
                })
            })



            //shop item 8
            const collector8 = message.createReactionCollector(
                (reaction, user) => ['2️⃣'].includes(reaction.emoji.name) && user.id === author.id,
                { time: mstominutes(1) }
            )
            const checkcollector8 = message.createReactionCollector(
                (reaction, user) => ['2️⃣'].includes(reaction.emoji.name) && user.id === author.id,
                { time: mstoseconds(30) }
            )
            checkcollector8.on('collect', reaction => {
                message.reactions.removeAll().then(async () => {
                    reaction.emoji.name === '2️⃣'
                    OrderNumber = Math.floor(Math.random()*999999999+1)
                    const OrderEmbed = new Discord.MessageEmbed()
                    .setAuthor(`${author.tag}`, author.displayAvatarURL())
                    .setColor(`#00FF00`)
                    .addField("Order Number",`${OrderNumber}`)
                    message.channel.send(OrderEmbed)
                    message.edit(page3)
                    var shoporders = client.channels.cache.get("715035099963457647")
                    const SkyblockOrder = new Discord.MessageEmbed()
                        .setAuthor(`${author.tag}`, author.displayAvatarURL())
                        .setTitle("✅ New Order!")
                        .setColor(`#00FF00`)
                        .addField("User", `<@${author.id}>`)
                        .addField("Purchased", "20,000,000 = 10 robux")
                        .addField("Order Number",`${OrderNumber}`)
                        .setTimestamp(message.createdAt)
                    shoporders.send(`<@704733558052225106>`, SkyblockOrder)
                })
            })

            const collector10 = message.createReactionCollector(
                (reaction, user) => ['3️⃣'].includes(reaction.emoji.name) && user.id === author.id,
                { time: mstominutes(1) }
            )
            const checkcollector10 = message.createReactionCollector(
                (reaction, user) => ['3️⃣'].includes(reaction.emoji.name) && user.id === author.id,
                { time: mstoseconds(30) }
            )
            checkcollector10.on('collect', reaction => {
                message.reactions.removeAll().then(async () => {
                    reaction.emoji.name === '3️⃣'
                    OrderNumber = Math.floor(Math.random()*999999999+1)
                    const OrderEmbed = new Discord.MessageEmbed()
                    .setAuthor(`${author.tag}`, author.displayAvatarURL())
                    .setColor(`#00FF00`)
                    .addField("Order Number",`${OrderNumber}`)
                    message.channel.send(OrderEmbed)
                    message.edit(page3)
                    var shoporders = client.channels.cache.get("715035099963457647")
                    const SkyblockOrder = new Discord.MessageEmbed()
                        .setAuthor(`${author.tag}`, author.displayAvatarURL())
                        .setTitle("✅ New Order!")
                        .setColor(`#00FF00`)
                        .addField("User", `<@${author.id}>`)
                        .addField("Purchased", "50,000,000 = 45 robux")
                        .addField("Order Number",`${OrderNumber}`)
                        .setTimestamp(message.createdAt)
                    shoporders.send(`<@704733558052225106>`, SkyblockOrder)
                })
            })





            //shop item 11
            const collector11 = message.createReactionCollector(
                (reaction, user) => ['4️⃣'].includes(reaction.emoji.name) && user.id === author.id,
                { time: mstominutes(1) }
            )
            const checkcollector11 = message.createReactionCollector(
                (reaction, user) => ['4️⃣'].includes(reaction.emoji.name) && user.id === author.id,
                { time: mstoseconds(30) }
            )
            checkcollector11.on('collect', reaction => {
                message.reactions.removeAll().then(async () => {
                    reaction.emoji.name === '4️⃣'
                    OrderNumber = Math.floor(Math.random()*999999999+1)
                    const OrderEmbed = new Discord.MessageEmbed()
                    .setAuthor(`${author.tag}`, author.displayAvatarURL())
                    .setColor(`#00FF00`)
                    .addField("Order Number",`${OrderNumber}`)
                    message.channel.send(OrderEmbed)
                    message.edit(page3)
                    var shoporders = client.channels.cache.get("715035099963457647")
                    const SkyblockOrder = new Discord.MessageEmbed()
                        .setAuthor(`${author.tag}`, author.displayAvatarURL())
                        .setTitle("✅ New Order!")
                        .setColor(`#00FF00`)
                        .addField("User", `<@${author.id}>`)
                        .addField("Purchased", "100,000,000 = 85 robux")
                        .addField("Order Number",`${OrderNumber}`)
                        .setTimestamp(message.createdAt)
                    shoporders.send(`<@704733558052225106>`, SkyblockOrder)
                })
            })




            //shop item 12
            const collector12 = message.createReactionCollector(
                (reaction, user) => ['5️⃣'].includes(reaction.emoji.name) && user.id === author.id,
                { time: mstominutes(1) }
            )
            const checkcollector12 = message.createReactionCollector(
                (reaction, user) => ['5️⃣'].includes(reaction.emoji.name) && user.id === author.id,
                { time: mstoseconds(30) }
            )
            checkcollector12.on('collect', reaction => {
                message.reactions.removeAll().then(async () => {
                    reaction.emoji.name === '5️⃣'
                    OrderNumber = Math.floor(Math.random()*999999999+1)
                    const OrderEmbed = new Discord.MessageEmbed()
                    .setAuthor(`${author.tag}`, author.displayAvatarURL())
                    .setColor(`#00FF00`)
                    .addField("Order Number",`${OrderNumber}`)
                    message.channel.send(OrderEmbed)
                    message.edit(page3)
                    var shoporders = client.channels.cache.get("715035099963457647")
                    const SkyblockOrder = new Discord.MessageEmbed()
                        .setAuthor(`${author.tag}`, author.displayAvatarURL())
                        .setTitle("✅ New Order!")
                        .setColor(`#00FF00`)
                        .addField("User", `<@${author.id}>`)
                        .addField("Purchased", "500,000,000 = 185 robux")
                        .addField("Order Number",`${OrderNumber}`)
                        .setTimestamp(message.createdAt)
                    shoporders.send(`<@704733558052225106>`, SkyblockOrder)
                })
            })
            
            //shop item 12
            const collector13 = message.createReactionCollector(
                (reaction, user) => ['6️⃣'].includes(reaction.emoji.name) && user.id === author.id,
                { time: mstominutes(1) }
            )
            collector13.on('collect', reaction => {
                message.reactions.removeAll().then(async () => {
                    reaction.emoji.name === '6️⃣'
                    OrderNumber = Math.floor(Math.random()*999999999+1)
                    const OrderEmbed = new Discord.MessageEmbed()
                    .setAuthor(`${author.tag}`, author.displayAvatarURL())
                    .setColor(`#00FF00`)
                    .addField("Order Number",`${OrderNumber}`)
                    message.channel.send(OrderEmbed)
                    message.edit(page3)
                    var shoporders = client.channels.cache.get("715035099963457647")
                    const SkyblockOrder = new Discord.MessageEmbed()
                        .setAuthor(`${author.tag}`, author.displayAvatarURL())
                        .setTitle("✅ New Order!")
                        .setColor(`#00FF00`)
                        .addField("User", `<@${author.id}>`)
                        .addField("Purchased", "1,000,000,000 = 400 Robux")
                        .addField("Order Number",`${OrderNumber}`)
                        .setTimestamp(message.createdAt)
                    shoporders.send(`<@704733558052225106>`, SkyblockOrder)
                })
            })
            
            //shop item 12
            const collector14 = message.createReactionCollector(
                (reaction, user) => ['7️⃣'].includes(reaction.emoji.name) && user.id === author.id,
                { time: mstominutes(1) }
            )
            collector14.on('collect', reaction => {
                message.reactions.removeAll().then(async () => {
                    reaction.emoji.name === '7️⃣'
                    OrderNumber = Math.floor(Math.random()*999999999+1)
                    const OrderEmbed = new Discord.MessageEmbed()
                    .setAuthor(`${author.tag}`, author.displayAvatarURL())
                    .setColor(`#00FF00`)
                    .addField("Order Number",`${OrderNumber}`)
                    message.channel.send(OrderEmbed)
                    message.edit(page3)
                    var shoporders = client.channels.cache.get("715035099963457647")
                    const SkyblockOrder = new Discord.MessageEmbed()
                        .setAuthor(`${author.tag}`, author.displayAvatarURL())
                        .setTitle("✅ New Order!")
                        .setColor(`#00FF00`)
                        .addField("User", `<@${author.id}>`)
                        .addField("Purchased", "5,000,000,000 = 1700 Robux")
                        .addField("Order Number",`${OrderNumber}`)
                        .setTimestamp(message.createdAt)
                    shoporders.send(`<@704733558052225106>`, SkyblockOrder)
                })
            })
            
            //shop item 12
            const collector15 = message.createReactionCollector(
                (reaction, user) => ['8️⃣'].includes(reaction.emoji.name) && user.id === author.id,
                { time: mstominutes(1) }
            )
            collector15.on('collect', reaction => {
                message.reactions.removeAll().then(async () => {
                    reaction.emoji.name === '8️⃣'
                    OrderNumber = Math.floor(Math.random()*999999999+1)
                    const OrderEmbed = new Discord.MessageEmbed()
                    .setAuthor(`${author.tag}`, author.displayAvatarURL())
                    .setColor(`#00FF00`)
                    .addField("Order Number",`${OrderNumber}`)
                    message.channel.send(OrderEmbed)
                    message.edit(page3)
                    var shoporders = client.channels.cache.get("715035099963457647")
                    const SkyblockOrder = new Discord.MessageEmbed()
                        .setAuthor(`${author.tag}`, author.displayAvatarURL())
                        .setTitle("✅ New Order!")
                        .setColor(`#00FF00`)
                        .addField("User", `<@${author.id}>`)
                        .addField("Purchased", "5,000,000,000 = 1700 Robux")
                        .addField("Order Number",`${OrderNumber}`)
                        .setTimestamp(message.createdAt)
                    shoporders.send(`<@704733558052225106>`, SkyblockOrder)
                })
            })
            const collector17 = message.createReactionCollector(
                (reaction, user) => ['9️⃣'].includes(reaction.emoji.name) && user.id === author.id,
                { time: mstominutes(1) }
            )
            collector17.on('collect', reaction => {
                message.reactions.removeAll().then(async () => {
                    reaction.emoji.name === '9️⃣'
                    OrderNumber = Math.floor(Math.random()*999999999+1)
                    const OrderEmbed = new Discord.MessageEmbed()
                    .setAuthor(`${author.tag}`, author.displayAvatarURL())
                    .setColor(`#00FF00`)
                    .addField("Order Number",`${OrderNumber}`)
                    message.channel.send(OrderEmbed)
                    message.edit(page3)
                    var shoporders = client.channels.cache.get("715035099963457647")
                    const SkyblockOrder = new Discord.MessageEmbed()
                        .setAuthor(`${author.tag}`, author.displayAvatarURL())
                        .setTitle("✅ New Order!")
                        .setColor(`#00FF00`)
                        .addField("User", `<@${author.id}>`)
                        .addField("Purchased", "40,000,000,000 = 13000 Robux")
                        .addField("Order Number",`${OrderNumber}`)
                        .setTimestamp(message.createdAt)
                    shoporders.send(`<@704733558052225106>`, SkyblockOrder)
                })
            })
            const collector19 = message.createReactionCollector(
                (reaction, user) => ['🔟'].includes(reaction.emoji.name) && user.id === author.id,
                { time: mstominutes(1) }
            )
            collector19.on('collect', reaction => {
                message.reactions.removeAll().then(async () => {
                    reaction.emoji.name === '🔟'
                    OrderNumber = Math.floor(Math.random()*999999999+1)
                    const OrderEmbed = new Discord.MessageEmbed()
                    .setAuthor(`${author.tag}`, author.displayAvatarURL())
                    .setColor(`#00FF00`)
                    .addField("Order Number",`${OrderNumber}`)
                    message.channel.send(OrderEmbed)
                    message.edit(page3)
                    var shoporders = client.channels.cache.get("715035099963457647")
                    const SkyblockOrder = new Discord.MessageEmbed()
                        .setAuthor(`${author.tag}`, author.displayAvatarURL())
                        .setTitle("✅ New Order!")
                        .setColor(`#00FF00`)
                        .addField("User", `<@${author.id}>`)
                        .addField("Purchased", "100,000,000,000 = 28000 Robux")
                        .addField("Order Number",`${OrderNumber}`)
                        .setTimestamp(message.createdAt)
                    shoporders.send(`<@704733558052225106>`, SkyblockOrder)
                })
            })
        });
    }
});

client.login(token)