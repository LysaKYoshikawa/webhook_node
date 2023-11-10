const express = require('express');
const bodyParser = require('body-parser');
const { exec } = require('child_process');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/webhook', (req, res) => {
    const { ref, repository, pusher } = req.body;
    // Verifica se o evento é um push para a branch 'main'
    if (ref === 'refs/heads/main') {
        // Ação específica para push na branch 'main'
        console.log(`Novo commit no repositório aqui: ${repository.full_name}`);
        console.log(`Pusher: ${pusher.name}`);

        // Exemplo: Executar um script de construção e implantação
        exec('bash C:/Users/monal/repos/webhook_node/index.js', (error, stdout, stderr) => {
        if (error) {
            console.error(`Erro ao executar o script: ${stderr}`);
            return res.status(500).send('Internal Server Error');
        }
        console.log(`Script executado com sucesso: ${stdout}`);
        res.status(200).send('OK');
        });
    } else {
        // Outros eventos ou branches podem ser tratados aqui
        res.status(200).send('Notificação recebida, mas não é um push para a branch "main".');
    }

});

app.listen(port, () => {
  console.log(`Servidor em execução em http://localhost:${port}`);
});
