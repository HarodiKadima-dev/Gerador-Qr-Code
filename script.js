const textoQr = document.getElementById('textoQr');
const areaQr = document.getElementById('areaQr');

const btn = document.getElementById('gerarQr');

btn.addEventListener('click', gerarQrCode);

//gerando o qrCode com Enter
textoQr.addEventListener('keydown', (e) =>{
    if(e.key==='Enter'){
      gerarQrCode();  
    }
});

async function gerarQrCode(){
  
    //limpar campos vazios
  const texto = textoQr.value.trim();
  
  if(!texto){
    
    areaQr.innerHTML="<p style='color:#e53e3e'>Digite algo válido</p>";
    return
  }
  
  areaQr.innerHTML="<p> Gerando...</p>";
  btn.disabled=true;
  
  try{
    
    const apiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(texto)}`;
    const res = await fetch(apiUrl);
    
    if(!res.ok) throw new Error('Erro ao gerir');
    
    areaQr.innerHTML =`
    <img src="${apiUrl}" alt="Qr code gerado">
    <br>
    <button id="baixarBtn">Download PNG</button>
    `;
  
  // evento ao clicar no botão de baixar
  document.getElementById('baixarBtn').addEventListener('click', ()=> {
    baixarQr(apiUrl,texto);
  });
  
  } catch(erro){
    areaQr.innerHTML = "<p style='color:#e53e3e'>Ups! Não foi possível gerar.</p>";
  }finally{
    btn.disabled = false;
  }
}

function baixarQr(url, texto){
  const link = document.createElement('a');
  link.href = url;
  link.download = `qrcode-${texto.slice(0,20)}.png`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}