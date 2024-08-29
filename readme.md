## 创建过程
https://ericwxy.github.io/eric-wiki/my-projects/eric-ui/start.html
1. 项目初始化
```shell
    mkdir 文件夹名称

    cd 文件夹名称

    git init

    code .
```
2. monorepo项目，先创建 pnpm-workspace.yaml 文件
```shell
    mkdir packages

    echo -e 'packages:\n  - "packages/*"' > pnpm-workspace.yaml

    pnpm init
```
- pnpm-workspace.yaml文件是在使用 pnpm 包管理器时，用于定义和管理多个项目（或称为工作区）的配置文件。pnpm 是一个现代的 JavaScript 包管理工具，它允许你管理多个项目（工作区）的依赖关系，而不需要在每个项目中单独安装依赖。
- pnpm-workspace.yaml 文件的作用
    1. 定义工作区：通过 pnpm-workspace.yaml 文件，你可以指定哪些目录是工作区的一部分。这使得 pnpm 能够识别和管理这些目录中的 package.json 文件。
    2. 共享依赖：在多个项目中共享依赖，减少重复安装和磁盘空间占用。pnpm 会将所有项目的依赖存储在一个共享的存储位置，而不是每个项目目录中。
    3. 统一管理：允许你通过一个中央位置来安装、更新和删除依赖，而不是在每个项目中单独操作。
    4. 提高效率：通过集中管理依赖，可以更快地进行依赖的安装和更新，减少构建和部署的时间。

3. 创建 .gitignore
```
    # Logs
    logs
    *.log
    npm-debug.log*
    yarn-debug.log*
    yarn-error.log*
    pnpm-debug.log*
    lerna-debug.log*

    node_modules
    coverage
    dist
    dist-ssr
    *.local

    /cyperss/videos/
    /cypress/srceenshots/

    .vitepress/dist
    .vitepress/cache

    # Editor directories and files
    .vscode/*
    !.vscode/extensions.json
    .idea
    .DS_Store
    *.suo
    *.ntvs*
    *.njsproj
    *.sln
    *.sw?
```
4. 分包结构
```shell
    - components # 组件目录
    - core # npm 包入口
    - docs # 文档目录
    - hooks # 组合式API hooks 目录
    - play # 组件开发实验室
    - theme # 主题目录
    - utils # 工具函数目录
```
5. 创建子包目录
```shell
    cd packages
```
在 packages 目录下创建 init.shell 内容如下
```shell 
    for i in components core docs hooks theme utils; do
        mkdir $i
        cd $i
        pnpm init
        cd ..
    done
```
**使用sh 执行 init.shell 文件  sh init.shell**
执行后删除即可

6. 创建play目录
```shell
    pnpm create vite play --template vue-ts
```
7. 分别到 各个分包目录中修改 package.json 中 修改 name

core 中 package.json name 需要和 项目同名，其他包名的格式为  @kyrie-ui/包名，这样写的目的是为了避免和其他开源组件库重名

8. 安装依赖
```shell
    pnpm add -Dw typescript@^5.2.2 vite@^5.1.4 vitest@^1.4.0 vue-tsc@^1.8.27 postcss-color-mix@^1.1.0 postcss-each@^1.1.0 postcss-each-variables@^0.3.0 postcss-for@^2.1.1 postcss-nested@^6.0.1 @types/node@^20.11.20 @types/lodash-es@^4.17.12 @vitejs/plugin-vue@^5.0.4 @vitejs/plugin-vue-jsx@^3.1.0 @vue/tsconfig@^0.5.1

    pnpm add -w lodash-es@^4.17.21 vue@^3.4.19
```

9. 主包关联子包依赖
```json
    {
        "dependencies": {
            "kyrie-ui": "workspace:*",
            "@kyrie-ui/hooks": "workspace:*",
            "@kyrie-ui/utils": "workspace:*",
            "@kyrie-ui/theme": "workspace:*"
        }
    }
```

10. 添加子包依赖
```shell
    pnpm add -D @vue/test-utils@^2.4.5 @vitest/coverage-v8@^1.4.0 jsdom@^24.0.0 --filter @kyrie-ui/components
    pnpm add @popperjs/core@^2.11.8 async-validator@^4.2.5 --filter @kyrie-ui/components
```

11. 在core/package.json 中添加如下内容
```json
    {
        "dependencies": {
            "@toy-element/components": "workspace:*"
        }
    }
```

12. docs 安装文档
```shell
    pnpm add -D vitepress@1.0.0-rc.44 --filter @kyrie-ui/docs
```

13. 将play目录下多余的内容删除掉
- play/package.json 对比 根目录下的package.json 把play/package.json与根目录下的package.json中重复的删掉
- 删除play/tsconfig 相关的文件，因为会创建一个全局的

14. 创建全局tsconfig.json
- 创建tsconfig.json
```json
    {
        "extends": "@vue/tsconfig/tsconfig.dom.json",
        "compilerOptions": {
            "target": "ES2020",
            "useDefineForClassFields": true,
            "module": "ESNext",
            "lib": ["ES2020", "DOM", "DOM.Iterable"],
            "skipLibCheck": true,

            /* Bundler mode */
            "moduleResolution": "bundler",
            "allowImportingTsExtensions": true,
            "resolveJsonModule": true,
            "isolatedModules": true,
            "noEmit": true,
            "jsx": "preserve",
            "jsxImportSource": "vue",

            /* Linting */
            "strict": true,
            "noUnusedLocals": true,
            "noUnusedParameters": true,
            "noFallthroughCasesInSwitch": true
        },
        "include": ["packages/**/*.ts", "packages/**/*.tsx", "packages/**/*.vue"]
    }
```
- 创建tsconfig.node.json
```json
    {
        "extends": "@tsconfig/node18/tsconfig.json",
        "include": ["packages/**/**.config.ts"],
        "compilerOptions": {
            "composite": true,
            "module": "ESNext",
            "moduleResolution": "Bundler",
            "types": ["node"]
        }
    }
```

15. 创建 postcss.config.cjs
```js
    /* eslint-env node */
    module.exports = {
        plugins: [
            require("postcss-nested"),
            require("postcss-each-variables"),
            require("postcss-each")({
            plugins: {
                beforeEach: [require("postcss-for"), require("postcss-color-mix")],
            },
            }),
        ],
    };
```

16. 根目录执行 pnpm install，创建了很多的包的关联，所以要从新下载一下依赖

17. 在utils目录下创建install.ts，用与vue插件的安装（用于 vue plugin 安装的一系列操作）
