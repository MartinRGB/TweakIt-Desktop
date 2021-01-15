
|     |     |
|-----|-----|
|Design |![Figma](https://img.shields.io/badge/-Figma-000?&logo=figma) ![Blender](https://img.shields.io/badge/-Blender-000?&logo=blender)  |
|Language  |![Java](https://img.shields.io/badge/-Java-000?&logo=Java) ![JavaScript](https://img.shields.io/badge/-JavaScript-000?&logo=JavaScript) ![TypeScript](https://img.shields.io/badge/-TypeScript-000?&logo=TypeScript)|
|UI Framework  |![React](https://img.shields.io/badge/-React-000?&logo=React) ![Electron](https://img.shields.io/badge/-Electron-000?&logo=Electron)|
|CSS In JS |![Stylus](https://img.shields.io/badge/-Stylus-000?&logo=Stylus) ![Emotion](https://img.shields.io/badge/-Emotion-000?&logo=Stylus) |
|Command Line |![HomeBrew](https://img.shields.io/badge/-HomeBrew-000?&logo=HomeBrew) ![PowerShell](https://img.shields.io/badge/-Shell-000?&logo=PowerShell)|
|Communication|![Android](https://img.shields.io/badge/-ADB-000?&logo=android) ![Android](https://img.shields.io/badge/-Scrcpy-000?&logo=android) ![WebSocket](https://img.shields.io/badge/-WebSocket-000?&logo=socket.io)|
|Rendering |![WebGL](https://img.shields.io/badge/-WebGL-000?&logo=webgl)|
|Package   |![NPM](https://img.shields.io/badge/-NPM-000?&logo=npm) ![Webpack](https://img.shields.io/badge/-Webpack-000?&logo=Webpack)  |

<!--

<table>
    <tbody>
        <tr>
            <td rowspan=4>
              



**语言**
![Java](https://img.shields.io/badge/-Java-000?&logo=Java)
![JavaScript](https://img.shields.io/badge/-JavaScript-000?&logo=JavaScript)
![TypeScript](https://img.shields.io/badge/-TypeScript-000?&logo=TypeScript)
![JSON](https://img.shields.io/badge/-JSON-000?&logo=JSON)
![SVG](https://img.shields.io/badge/-SVG-000?&logo=SVG)

**UI 框架**
![React](https://img.shields.io/badge/-React-000?&logo=React)

**CSS In JS**
![Stylus](https://img.shields.io/badge/-Stylus-000?&logo=Stylus)
![Emotion](https://img.shields.io/badge/-Emotion-000?&logo=Stylus)

**后端相关**
![Node.js](https://img.shields.io/badge/-Node.js-000?&logo=node.js)

**包管理 & 打包**
![NPM](https://img.shields.io/badge/-NPM-000?&logo=npm)
![Webpack](https://img.shields.io/badge/-Webpack-000?&logo=Webpack)

**跨平台**
![Electron](https://img.shields.io/badge/-Electron-000?&logo=Electron)

**命令行**
![HomeBrew](https://img.shields.io/badge/-HomeBrew-000?&logo=HomeBrew)
![PowerShell](https://img.shields.io/badge/-Shell-000?&logo=PowerShell)

**图像渲染**
![WebGL](https://img.shields.io/badge/-WebGL-000?&logo=webgl)

**Android 端通信**
![Android](https://img.shields.io/badge/-ADB-000?&logo=android)
![Android](https://img.shields.io/badge/-Scrcpy-000?&logo=android)

**后续计划**
![WebGL](https://img.shields.io/badge/-WebGL-000?&logo=webgl)
![WASM](https://img.shields.io/badge/-WebAssembly-000?&logo=webassembly)
![WebSocket](https://img.shields.io/badge/-WebSocket-000?&logo=socket.io)
![WebSocket](https://img.shields.io/badge/-GraphQL-000?&logo=graphql)

</table>

-->

## TweakIt-Desktop

An Android Debugging Application

A project using Electron, React, Typescript, Emotion, TailWindCSS, Theme UI and React-i18next.

## Installation

Use a package manager of your choice (npm, yarn, etc.) in order to install all dependencies

```bash
npm install
```cle

```bash
yarn install
```

## Usage

This app is made for regular users(only run in macOS).Even without `adb` && `scrcpy` installed,it should provide basic soft rendering for them.

So there need integrate basic environment like `adb` and `node`.

after `brew install -f --cask android-platform-tools` or manually install the SDK via [Android Developers](https://developer.android.com/studio) ,then get the executable file in `/usr/local/Caskroom` or somewhere.

after `brew install node` or install the PKG via [Node.js](https://nodejs.org/) ,then get the executable file in `/usr/local/bin` or somewhere.

    .                              # The root path
    ├── ...                   
    ├── assets                     # 'assets' folder
        ├── adb                    # 'adb' folder
            ├── adb                # 'adb' executable file(macOS)
        ├── node                   # 'adb' folder
            ├── node               # 'node' executable file(macOS)
        ├── ...                    # some Webpack generated files(node needs access them)
    ├── ...                    

In order to run this project 2 scripts will need to be executed `dev:react` and `dev:electron`, run each one in a different terminal and always run `dev:react` before `dev:electron`, or `dev` to run them in order automatically

```bash
npm run dev:react
```
```bash
npm run dev:electron
```

or

```bash
npm run dev
```

run ws-scrcpy stand alone

```bash
npm run start:scrcpy-standalone
```

## Packaging
To generate a project package run `package`

```bash
npm run package
```

## Related projects
* [Genymobile/scrcpy](https://github.com/Genymobile/scrcpy)
* [DeviceFarmer/adbkit](https://github.com/DeviceFarmer/adbkit)
* [NetrisTV/ws-scrcpy](https://github.com/NetrisTV/ws-scrcpy)

## License

See [Apache](https://github.com/MartinRGB/TweakIt-Desktop/blob/main/LICENSE) License here

