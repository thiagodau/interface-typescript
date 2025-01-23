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
function getAllUsers() {
    let message = 'Usuários: \n';
    users.forEach((user) => {
        message += `Nome: ${user.name} \n` +
            `Login: ${user.login} \n` +
            `-----------------------------\n`;
    });
    console.log(message);
}
function showReposTotal() {
    const reposTotal = users.reduce((acc, user) => acc + user.public_repos, 0);
    console.log(`O grupo possui um total de ${reposTotal} repositorios públicos.`);
}
function showTopFive() {
    const topFive = users.slice().sort((a, b) => b.public_repos - a.public_repos).slice(0, 5);
    let message = 'Top 5 Usuários com mais Repositórios Públicos: \n';
    topFive.forEach((user, index) => {
        message += `${index + 1} - ${user.login}: ${user.public_repos} Repositórios Públicos \n` +
            `-----------------------------\n`;
    });
    console.log(message);
}
async function main() {
    await fetchUser('thiagodau');
    await fetchUser('isaacpontes');
    await fetchUser('pcaldass');
    await fetchUser('julianaconde');
    await fetchRepos('thiagodau');
    await fetchRepos('isaacpontes');
    getAllUsers();
    showReposTotal();
    showTopFive();
}
main();
