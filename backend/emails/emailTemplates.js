export function createWelcomeEmailTemplate(name, profileUrl) {
  return `
  <!DOCTYPE html>
  <html lang="pt-BR">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Seja bem-vindo ao Talent Bridge</title>
  </head>
  <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="background: linear-gradient(to right, #0077B5, #00A0DC); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
      <img src="https://img.freepik.com/vetores-premium/letra-a-ponte-logotipo-para-viagem-de-transporte-e-modelo-de-vetor-de-negocios-de-construcao_754537-5789.jpg" alt="Logo Talent Bridge" style="width: 150px; margin-bottom: 20px; border-radius: 10px;">
      <h1 style="color: white; margin: 0; font-size: 28px;">Bem-vindo ao Talent Bridge!</h1>
    </div>
    <div style="background-color: #ffffff; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
      <p style="font-size: 18px; color: #0077B5;"><strong>Olá ${name},</strong></p>
      <p>Estamos muito felizes por tê-lo na nossa comunidade profissional! O Talent Bridge é sua plataforma para conectar, aprender e crescer na sua carreira.</p>
      <div style="background-color: #f3f6f8; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <p style="font-size: 16px; margin: 0;"><strong>Veja como começar:</strong></p>
        <ul style="padding-left: 20px;">
          <li>Complete seu perfil</li>
          <li>Conecte-se com colegas e amigos</li>
          <li>Participe de grupos relacionados aos seus interesses</li>
          <li>Explore oportunidades de trabalho</li>
        </ul>
      </div>
      <div style="text-align: center; margin: 30px 0;">
        <a href="${profileUrl}" style="background-color: #0077B5; color: white; padding: 14px 28px; text-decoration: none; border-radius: 30px; font-weight: bold; font-size: 16px; transition: background-color 0.3s;">Complete seu perfil</a>
      </div>
      <p>Se você tiver dúvidas ou precisar de ajuda, nossa equipe de suporte está sempre disponível.</p>
      <p>Atenciosamente,<br>Equipe Talent Bridge</p>
    </div>
  </body>
  </html>
  `;
}

export const createConnectionAcceptedEmailTemplate = (senderName, recipientName, profileUrl) => `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Solicitação de Conexão Aceita</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #0077B5, #00A0DC); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
    <img src="https://img.freepik.com/vetores-premium/letra-a-ponte-logotipo-para-viagem-de-transporte-e-modelo-de-vetor-de-negocios-de-construcao_754537-5789.jpg" alt="Logo Talent Bridge" style="width: 150px; margin-bottom: 20px; border-radius: 10px;"/>
    <h1 style="color: white; margin: 0; font-size: 28px;">Conexão Aceita!</h1>
  </div>
  <div style="background-color: #ffffff; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
    <p style="font-size: 18px; color: #0077B5;"><strong>Olá ${senderName},</strong></p>
    <p>Ótima notícia! <strong>${recipientName}</strong> aceitou sua solicitação de conexão no Talent Bridge.</p>
    <div style="background-color: #f3f6f8; padding: 20px; border-radius: 8px; margin: 20px 0;">
      <p style="font-size: 16px; margin: 0;"><strong>O que fazer agora?</strong></p>
      <ul style="padding-left: 20px;">
        <li>Veja o perfil completo de ${recipientName}</li>
        <li>Envie uma mensagem para começar uma conversa</li>
        <li>Explore conexões e interesses em comum</li>
      </ul>
    </div>
    <div style="text-align: center; margin: 30px 0;">
      <a href="${profileUrl}" style="background-color: #0077B5; color: white; padding: 14px 28px; text-decoration: none; border-radius: 30px; font-weight: bold; font-size: 16px; transition: background-color 0.3s;">Ver perfil de ${recipientName}</a>
    </div>
    <p>Expandir sua rede profissional abre novas oportunidades. Continue se conectando!</p>
    <p>Atenciosamente,<br>Equipe Talent Bridge</p>
  </div>
</body>
</html>
`;

export const createCommentNotificationEmailTemplate = (recipientName, commenterName, postUrl, commentContent) => `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Novo Comentário em Sua Publicação</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #0077B5, #00A0DC); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
    <img src="https://img.freepik.com/vetores-premium/letra-a-ponte-logotipo-para-viagem-de-transporte-e-modelo-de-vetor-de-negocios-de-construcao_754537-5789.jpg" alt="Logo Talent Bridge" style="width: 150px; margin-bottom: 20px; border-radius: 10px;"/>
    <h1 style="color: white; margin: 0; font-size: 28px;">Novo Comentário em Sua Publicação</h1>
  </div>
  <div style="background-color: #ffffff; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
    <p style="font-size: 18px; color: #0077B5;"><strong>Olá ${recipientName},</strong></p>
    <p>${commenterName} comentou em sua publicação:</p>
    <div style="background-color: #f3f6f8; padding: 20px; border-radius: 8px; margin: 20px 0;">
      <p style="font-style: italic; margin: 0;">"${commentContent}"</p>
    </div>
    <div style="text-align: center; margin: 30px 0;">
      <a href=${postUrl} style="background-color: #0077B5; color: white; padding: 14px 28px; text-decoration: none; border-radius: 30px; font-weight: bold; font-size: 16px; transition: background-color 0.3s;">Ver Comentário</a>
    </div>
    <p>Mantenha-se engajado com sua rede respondendo a comentários e incentivando discussões.</p>
    <p>Atenciosamente,<br>Equipe Talent Bridge</p>
  </div>
</body>
</html>
`;
