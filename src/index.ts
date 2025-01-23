interface GithubUserResponse {
  id: number,
  login: string,
  name: string,
  bio: string,
  public_repos: string,
  repos_url: string,
  message?: 'Not found.'
}

interface GithubRepoResponse {
  name: string,
  description: string,
  fork: boolean,
  stargazers_count: number,
}

const users: GithubUserResponse[] = []

async function fetchUser(username: string) {
  const response = await fetch(`https://api.github.com/users/${username}`);

  const user: GithubUserResponse = await response.json();

  if (user.message) {
    console.log('Not found');
  } else {
    users.push(user);

    console.log(
      `O usuário ${user.login} foi salvo. \n` +
      `ID: ${user.id}`
    )
  }
}


async function fetchRepos(username: string) {
  const user = users.find((user) => user.login === username)
  if(typeof user === 'undefined') {
    console.log('Usuário não encontrado');
  } else {
    const response = await fetch(user.repos_url);
    const repos: GithubRepoResponse[] = await response.json();

    let message = `id: ${user.id} \n` +
    `login: ${user.login} \n` +
    `name: ${user.name} \n`

    repos.forEach((repo) => {
      message += `\nNome: ${repo.name} \n` +
        `Descrição: ${repo.description} \n` +
        `Estrelas: ${repo.stargazers_count} \n` +
        `Fork: ${repo.fork? 'Sim' : 'Não'} \n` +
        `-----------------------------\n`;
    });

    console.log(message);
  }
}