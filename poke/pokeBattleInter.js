const {Client, MessageEmbed} = require('discord.js');


//console.log(sqlite3)

const client = new Client();

client.on('ready', () => {
    console.log(`BattleON`);
    myHp();
    enemyHp();
});
//sqlite3.connect('hello.db')

//변수
const pokemonName = ['피곧휴', '이브이']
const gender = ['♂','♀']

let HP1 = 37;
let HyHP1 = HP1;

let HP2 = 56;
let HyHP2 = HP2;

let Lv1 = 16
let Lv2 = 22

const HPmat = "🟩"
const HpWarn = "🟨"
const HpDang = "🟧"
const HpFuck = "🟥"
const HpEmpt = "⬜"

let MaxGage = 19;

let HPGage1 = MaxGage;
let HPGage2 = MaxGage;



let HPbar1 = []
let HPbar2 = []

let DamagePower = 14;

let gameMassage = "앗! 이런 씻벌, 야생의 "+pokemonName[0]+"(이)가 튀어나와 버렸다!\n"+"옘병! 가랏 "+pokemonName[1]

//변수 끝



function damageEnemy(){

    HyHP1 -= DamagePower;
    
    if(DamagePower > HP1 / MaxGage){
        HPGage1 -= DamagePower/(Math.ceil(HP1/MaxGage))
    }

    console.log(HyHP1)
    //----------------------
    enemyHp()
    gameMassage = pokemonName[1]+"의 공격\n"+pokemonName[0]+"은(는) " + DamagePower +"의 피해를 입었다!"
}

function damageMe(){
    HyHP2 -= DamagePower;
    
    if(DamagePower > HP2 / MaxGage){
        HPGage2 -= DamagePower/(Math.ceil(HP2/MaxGage))
    }

    console.log(HyHP2)

    //----------------------
    myHp()
    gameMassage = pokemonName[0]+"의 공격\n"+pokemonName[1]+"은(는) " + DamagePower +"의 피해를 입었다!"
}




function enemyHp(){
    HPbar1=[]
    empCount=0;
    for (let index = 0; index < Math.floor(HPGage1); index++) {



        
            if(HPGage1 > 12){
                HPbar1.push(HPmat)
            }else if(HPGage1 > 6){
                HPbar1.push(HpWarn)
            }else if(HPGage1 > 1 && HPGage1 <= 2){
                HPbar1.push(HpFuck)
            }else{
                HPbar1.push(HpDang)
            }
    



        empCount++;
    }
    for (let index = 0; index < MaxGage-empCount; index++) {
        HPbar1.push(HpEmpt)
        
    }
}


function myHp(){
    HPbar2=[]
    empCount=0;
    for (let index = 0; index < Math.floor(HPGage2); index++) {

            HPbar2.push(HPmat)
    
        empCount++;
    }
    for (let index = 0; index < MaxGage-empCount; index++) {
        HPbar2.push(HpEmpt)
        
    }

}







client.on('message', msg => {

    if(msg.content === '!battle'){

//임베드 메시지 생성 
const embed0 = new MessageEmbed()
.setColor(0xf90101)
.addFields([

    
    { name:
        pokemonName[0], 
        value: "ㅤ", 
        inline:true },

    {name: gender[0] +" Lv."+ Lv1+ " \n", value:"ㅤ",  inline:true },

    {name: "HP "+ HPbar1.join('') , value: "ㅤ"}

])


const embed1 = new MessageEmbed()
//.setColor(0xf90101)
.setThumbnail('https://static.wikia.nocookie.net/pokemon/images/9/93/%EB%8F%84%ED%8A%B8_5%EB%B8%94%ED%99%942_025.gif/revision/latest?cb=20120902080422&path-prefix=ko')
.setImage('https://static.wikia.nocookie.net/pokemon/images/6/63/%EB%8F%84%ED%8A%B8_%EB%92%B7_5%EC%84%B8%EB%8C%80_133.gif/revision/latest?cb=20141004040155&path-prefix=ko')
.addFields([
{ name: 'ㅤㅤㅤㅤ', value: 'ㅤㅤㅤㅤㅤㅤㅤㅤ' },
])


const embed2 = new MessageEmbed()
.setColor(0x00a000)
.addFields([
      
    { name:
        pokemonName[1], 
        value: "ㅤ", 
        inline:true },

    {name: gender[1] +" Lv."+ Lv2+ " \n", value:"ㅤ",  inline:true },

    {name: "HP "+ HPbar2.join('') , value: HP2 + "/" + HyHP2
}

])
//임베디드 생성 끝자락
        
        msg.channel.bulkDelete(20).then(
            msg.channel.send(embed0),
            msg.channel.send(embed1),
            msg.channel.send(embed2),
            msg.channel.send(gameMassage)
        )


    }

    if(msg.content === '!damageMe'){
        damageMe()
        msg.channel.send('!battle')
    }

    if(msg.content === '!damageEnemy'){
        damageEnemy()
        msg.channel.send('!battle')
    }
    
    if(msg.content.startsWith('!setDamage')){
        DamagePower = (msg.content.slice(10))
        msg.channel.send('Damage Set : '+DamagePower)
    }


    if(msg.content === '!HpCh'){
        msg.channel.send('Enemy : '+HyHP1+'/ My : ' + HyHP2)
    }
    

})

client.login('MTAwMTA4NTY3Mjg1MTAwMTM2NA.GKvUtM.n8MURVBau98_JLH1KODtoYbbThLm1czVL_lMQY');