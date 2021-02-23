# amazon-bibliographic-information-to-scrapbox
Amazonのページから書誌情報を Scrapbox に取り込むブックマークレットです。元ネタ: https://rashita.net/blog/?p=26075

## Development

### Setup

```
npm install
npm run watch
```

### Commit

Follow [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/). [git-cz](https://github.com/streamich/git-cz) is useful.

```
npx git-cz
```

## Release

1. Run `npm run release` on main branch.
```
git switch main
npm run release
```

2. Release Pull Request is created by the above command. Review and merge the PR into main branch.

3. GitHub Actions releases the main branch.
