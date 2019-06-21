export default class GitApiService {
    _baseUrl = 'https://api.github.com/orgs/'

    getOrganization = async ( url ) => {
        const res = await fetch(`${this._baseUrl}${url}`);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}` +
                `, received ${res.status}`)
        }
        return res.json();
    }

    getMembers = async ( url ) => {
        const res = await fetch(`https://api.github.com/orgs/${url}/members`);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}` +
                `, received ${res.status}`)
        }
        return res.json();
    }
    getUser = async ( url ) => {
        const res = await fetch(`https://api.github.com/users/${url}`);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}` +
                `, received ${res.status}`)
        }
        return res.json();
    }

    getFollowers = async (url) => {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}` +
                `, received ${res.status}`)
        }
        return res.json();
    }

    getFollows = async (url) => {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}` +
                `, received ${res.status}`)
        }
        return res.json();
    }
}