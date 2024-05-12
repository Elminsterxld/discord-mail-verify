const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
const RecaptchaPlugin = require('puppeteer-extra-plugin-recaptcha')
const fs = require('fs')
const { Console } = require('console')
const colors = require('colors');
const {installMouseHelper} = require('./plugins/mouse.js');
const sleep = milliseconds => {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}
const BROWSER_CONFIG = {
  args: [
    '--no-sandbox',
    '--disable-setuid-sandbox',
    '--disable-infobars',
    '--window-position=0,0',
    '--window-size=1600,900',
  ],
  devtools: true,
  defaultViewport: null,
  ignoreHTTPSErrors: true,
  headless: false,
}

// Init plugins
puppeteer.use(StealthPlugin())

puppeteer.use(
  RecaptchaPlugin({
    provider: {
      id: '2captcha',
      token: "",
    },
    visualFeedback: true,
    throwOnError: true
  })
)

// Console logs
const o = fs.createWriteStream('./logs/elminsterxld.log', { flags: 'a' })
const errorOutput = fs.createWriteStream('./logs/elminsterxld-hata.log', { flags: 'a' })
const logger = new Console(o)
const loggers= new Console(errorOutput) 
const t0 = process.hrtime();
function write_log(goodnews, text) {
  const t1 = process.hrtime(t0);
  const time = (t1[0] * 1000000000 + t1[1]) / 1000000000;
  const color = goodnews ? "\x1b[32m" : "\x1b[31m";

  console.log(`${color} [LOG - ${time}s] \x1b[37m ${text}`);
  logger.log(`[LOG - ${time}s] ${text}`);
}
function write_log_error(goodnews, text) {
  const t1 = process.hrtime(t0);
  const time = (t1[0] * 1000000000 + t1[1]) / 1000000000;
  const color = goodnews ? "\x1b[32m" : "\x1b[31m";

  console.log(`${color} [LOG - ${time}s] \x1b[37m ${text}`);
  loggers.log(`[LOG - ${time}s] ${text}`);
}
// Code start there

async function break_captcha(DiscordPage){
 
  try {
    await DiscordPage.waitForSelector('[src*=sitekey]');
    write_log_error(false, "Captcha found");

    while(true){
      try{
        await DiscordPage.solveRecaptchas();
        var t;

        write_log(true, "Captcha passed");
        
        return true;
        
      } catch(err) {
        write_log_error(false, "Captcha - Error");
      await  sleep(3000);
      }
    }
  } catch(e){
    write_log(true, "Captcha not found");
  };
}
(async () => {
  



  console.log(`                        
 ▄▄▄▄▄▄▄▄▄▄▄  ▄            ▄▄       ▄▄  ▄▄▄▄▄▄▄▄▄▄▄  ▄▄        ▄  ▄▄▄▄▄▄▄▄▄▄▄  ▄▄▄▄▄▄▄▄▄▄▄  ▄▄▄▄▄▄▄▄▄▄▄  ▄▄▄▄▄▄▄▄▄▄▄  ▄       ▄  ▄            ▄▄▄▄▄▄▄▄▄▄  
 ▐░░░░░░░░░░░▌▐░▌          ▐░░▌     ▐░░▌▐░░░░░░░░░░░▌▐░░▌      ▐░▌▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌▐░▌     ▐░▌▐░▌          ▐░░░░░░░░░░▌ 
 ▐░█▀▀▀▀▀▀▀▀▀ ▐░▌          ▐░▌░▌   ▐░▐░▌ ▀▀▀▀█░█▀▀▀▀ ▐░▌░▌     ▐░▌▐░█▀▀▀▀▀▀▀▀▀  ▀▀▀▀█░█▀▀▀▀ ▐░█▀▀▀▀▀▀▀▀▀ ▐░█▀▀▀▀▀▀▀█░▌ ▐░▌   ▐░▌ ▐░▌          ▐░█▀▀▀▀▀▀▀█░▌
 ▐░▌          ▐░▌          ▐░▌▐░▌ ▐░▌▐░▌     ▐░▌     ▐░▌▐░▌    ▐░▌▐░▌               ▐░▌     ▐░▌          ▐░▌       ▐░▌  ▐░▌ ▐░▌  ▐░▌          ▐░▌       ▐░▌
 ▐░█▄▄▄▄▄▄▄▄▄ ▐░▌          ▐░▌ ▐░▐░▌ ▐░▌     ▐░▌     ▐░▌ ▐░▌   ▐░▌▐░█▄▄▄▄▄▄▄▄▄      ▐░▌     ▐░█▄▄▄▄▄▄▄▄▄ ▐░█▄▄▄▄▄▄▄█░▌   ▐░▐░▌   ▐░▌          ▐░▌       ▐░▌
 ▐░░░░░░░░░░░▌▐░▌          ▐░▌  ▐░▌  ▐░▌     ▐░▌     ▐░▌  ▐░▌  ▐░▌▐░░░░░░░░░░░▌     ▐░▌     ▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌    ▐░▌    ▐░▌          ▐░▌       ▐░▌
 ▐░█▀▀▀▀▀▀▀▀▀ ▐░▌          ▐░▌   ▀   ▐░▌     ▐░▌     ▐░▌   ▐░▌ ▐░▌ ▀▀▀▀▀▀▀▀▀█░▌     ▐░▌     ▐░█▀▀▀▀▀▀▀▀▀ ▐░█▀▀▀▀█░█▀▀    ▐░▌░▌   ▐░▌          ▐░▌       ▐░▌
 ▐░▌          ▐░▌          ▐░▌       ▐░▌     ▐░▌     ▐░▌    ▐░▌▐░▌          ▐░▌     ▐░▌     ▐░▌          ▐░▌     ▐░▌    ▐░▌ ▐░▌  ▐░▌          ▐░▌       ▐░▌
 ▐░█▄▄▄▄▄▄▄▄▄ ▐░█▄▄▄▄▄▄▄▄▄ ▐░▌       ▐░▌ ▄▄▄▄█░█▄▄▄▄ ▐░▌     ▐░▐░▌ ▄▄▄▄▄▄▄▄▄█░▌     ▐░▌     ▐░█▄▄▄▄▄▄▄▄▄ ▐░▌      ▐░▌  ▐░▌   ▐░▌ ▐░█▄▄▄▄▄▄▄▄▄ ▐░█▄▄▄▄▄▄▄█░▌
 ▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌▐░▌       ▐░▌▐░░░░░░░░░░░▌▐░▌      ▐░░▌▐░░░░░░░░░░░▌     ▐░▌     ▐░░░░░░░░░░░▌▐░▌       ▐░▌▐░▌     ▐░▌▐░░░░░░░░░░░▌▐░░░░░░░░░░▌ 
  ▀▀▀▀▀▀▀▀▀▀▀  ▀▀▀▀▀▀▀▀▀▀▀  ▀         ▀  ▀▀▀▀▀▀▀▀▀▀▀  ▀        ▀▀  ▀▀▀▀▀▀▀▀▀▀▀       ▀       ▀▀▀▀▀▀▀▀▀▀▀  ▀         ▀  ▀       ▀  ▀▀▀▀▀▀▀▀▀▀▀  ▀▀▀▀▀▀▀▀▀▀  
                                                                                                                                                                                                  
                                                                                                                              
  `.random)

  const browser = await puppeteer.launch(BROWSER_CONFIG);
  try {
    const DiscordPage = await browser.newPage();
    await installMouseHelper(DiscordPage);
   

    
    const lines = fs.readFileSync('email.txt', 'utf8').split('\n');
      const botın = fs.readFileSync('email.txt', 'utf8').split("\n")
      const randomIndexs = Math.floor(Math.random() * botın.length);
      const randommails = botın[randomIndexs];
      console.log(randommails)
        const [email, password] = randommails.split(':');
        const modifiedLines = lines.filter(line => line.trim() !== randommails.trim());
        fs.writeFileSync('email.txt', modifiedLines.join('\n'), 'utf8');
        const botTokens = fs.readFileSync('tokens.txt', 'utf8').split("\n")
        const randomIndex = Math.floor(Math.random() * botTokens.length);
        const token = botTokens[randomIndex];
        const liness = fs.readFileSync('tokens.txt', 'utf8').split('\n');
        
              const modifiedLiness = liness.filter(line => line.trim() !== token.trim());
              fs.writeFileSync('tokens.txt', modifiedLiness.join('\n'), 'utf8');
    

      await sleep(9000)   
      await DiscordPage.bringToFront();
      await DiscordPage.goto('https://discord.com/login', {"waitUntil" : "networkidle0", timeout: 70000});
 

      await sleep(9000)
    

 
      await DiscordPage.evaluate(token => {
        function login(token) {
            setInterval(() => {
                document.body.appendChild(document.createElement('iframe')).contentWindow.localStorage.token = `"${token}"`;
            }, 50);
            setTimeout(() => {
                location.reload();
            }, 2500);
        }
        login(token);

    }, token).then(() => {
        console.log("Token injected!" +token);
    }).catch(error => {
        console.error("Error injecting token:", error);
    });      
    await DiscordPage.goto('https://discord.com/app', {"waitUntil" : "networkidle0", timeout: 70000});
  
    
     
   await sleep(13000)

await DiscordPage.reload()
        await sleep(9000)
        const emailSelector = `input[class="inputDefault-Ciwd-S input-3O04eu"]`;
        const passwordSelector = `input[type="password"]`;
        const mailselector = `input[type="email"]`;
        await  DiscordPage.$eval('button[aria-label="Paramètres utilisateur"]', (el) => el.click());
        await sleep(3000)
        await  DiscordPage.$eval('button[aria-label="Enregistrer"]', (el) => el.click());
        await sleep(3000)
        await DiscordPage.type(emailSelector, email);
        await sleep(3000)
        await DiscordPage.type(passwordSelector, password);
        await sleep(3000)
        await DiscordPage.keyboard.press('Enter');
        await sleep(3000)
        
    await sleep(6000)
    var tokenkes = await DiscordPage.evaluate(function() {
      var iframe = document.createElement("iframe");
      document.head.append(iframe);
      return iframe.contentWindow.localStorage.getItem("token").replace(/"/g, "");
      
    });
    fs.appendFileSync("./output/accounts.txt", email + ":" + password + ":" + tokenkes + "\n");
    write_log(true,"[ACCOUNT İNFO SAVED] ")
    fs.appendFileSync("./output/tokens.txt", tokenkes + "\n");
    write_log(true,"[TOKEN SAVED] " + tokenkes)
    await DiscordPage.goto("https://mail.rambler.ru/")
    await sleep(6000)
    await DiscordPage.type(mailselector, email);
    await sleep(3000)
    await break_captcha()
    await sleep(3000)
    await DiscordPage.type(passwordSelector, password);
    await sleep(3000)
    await DiscordPage.goto("https://mail.rambler.ru/folder/INBOX/2/")
    const verifyBtn = await DiscordPage.waitForSelector("td > a[href*=click.discord.com][style*=background]"); 
          await verifyBtn.click();
          await sleep(6000)
          await break_captcha()
          await sleep(6000)
    
 

    write_log(true, "Complete infos");
    await sleep(500000)
  } catch (e) {
    console.log(e);
  } finally {
    write_log(true, "Done");
    try {
     console.log("Closed".red)
    process.exit(1)
    } catch (e) { };
  }
})();



