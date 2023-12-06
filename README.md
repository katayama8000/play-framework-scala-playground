# expo-eas-store

## up

```bash
yarn start
```

## build

```bash
eas build -p [platform] -e [enviroment]
eas build -p android -e development
```

android は動作確認ずみ
iOS は Apple Developer account が必要なので確認していない

development は devClient build が作成され、開発時 local server に繋いでに使用する
preview を動作確認で使う

## submit

```bash
eas submit -p [platform]
```

## 事前準備

- eas-cli のインストール
  - https://docs.expo.dev/build/setup/
  - https://github.com/expo/eas-cli
  - docker で環境作れば、local に入れなくても良いのだが...
- expo のアカウント作成
  - https://expo.dev/
