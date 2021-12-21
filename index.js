const RobotsContent = {
  Google: (permission) => `
    User-agent: Googlebot
    ${permission}: /
    User-agent: Googlebot-News
    ${permission}: /
    User-agent: Googlebot-Image/1.0
    ${permission}: /
    User-agent: Googlebot-Video/1.0
    ${permission}: /
    User-agent: SAMSUNG-SGH-E250/1.0 Profile/MIDP-2.0 Configuration/CLDC-1.1 UP.Browser/6.2.3.3.c.1.101 (GUI) MMP/2.0 (compatible; Googlebot-Mobile/2.1;+http://www.google.com/bot.html)
    ${permission}: /
    User-agent: Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X Build/MMB29P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.96 Mobile Safari/537.36 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)
    ${permission}: /
    User-agent: (compatible; Mediapartners-Google/2.1; +http://www.google.com/bot.html)
    ${permission}: /
    User-agent: Mediapartners-Google${permission}: /
    ${permission}: /
    User-agent: AdsBot-Google (+http://www.google.com/adsbot.html)
    ${permission}: /
    User-agent: AdsBot-Google-Mobile-Apps
    ${permission}: /
  `,
  Baidu: (permission) => `
    User-agent: Baiduspider
    ${permission}: / 
    User-agent: Baiduspider-video
    ${permission}: / 
    User-agent: Baiduspider-image
    ${permission}: / 
    User-agent: Baiduspider+
    ${permission}: /
  `,
  Bing: (permission) => `
    User-agent: Bingbot
    ${permission}: /
  `,
  Yandex: (permission) => `
    User-agent: YandexImages
    ${permission}: /
    User-agent: Yandex
    ${permission}: /
  `,
  AddThis: (permission) => `
    User-agent: AddThis
    ${permission}: /
    User-agent: AddThis.com robot tech.support@clearspring.com
    ${permission}: /
  `,
  AhrefsBot: (permission) => `
    User-agent: AhrefsBot
    ${permission}: /
  `,
  BDCbot: (permission) => `
    User-agent: BDCbot
    ${permission}: /
  `,
  DirBuster: (permission) => `
    User-agent: DirBuster-0.12
    ${permission}: /
  `,
  EveryoneSocial: (permission) => `
    User-agent: EveryoneSocialBot
    ${permission}: /
  `,
  Exabot: (permission) => `
    User-agent: Exabot
    ${permission}: /
  `,
  LinkpadBot: (permission) => `
    User-agent: LinkpadBot
    ${permission}: /
  `,
  Slurp: (permission) => `
    User-agent: Slurp
    ${permission}: /
  `,
  Spbot: (permission) => `
    User-agent: spbot
    ${permission}: /
  `,
  TwengaBot: (permission) => `
    User-agent: TwengaBot
    ${permission}: /
    User-agent: TwengaBot-2.0
    ${permission}: /
  `,
  MJ12bot: (permission) => `
    User-agent: MJ12bot
    ${permission}: /
  `,
};

const createLiElement = () => document.createElement('li')
const createButtonElement = () => document.createElement('button')

const caminhos = []

function adicionarCaminho(){
  const path = document.querySelector('.path').value;
  if(path[0] !== '/') return 
  caminhos.push(path)

  renderizarCaminhos()
}

function removerCaminho(index){
  caminhos.splice(Number(index), 1);

  renderizarCaminhos()
}

function renderizarCaminhos() {
  const listaDeCaminhos = document.querySelector('.paths-ul');
  listaDeCaminhos.innerHTML = ''
  caminhos.forEach((caminho, index) => {
    const li = createLiElement();
    const button = createButtonElement();

    li.innerHTML = caminho;
    button.innerHTML = 'X';
    button.onclick = () => {removerCaminho(index)}

    li.appendChild(button)
    listaDeCaminhos.appendChild(li)
  })
}


function gerarRobots(){
  const permitidosElementos = document.querySelectorAll('.permitidos .checkbox input'); 
  const bloqueadosElementos = document.querySelectorAll('.bloqueados .checkbox input'); 
  const sitemap = document.querySelector('.sitemap').value;
  const pathsBloqueadosInput = caminhos

  const permitidos = gerarListaDeElementos(permitidosElementos)
  const bloqueados = gerarListaDeElementos(bloqueadosElementos)

  let auxiliar = sitemap ? `Sitemap: ${sitemap}\n` : '';

  pathsBloqueadosInput.forEach(path => {
    auxiliar += `Disallow: ${path}`
  })

  permitidos.forEach(mecanismo => {
    auxiliar += RobotsContent[mecanismo]('Allow').replaceAll(' ', '')
  });

  bloqueados.forEach(mecanismo => {
    auxiliar += RobotsContent[mecanismo]('Disallow').replaceAll(' ', '')
  });

  const robots = auxiliar.replaceAll(' ', '').replaceAll('\n\n', '\n')
  
  renderizarRobots(robots)
}

function renderizarRobots(robots){
  const textarea = document.querySelector('#result');
  textarea.value = robots
}

function gerarListaDeElementos (elementos) {
  const lista = []
  elementos.forEach(elemento => {
    if(elemento.checked) lista.push(elemento.name)
  })

  return lista
}
