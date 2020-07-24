# amazon-bibliographic-information-to-scrapbox
Amazonのページから書誌情報を Scrapbox に取り込むブックマークレットです。元ネタ: https://rashita.net/blog/?p=26075

## Development

```
npm install
npm run watch
```

## Release

### Create Release Pull Request

```
npm run release
(Review and merge the release PR)
```

### Trigger Release

```
git switch master
npx shipjs trigger
```
