# My Own Lambda Backend

## Install Dependencies

```bash
yarn
```

## Build

```bash
yarn build
```

## Zip

```bash
yarn zip
```

## Deploy

```bash
aws lambda update-function-code --function-name LoginLambda --zip-file fileb://dist.zip
```
