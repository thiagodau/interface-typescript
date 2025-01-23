const users = [];
async function fetchUser(username) {
    const response = await fetch(`https://api.github.com/users/${username}`);
    const user = await response.json();
    if (user.message) {
        console.log('Not found');
    }
    else {
        users.push(user);
        console.log(`O usuário ${user.login} foi salvo. \n` +
            `ID: ${user.id}`);
    }
}
async function fetchRepos(username) {
    const user = users.find((user) => user.login === username);
    if (typeof user === 'undefined') {
        console.log('Usuário não encontrado');
    }
    else {
        const response = await fetch(user.repos_url);
        const repos = await response.json();
        let message = `id: ${user.id} \n` +
            `login: ${user.login} \n` +
            `name: ${user.name} \n`;
        repos.forEach((repo) => {
            message += `\nNome: ${repo.name} \n` +
                `Descrição: ${repo.description} \n` +
                `Estrelas: ${repo.stargazers_count} \n` +
                `Fork: ${repo.fork ? 'Sim' : 'Não'} \n` +
                `-----------------------------\n`;
        });
        console.log(message);
    }
}
